import axios from 'axios';
import { toast } from 'react-toastify';
import {
  APIGOOGLEAUTH_URL,
  APILOCALAUTH_URL,
  APILOGOUT_URL,
  API_CHECKAUTH,
} from '../config';

export const checkAuth = async () => {
  let res = await axios.get(`${API_CHECKAUTH}`, { withCredentials: true });
  return res.data;
};

export const handleGAuth = async (e) => {
  e.preventDefault();
  window.open(`${APIGOOGLEAUTH_URL}`, '_self');
};

export const postLoginData = async (e, fetchUser, inputs) => {
  e.preventDefault();
  const { userEmail, userPassword } = inputs;
  if (userEmail === '' || userPassword === '')
    return toast.warning('Please fill the login details');

  if (userEmail.split('@')[1] !== 'tothenew.com')
    return toast.error('Only ToTheNew email can be used');

  axios
    .post(
      `${APILOCALAUTH_URL}`,
      {
        username: userEmail,
        password: userPassword,
      },
      { withCredentials: true }
    )
    .then(() => {
      fetchUser();
    })
    .catch((err) => toast.error('Invalid Credentials'));
};

export function handleLogout() {
  window.open(`${APILOGOUT_URL}`, '_self');
}
