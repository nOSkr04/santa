import { store } from "../store";
import { HttpRequest as BaseHttpRequest,HttpHandler } from "../helper";
import { authLogout } from "../store/auth-slice";

export class HttpRequest extends BaseHttpRequest {
  
  // uri = "http://143.198.196.8";
  // uri = "https://seduback.com/api/v1";
  // uri = "http://192.168.1.8:8002";
  uri = "https://neuronsolution.info";
  store = store;
  errorHandler = (statusCode: number, error: HttpHandler): void => {
    if(statusCode === 401){
      store.dispatch(authLogout());
    }
    throw error;
  };
}

export const delay = async (ms=400): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve,ms));
};