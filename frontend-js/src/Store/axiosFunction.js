import axios from "axios";
import { store } from "../index";

export default async function AxiosFunction(
  query,
  token = store.getState().AuthReducer.accessToken
) {
  return await axios.post(
    "/backend/graphql/",
    {
      query: query,
    },
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );
}

// export default async function AxiosFunction(graph) {
//   const token = store.getState().AuthReducer.accessToken;
//   const res = await fetch("/backend/graphql/", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `JWT ${token}`,
//     },
//     body: JSON.stringify({ query: graph }),
//   });

//   const json = res.json();
//   return json;
// }
