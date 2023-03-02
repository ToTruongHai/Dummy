const prefix = "http://localhost:8080";

export const authUrlService = {
  loginServiceURL: `${prefix}/auth/login`,
  registerServiceURL: `${prefix}/auth/create`,
  profileServiceURL: `${prefix}/auth/profile`,
};

export const productUrlService = {
  createServiceURL: `${prefix}/product/create`,
  getAllServiceURL: `${prefix}/product/all`,
  updateServiceURL: `${prefix}/product/update`,
  deleteServiceURL: `${prefix}/product/delete`,
  findServiceURL: `${prefix}/product/find`,
};

export const categoryUrlService = {
  getAllServiceURL: `${prefix}/category/all`,
};

export const serviceStatus = {
  ERROR: 500,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
};
