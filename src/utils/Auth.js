export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
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

export const authorize = (login, pass) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: pass, email: login })
  })
    .then(res => {
      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (e) {
        return e;
      }
    })

    .then(res => {
      if (res.token) {
        //сохраняем токен в LocalStorage
        localStorage.setItem('jwt', res.token);
        return res;
      } else {
        return;
      }
    })

    .catch(err => console.log(err));
};

export const getUser = token => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });
};
