export const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) return true;
  else return false;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = (token) => {
  localStorage.removeItem("token");
};
