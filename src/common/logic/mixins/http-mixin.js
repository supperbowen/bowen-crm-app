import * as http from 'axios';
import ensure from '../utils/ensure';
import hooks from '../utils/hooks';

export function httpCall(options) {
  options.url = ensure.ensureObject(options.url, this.uri);
  options.method = ensure.ensureObject(options.method, 'get');
  try {
    return http(options);
  } catch (exception) {
    this.throwException(exception, hooks.HTTP_EXCEPTION);
  }
}

export function httpGet(uri, params) {
  uri = ensure.ensureObject(uri, this.uri);
  try {
    return http.get(uri, params);
  } catch (exception) {
    this.throwException(exception, hooks.HTTP_EXCEPTION);
  }
}

export function httpPost(uri, data) {
  uri = ensure.ensureObject(uri, this.uri);
  try {
    return http.post(uri, data);
  } catch (exception) {
    this.throwException(exception, hooks.HTTP_EXCEPTION);
  }
}

export function httpPut(uri, data) {
  uri = ensure.ensureObject(uri, this.uri);
  try {
    return http.put(uri, data);
  } catch (exception) {
    this.throwException(exception, hooks.HTTP_EXCEPTION)
  }
}

export function httpDelete(uri, data) {
  uri = ensure.ensureObject(uri, this.uri);
  try {
    return http.delete(uri, data);
  } catch (exception) {
    this.throwException(exception, hooks.HTTP_EXCEPTION);
  }
}
