import filterByValue from "../useFilter";

const checkSearch = (search, data) => {
  if (search) {
    let searchRequest = filterByValue(data, search);
    return searchRequest;
  }
  return data;
};

export default checkSearch;
