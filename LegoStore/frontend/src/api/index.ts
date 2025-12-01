import axios, { AxiosResponse } from "axios";
import { Lego } from "../utils/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

export default {
  convoys() {
    return {
      getAll: (): Promise<AxiosResponse<Lego[]>> =>
        axiosInstance.get(`lego`),
    };
  },
};
