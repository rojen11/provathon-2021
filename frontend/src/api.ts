import Axios  from "axios";

export async function api(
  q: { query: string; variables?: any },
  headers?: any
) {
  return await Axios.post("/backend/graphql/", q, { headers });
}

export async function refreshToken() {
  let refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken !== null) {
    return api(
      {
        query: `mutation refreshToken($refreshToken: String!) {
              refreshToken(
                refreshToken: $refreshToken
              ) {
                success,
                errors,
                payload,
                token,
                refreshToken,
              }
            }`,
        variables: { refreshToken },
      },
      { type: "refresh" }
    ).then((res) => {
      const data = res.data.data;
      if (data !== null && data.refreshToken.success) {
        localStorage.setItem("accessToken", data.refreshToken.token);
        localStorage.setItem("refreshToken", data.refreshToken.refreshToken);
      }
    });
  }
}

// request interceptor to add the auth token header to requests
Axios.interceptors.request.use(
  async (config) => {
    if (config.headers.type === "refresh") {
      return config;
    }
    await refreshToken();
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = "JWT " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
