import axios from "axios";


let baseURL = "/api/";


const requestOnFullFilled = (config: any) => {
  let token = null;

  // if (process.env.REACT_APP_TOKEN) {
  //   token = process.env.REACT_APP_TOKEN;
  // } else {
  //   // token = localStorage.getItem("token");
  // }


  config.baseURL = baseURL;

  return config;
};

const requestOnRejected = (error: any) => Promise.reject(error);

const responseOnRejected = (error: any) => {
  if (error.message === "Network Error" && !error.response) {
  }
  const { status, data } = error?.response;

  if (data.message) {
  }

  if (status === 400) {
  }

  if (status === 401) {
    // return Toast("لطفا وارد حساب کاربری خود شوید", "rgba(211, 1, 10, 0.85)");
  }

  if (status === 404) {
    // return Toast("اطلاعات درخواستی یافت نشد", "rgba(211, 1, 10, 0.85)", 2000);
  }

  if (status === 422) {
    // return Toast(
    //   "اطلاعات وارد شده صحیح نمی باشند",
    //   "rgba(211, 1, 10, 0.85)",
    //   2000
    // );
  }

  if (status === 500) {
    // return Toast("خطایی در سرور رخ داده است", "rgba(211, 1, 10, 0.85)");
  }

  throw error?.response;
};

axios.interceptors.request.use(requestOnFullFilled, requestOnRejected);
axios.interceptors.response.use(undefined, responseOnRejected);

export default axios;