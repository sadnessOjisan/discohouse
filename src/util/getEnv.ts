export const getEnv = () => {
  const env = process.env.NODE_ENV;
  if (env !== "production" && env !== "development")
    throw new Error("invalid env");
  return env;
};
