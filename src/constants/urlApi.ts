import {BASE_URL} from '../environments/envDev';

// Authentication
const AUTH_URL = `${BASE_URL}auth/`;
export const SIGN_IN_URL = `${AUTH_URL}signin`;
export const SIGN_OUT_URL = `${AUTH_URL}signout`;
export const REFRESH_TOKEN_URL = `${AUTH_URL}refresh-token`;

// Register
export const REGISTER_URL = `${BASE_URL}register`;
export const REGISTER_CONFIRM_URL = `${REGISTER_URL}/confirm-otp`;

// User
export const USER_URL = `${BASE_URL}api/users/`;
export const USER_INFO_URL = `${BASE_URL}api/users/user-info`;
export const CHANGE_PASSWORD_URL = `${USER_URL}change-password/`;
export const RECOVER_PASSWORD_URL = `${USER_URL}recover-password`;
export const FORGOT_PASSWORD_URL = `${USER_URL}forgot-password`;
export const CONFIRM_OTP_URL = `${USER_URL}confirm-otp`;
