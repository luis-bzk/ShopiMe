import axios from "axios";

const shopiMeApi = axios.create({
  baseURL: "/api",
});

export default shopiMeApi;
