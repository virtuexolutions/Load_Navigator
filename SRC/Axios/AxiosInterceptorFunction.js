import axios from 'axios';
import {Alert} from 'react-native';
// import NetworkErrorAlert from "../Components/NetworkErrorAlert";
import {baseUrl} from '../Config';
import {store} from '../Store';
import {setErrorAlert} from '../Store/slices/common';

/**
 * @description Sends a Get request to api
 * @param {String} route
 * @example "/api/route"
 * @returns Promise<any>
 */

const URL = link => {
  return `${baseUrl}/api/${link}`;
};

let Get = async (route, token, showAlert = true) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const apiUrl = URL(route);
  // console.log(apiUrl);
  try {
    const response = await axios.get(apiUrl, options);
    return response;
  } catch (error) {
    console.log('error', error.response);
    let networkError = error.message === 'Network Error';
    if (showAlert == true) {
      if (networkError === true) {
        store.dispatch(
          setErrorAlert({
            title: 'Network  Error',
            message: 'Please Check Your Network Connection',
          }),
        );
        // <NetworkErrorAlert/>
      } else {
        store.dispatch(
          setErrorAlert({
            title: 'submission Error',
            message: error?.response?.data?.message || 'Something went wrong!',
          }),
        );
      }
    }
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 * @returns Promise<any>
 */

let Post = async (route, data, headers, showAlert = true) => {
  const apiUrl = URL(route);
  console.log('here is the url =>', apiUrl);

  try {
    return await axios.post(apiUrl, data, headers);
  } catch (error) {
    console.log('error', error.message);
    let networkError = error.message === 'Network Error';
    if (showAlert == true) {
      if (networkError === true) {
        console.log('sadasdsad');

        store.dispatch(
          setErrorAlert({
            title: 'Network  Error',
            message: 'Please Check Your Network Connection',
          }),
        );
        // <NetworkErrorAlert/>
      } else {
        console.log('============================ >>>>>>>>>>>>>>');
        store.dispatch(
          setErrorAlert({
            title: 'submission Error',
            message: error?.response?.data?.message || 'Something went wrong!',
          }),
        );
        return undefined;
      }
    }
    return undefined;
  }
};

/**
 * @description Sends a post request to api
 * @param {String} route
 * @example "/api/route"
 * @param {Object} data
 * @example {foo:bar}
 * @returns Promise<any>
 */
let Patch = async (route, data, headers, showAlert = true) => {
  const apiUrl = URL(route);
  try {
    return await axios.patch(apiUrl, data, headers);
  } catch (error) {
    console.log('error', error?.response?.data);
    let networkError = error.message === 'Network Error';
    if (showAlert == true) {
      if (networkError === true) {
        store.dispatch(
          setErrorAlert({
            title: 'Network  Error',
            message: 'Please Check Your Network Connection',
          }),
        );
        console.log('sadasdsad');
        // <NetworkErrorAlert/>
      } else {
        store.dispatch(
          setErrorAlert({
            title: 'submission Error',
            message: error?.response?.data?.message || 'Something went wrong!',
          }),
        );
      }
    }
  }
};

let Put = async (route, data, headers, showAlert = true) => {
  const apiUrl = URL(route);
  console.log('here is the url =>', apiUrl);

  try {
    return await axios.put(apiUrl, data, headers);
  } catch (error) {
    console.log('error================>', error.message);
    let networkError = error.message === 'Network Error';
    if (showAlert) {
      if (networkError) {
        store.dispatch(
          setErrorAlert({
            title: 'Network  Error',
            message: 'Please Check Your Network Connection',
          }),
        );
      } else {
        store.dispatch(
          setErrorAlert({
            title: 'submission Error',
            message: error?.response?.data?.message || 'Something went wrong!',
          }),
        );
      }
    }
    return undefined;
  }
};
let Delete = async (route, data, headers, showAlert = true) => {
  const apiUrl = URL(route);

  try {
    return data == null
      ? await axios.delete(apiUrl, headers)
      : await axios.delete(apiUrl, data, headers);
  } catch (error) {
    console.log('error', error?.response?.data);
    let networkError = error.message === 'Network Error';
    if (showAlert == true) {
      if (networkError === true) {
        store.dispatch(
          setErrorAlert({
            title: 'Network  Error',
            message: 'Please Check Your Network Connection',
          }),
        );
      } else {
        store.dispatch(
          setErrorAlert({
            title: 'submission Error',
            message: error?.response?.data?.message || 'Something went wrong!',
          }),
        );
      }
    }
  }
};

export {Post, Get, Patch, Delete, Put};
