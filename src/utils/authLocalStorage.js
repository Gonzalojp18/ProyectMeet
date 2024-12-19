export const setToken = (data) => {
  const setToken = localStorage.setItem('auth', JSON.stringify(data));
  return setToken;
};

export const getToken = () => {
  const userToken = JSON.parse(localStorage.getItem('auth'));
  const conf = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  return conf;
};

export const getValue = () => {
  const getAuth = localStorage.getItem('auth');
  return getAuth;
};

export const deleteLocalStorage = () => {
  const removeToken = localStorage.removeItem('auth');
  return removeToken;
};