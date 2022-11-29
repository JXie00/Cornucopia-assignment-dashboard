import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export const get: <T, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
) => Promise<R> = (url, config = {}) => axios.get(url, config);

export const post: <T, R = AxiosResponse<T>>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
) => Promise<R> = (url, data, config = {}) => axios.post(url, data, config);
