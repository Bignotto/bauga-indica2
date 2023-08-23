import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL!,
});

export { api };
