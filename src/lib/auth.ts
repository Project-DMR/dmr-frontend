export const mockUser = {
  email: "admin@vsi.com",
  password: "admin123",
  factoryCode: "VSI001",
};

export const login = (email: string, password: string, factoryCode: string) => {
  if (
    email === mockUser.email &&
    password === mockUser.password &&
    factoryCode === mockUser.factoryCode
  ) {
    localStorage.setItem("isAuthenticated", "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};
