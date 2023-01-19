import axios from "axios";
const axiosFunc = async (
  method,
  url,
  data = null,
  params = null,
  condition = null
) => {
  let promise = null;

  if (method === "get") {
    promise = axios({
      method,
      url,
      params,
    });
  }

  if (method === "patch") {
    promise = axios({
      method,
      url,
      data,
    });
  }

  if (method === "post") {
    promise = axios({
      method,
      url,
      data,
    });
  }

  // then, create a new promise
  const dataPromise = promise
    .then((response) => response)
    .catch((err) => err.response);
  // return it
  return dataPromise;
};

const axiosFuncMoreThanOne = async (requestArray) => {
  let promise = null;
  promise = axios.all(requestArray);
  const dataPromise = promise
    .then(
      axios.spread((...responses) => {
        var response = [];
        responses.map((item, index) => {
          response[index] = responses[index];
        });
        return response;
      })
    )
    .catch((err) => err.response);
  // return it
  return dataPromise;
};

export { axiosFunc, axiosFuncMoreThanOne };
