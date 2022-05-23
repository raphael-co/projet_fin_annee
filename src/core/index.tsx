import axios from 'axios';
import jwt_decode from 'jwt-decode';
const SERVER_URL = 'http://localhost:8000';

const getData = async (url: any, data: any) => {
  const rep = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  //console.log(rep);
  const json = await rep.json();
  //console.log(json);

  return json;
};

const login = async (data: any) => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/login.php`;

  try {
    // const response = await fetch(LOGIN_ENDPOINT, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    // console.log(response);
    const data_JSON = await getData(LOGIN_ENDPOINT, data);
    // console.log('Mmm.... ', data_JSON.message);
    if (data_JSON.token) {
      //   console.log('Mmm.... ', data_JSON.token);
      //   console.log(response);

      const jwt = data_JSON.token;
      console.log(data_JSON);
      // let expire_at = response.data.expireAt;
      localStorage.setItem('access_token', jwt);
      return true;
      //   localStorage.setItem('expire_at', expire_at);
    } else {
      // console.log(response);
      console.log(data_JSON);
      return data_JSON;
    }
  } catch (e) {
    console.log(e);
  }
};
const register = async (data: any) => {
  const SIGNUP_ENDPOINT = `${SERVER_URL}/register.php`;

  const data_JSON = await getData(SIGNUP_ENDPOINT, data);

  if (data_JSON.success == 1) {
    return true;
  } else {
    return data_JSON;
  }
};

interface SquareConfig {
  exp?: string;
  data?: any;
  // width?: number;
}

// const getDataWithToken = async (url: any, data: any, Authorization: any) => {
//   const rep = await fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       Authorization: Authorization
//     }
//   });

//   //console.log(rep);
//   const json = await rep.json();
//   //console.log(json);

//   return json;
// };

const getUser = async () => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/getUser.php`;
  const token = localStorage.getItem('access_token');

  if (token) {
    const decodedToken: SquareConfig = jwt_decode(token);

    const datas = { user_id: decodedToken.data.user_id };

    const Authorization = 'Bearer ' + token;

    //   const data_JSON = await getDataWithToken(
    //     LOGIN_ENDPOINT,
    //     data,
    //     Authorization
    //   );

    //   // console.log(data_JSON.user);
    //   return data_JSON.user;

    const { data } = await axios.get(`${LOGIN_ENDPOINT}`, {
      headers: {
        Authorization: Authorization
      },
      params: {
        LOGIN_ENDPOINT,
        datas
      }
    });
    const tab = [];
    tab.push(data);
    // console.log(data.user);
    return {
      data: data,
      success: data !== undefined
    };
  }
};

const logout = async () => {
  const token = localStorage.getItem('access_token');
  const Authorization = 'Bearer ' + token;
  const url = `${SERVER_URL}/deleteToken.php`;

  try {
    const rep = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: Authorization
      }
    });

    if (rep) {
      localStorage.removeItem('access_token');
      location.reload();
    } else {
    }
  } catch (error) {
    localStorage.removeItem('access_token');
    location.reload();
  }
};

export { login, register, logout, getUser };
