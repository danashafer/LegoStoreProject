import axios, { AxiosResponse } from "axios";
import { Lego, User } from "../utils/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", 
});

export default {
  legos() {
    return {
      getAll: (): Promise<AxiosResponse<Lego[]>> =>
        axiosInstance.get("legos"), 
    };
  },
  users(){
    return{
      login: (email: string, password: string): Promise<AxiosResponse<User>>=>
        axiosInstance.post('auth/login' , {email: email, password: password})
    }
  }

};