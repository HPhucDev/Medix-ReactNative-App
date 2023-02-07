import axios from 'axios';
import {
  REFRESH_TOKEN_URL,
  REGISTER_CONFIRM_URL,
  REGISTER_URL,
  SIGN_IN_URL,
  SIGN_OUT_URL,
} from '../constants/urlApi';
import axiosService from './axiosService';
interface RefreshToken {
  refreshToken: string | null;
}
export interface RefreshTokenResponse {
  accessToken: string;
}
export interface SignIn {
  username: string;
  password: string;
}
export interface SignInResponse {
  id: number;
  username: string;
  accessToken: string;
  type: string;
  refreshToken: string;
}
interface Logout {
  pushToken: string | null;
}
export interface LogoutResponse {
  message: string;
}
export interface Register {
  fullName: string | null;
  username: string | null;
  password: string | null;
}
export interface RegisterResponse {
  message: string;
}
export interface ConfirmOTP {
  otp: string;
}
export interface ConfirmOTPResponse {
  message: string;
}

const authenticationService = {
  refreshToken: async (params: RefreshToken): Promise<RefreshTokenResponse> => {
    return axios({
      method: 'POST',
      url: REFRESH_TOKEN_URL,
      headers: {
        'Content-Type': 'text/plain',
      },
      data: params?.refreshToken,
    })
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  },
  signIn: async (params: SignIn): Promise<SignInResponse> => {
    return axios({
      method: 'POST',
      url: SIGN_IN_URL,
      data: params,
    })
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  },
  signOut: async (params: Logout): Promise<LogoutResponse> => {
    return (await axiosService())({
      method: 'POST',
      url: SIGN_OUT_URL,
      params,
    })
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  },
  register: async (dataBody: Register): Promise<RegisterResponse> => {
    return axios({
      method: 'POST',
      url: REGISTER_URL,
      data: dataBody,
    })
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  },
  confirmOTP: async (params: ConfirmOTP): Promise<ConfirmOTPResponse> => {
    return axios({
      method: 'POST',
      url: REGISTER_CONFIRM_URL,
      headers: {
        'Content-Type': 'text/plain',
      },
      data: params.otp,
    })
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  },
};

export default authenticationService;
