import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  InternalAxiosRequestConfig,
} from "axios";
import { message as AMessage } from "antd";
import { SpinState, useSpinStore, useUserStore } from "@/stores";

interface Options {
  // 是否开启取消重复请求, 默认为 true
  cancelRepeatRequest?: boolean;
  // 是否开启loading层效果, 默认为false
  loading?: boolean;
  // 是否开启简洁的数据结构响应, 默认为true
  reductDataFormat?: boolean;
  // 是否开启接口错误信息展示,默认为true
  showErrorMessage?: boolean;
  // 是否开启code不为200时的信息提示, 默认为false
  showCodeMessage?: boolean;
}

interface LoadingInstance {
  target: SpinState | null;
  count: number;
}

export type IPromise<T> = Promise<IResponse<T>>;
export type APromise<T> = Promise<AxiosResponse<T>>;

interface IResponse<T> {
  code: number;
  data: T;
  message: string;
}

const pendingMap = new Map<string, Canceler>();
const loadingInstance: LoadingInstance = {
  target: null,
  count: 0,
};

/**
 * 根据运行环境获取请求url
 */
export const getBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_AXIOS_BASE_URL;
  return baseUrl;
};

/**
 * 创建 axios
 */
export default function createAxios<T>(
  axiosConfig: AxiosRequestConfig,
  options?: Omit<Options, "reductDataFormat"> & { reductDataFormat?: true }
): IPromise<T>;
export default function createAxios<T>(
  axiosConfig: AxiosRequestConfig,
  options?: Omit<Options, "reductDataFormat"> & { reductDataFormat?: false }
): APromise<T>;
export default function createAxios<T>(
  axiosConfig: AxiosRequestConfig,
  options: Options = {}
): IPromise<T> | APromise<T> {
  const instance = axios.create({
    baseURL: getBaseUrl(),
    timeout: 1000 * 10,
  });

  // 自定义配置
  options = Object.assign(
    {
      cancelRepeatRequest: true, // 是否开启取消重复请求, 默认为 true
      loading: false, // 是否开启loading层效果, 默认为false
      reductDataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
      showErrorMessage: true, // 是否开启接口错误信息展示,默认为true
      showCodeMessage: false, // 是否开启code不为200时的信息提示, 默认为false
    },
    options
  );

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      removePending(config);
      options.cancelRepeatRequest && addPending(config);
      // 创建loading实例
      if (options.loading) {
        loadingInstance.count++;
        if (loadingInstance.count === 1) {
          loadingInstance.target = useSpinStore();
          loadingInstance.target.setSpin(true);
        }
      }
      // 携带token
      const { token } = useUserStore();
      if (token && config.headers) {
        config.headers.token = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截
  instance.interceptors.response.use(
    (response) => {
      removePending(response.config);
      options.loading && closeLoading(options);

      if (
        options.showCodeMessage &&
        response.data &&
        response.data.code !== 200
      ) {
        AMessage.error(response.data.message);
        return Promise.reject(response.data); // code不等于200, 页面具体逻辑就不执行了
      }
      return options.reductDataFormat ? response.data : response;
    },
    (error) => {
      error.config && removePending(error.config);
      options.loading && closeLoading(options); // 关闭loading
      options.showErrorMessage && httpErrorStatusHandle(error); // 处理错误状态码
      return Promise.reject(error); // 错误继续返回给到具体页面
    }
  );

  return instance(axiosConfig) as IPromise<T> | APromise<T>;
}

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error: AxiosError) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { clearToken } = useUserStore();
  // 处理被取消的请求
  if (axios.isCancel(error))
    return console.error("请求的重复请求：" + error.message);
  let message = "";
  error = error as AxiosError;
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = "接口重定向了！";
        break;
      case 400:
        message = "参数不正确！";
        break;
      case 401:
        message = "您未登录，或者登录已经超时，请先登录！";
        clearToken(); // 清除token
        break;
      case 403:
        message = "您没有权限操作！";
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        message = "请求超时！";
        break;
      case 409:
        message = "系统已存在相同数据！";
        break;
      case 500:
        message = "服务器内部错误！";
        break;
      case 501:
        message = "服务未实现！";
        break;
      case 502:
        message = "网关错误！";
        break;
      case 503:
        message = "服务不可用！";
        break;
      case 504:
        message = "服务暂时无法访问，请稍后再试！";
        break;
      case 505:
        message = "HTTP版本不受支持！";
        break;
      default:
        message = "异常问题，请联系管理员！";
        break;
    }
  }
  if (error.message.includes("timeout")) message = "网络请求超时！";
  if (error.message.includes("Network"))
    message = window.navigator.onLine ? "服务端异常！" : "您断网了！";

  AMessage.error(message);
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param config
 */
function addPending(config: InternalAxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel: Canceler) => {
      if (!pendingMap.get(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复请求
 * @param config
 */
function removePending(config: InternalAxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken && cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param config
 * @returns
 */
function getPendingKey(config: InternalAxiosRequestConfig) {
  const { url, method, params, headers } = config;
  let { data } = config;
  if (typeof data === "string") data = JSON.parse(data);
  return [
    url,
    method,
    JSON.stringify(params),
    headers && headers.token ? headers.token : "",
    JSON.stringify(data),
  ].join("&");
}

/**
 * 关闭Loading层实例
 * @param options
 */
function closeLoading(options: Options) {
  if (options.loading && loadingInstance.count > 0) loadingInstance.count--;
  if (loadingInstance.count === 0) {
    if (loadingInstance.target) {
      loadingInstance.target.setSpin(false);
    }
    loadingInstance.target = null;
  }
}