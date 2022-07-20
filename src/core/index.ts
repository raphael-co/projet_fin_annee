import axios from 'axios';
// import jwt_decode from 'jwt-decode';
const SERVER_URL = 'http://localhost:8000/api';

const getData = async (url: any, data: any, method: any) => {
  const rep = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await rep.json();
  return json;
};

const login = async (data: any) => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/login`;

  try {
    const method = 'POST';
    const data_JSON = await getData(LOGIN_ENDPOINT, data, method);
    if (data_JSON.success == 1) {
      if (data_JSON.token) {
        // console.log(data_JSON.token);

        localStorage.setItem('access_token', data_JSON.token);
        window.location.href = 'dashboardprofil';
      }
    }
    if (data_JSON.success == 2) {
      localStorage.setItem('refEmail', data.email);
      window.location.href = 'dual_identification';
      // return data_JSON;
    } else {
      return data_JSON;
    }
  } catch (e) {
    console.log(e);
  }
};

const register = async (data: any) => {
  const SIGNUP_ENDPOINT = `${SERVER_URL}/register`;

  const method = 'POST';
  const data_JSON = await getData(SIGNUP_ENDPOINT, data, method);

  // console.log(data_JSON);

  if (data_JSON.success == 1) {
    localStorage.setItem('access_token', data_JSON.token);
    window.location.href = 'dashboard';
    return true;
  } else {
    return data_JSON;
  }
};

// interface SquareConfig {
//   exp?: string;
//   id?: any;
//   // width?: number;
// }

const getUser = async () => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/get-user`;
  const token = localStorage.getItem('access_token');

  if (token) {
    // const decodedToken: SquareConfig = jwt_decode(token);

    // const datas = { user_id: decodedToken.data.user_id };

    const Authorization = 'Bearer ' + token;

    // const data = await fetch(LOGIN_ENDPOINT, {
    //   method: 'GET',
    //   body: JSON.stringify(datas),
    //   headers: {
    //     Authorization: Authorization
    //   }
    // });
    // const id_user = decodedToken.id;

    const { data } = await axios.get(`${LOGIN_ENDPOINT}`, {
      headers: {
        Authorization: Authorization
      }
    });
    const tab = [];
    tab.push(data);
    // console.log(data);
    return {
      data: data
      // success: data !== undefined
    };
  }
};

export { login, register, getUser };
