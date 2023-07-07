function setCookie(name, value, daysToLive) {
  const date = new Date();
  date.setTime(date.getTime() + daysToLive + 24 * 60 * 60 * 1000);
  let expires = `expires=${date.toUTCString()}`;

  document.cookie = `${name}=${value}; ${expires};`;
}

function getCookie(name) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split('; ');
  let result = null;

  cArray.forEach((e) => {
    if (e.indexOf(name) == 0) {
      result = e.substring(name.length + 1);
    }
  });

  return result;
}

function deleteCookie(name) {
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export { setCookie, getCookie, deleteCookie };
