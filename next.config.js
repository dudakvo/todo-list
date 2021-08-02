const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = () => {
  console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`process.env.BASE_URL_DEV=${process.env.BASE_URL_DEV}`);
  console.log(`process.env.BASE_URL_PROD=${process.env.BASE_URL_PROD}`);
  const env = {
    BASE_URL: (() => {
      return process.env.NODE_ENV === "development"
        ? process.env.BASE_URL_DEV
        : process.env.BASE_URL_PROD;
    })(),
  };
  return {
    reactStrictMode: true,
    publicRuntimeConfig: {
      URL_PORT: process.env.PORT ? process.env.PORT : "3000",
    },
    env,
  };
};
