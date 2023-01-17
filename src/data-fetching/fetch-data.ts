import Constants from 'expo-constants';
import { REACT_APP_BACKEND_API } from '../const';

import { iife } from '../util/iife';

type FetchConfig = {
  token?: null | string;
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: null | any;
};

export const fetchData = async <T>(
  url: string,
  { token = null, method, body = null, headers = {} }: FetchConfig = {}
): Promise<T> => {
  // Decide on method
  const _method = iife(() => {
    if (method) {
      return method;
    }
    return !body ? 'GET' : 'POST';
  });

  // Convert body to json
  const _body = !body ? undefined : JSON.stringify(body);

  // Set headers
  const _headers = iife(() => {
    let headersObj: Record<string, string> = {};

    // Set Content-Type to json
    if (body) {
      headersObj['Content-Type'] = 'application/json';
    }

    // Add Authorization token
    if (token !== null) {
      headersObj['Authorization'] = 'Bearer ' + token;
    }
    return { ...headersObj, ...headers };
  });

  try {
    const { manifest } = Constants;
    const uri = `http://${manifest!.debuggerHost!.split(':').shift()}:8000/api`;

    // Fetch data
    const response = await fetch(uri + url, {
      headers: _headers,
      method: _method,
      body: _body,
    });

    // Convert to json
    const responseData = await response.json();

    if (!response.ok) {
      // Auto logout if the status code is 401 - Unauthorized
      // if (response.status === 401) {
      //   localStorage.removeItem('jwt');
      //   dispatch(userActions.logout());
      // }

      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    throw error;
  }
};
