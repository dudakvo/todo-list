module.exports = () => {
  const env = {
    BASE_URL: (() => {
      return process.env.NODE_ENV === "development"
        ? process.env.BASE_URL_DEV
          ? process.env.BASE_URL_DEV
          : "http://localhost:3000/api/"
        : process.env.BASE_URL_PROD;
    })(),
  };
  return {
    reactStrictMode: true,
    env,
  };
};
