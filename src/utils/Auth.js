export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  console.log(password, email);
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      try {
        if (res.status === 201) {
          return res.json();
        }
      } catch (e) {
        return e;
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
};
