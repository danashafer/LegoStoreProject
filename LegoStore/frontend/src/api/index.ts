import axios, { AxiosResponse } from "axios";
// import { Convoy, ConvoyProperty } from "../utils/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/",
});

export default {
  convoys() {
    return {
      getAll: (): Promise<AxiosResponse<Lego[]>> =>
        axiosInstance.get(`convoys`),
    };
  },
};
