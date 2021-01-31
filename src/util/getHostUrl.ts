import { HOST_URL } from "../const/host";

export const getHostUrl = (env: "development" | "production") => {
  const key = env === "development" ? "local" : "prd";
  return HOST_URL[key];
};
