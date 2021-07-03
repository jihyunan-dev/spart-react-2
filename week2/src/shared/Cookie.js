const saveCookie = (key, value, exp = 3) => {
  let date = new Date(Date.now() + 24 * 60 * 60 * 1000 * exp);
  document.cookie = `${key}=${value}; expires=` + date;
};

const getCookie = (name) => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

const removeCookie = (key) => {
  document.cookie = key + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

export { saveCookie, getCookie, removeCookie };
