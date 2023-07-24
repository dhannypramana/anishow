import axios from "axios";

export const useAxios = () => {
    return {
      get: (baseUrl, path) => {
          return axios.get(baseUrl + path)
      }
  }
}