import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const BASE_URL = `http://localhost:${publicRuntimeConfig.URL_PORT}/api/`;

export { HttpCode, BASE_URL };
