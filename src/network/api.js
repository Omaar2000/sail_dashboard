import axios from "axios";

//const API_URL = "http://92.205.230.83:8080/admin/auth"; // Replace with your backend API URL

// Function to handle login API call

export const login = async (username, password) => {
  try {
    const response = await api
      .post(
        `https://dev.sailgloble.com/admin/auth/login`,
        {
          user_name: username,
          password: password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin":
              "https://sail-dashboard-git-main-omaar2000s-projects.vercel.app",
          },
        }
      )
      .then((response) => response.data);
    return response; //Assuming response data contains the token
  } catch (error) {
    console.error("Login API call failed:", error);
    throw error; //Rethrow the error to be handled by the caller
  }
};
// Function to handle register API call
// export const register = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, {
//       username,
//       password,
//     });
//     return response.data; // Assuming response data contains the user information
//   } catch (error) {
//     throw error.response.data; // Throw error for handling in components
//   }
// };

// ---------------------- Interceptor ---------------------
export const api = axios.create(
{
  // headers : {
  //   "Access-Control-Allow-Origin" : "https://sail-dashboard-evjl.vercel.app"
  // },
  baseURL : "https://dev.sailgloble.com"
}
);

api.interceptors.request.use(
  (config) => {
    console.log(`Request:`, config);
    console.log(`Request URL: ${config.url}`);
    console.log(`Request Method: ${config.method}`);
    console.log(`Request Data:`, config.data);
    console.log(`Auth Token: ${JSON.stringify(config.headers.Authorization)}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response, error) => {
    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);
    console.log("Error", error);
    // console.log("Response Headers:", response.headers);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
