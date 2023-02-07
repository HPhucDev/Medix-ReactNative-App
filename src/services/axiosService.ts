import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance} from 'axios';
import {showMessage} from 'react-native-flash-message';
import {navigate} from '../../App';
import {globalModal} from '../components/GlobalModal';
import {PATCH_SCREEN} from '../constants/pathName';
import {BASE_URL} from '../environments/envDev';
import {checkTokenExp} from '../utils/tokenUtils';
import authenticationService from './authenticationService';

// closure: to save the refreshTokenRequest
let refreshTokenRequest: any = null;

const axiosService = async (): Promise<AxiosInstance> => {
  const accessToken = (await AsyncStorage.getItem('@accessToken')) || '';
  const refreshToken = (await AsyncStorage.getItem('@refreshToken')) || '';

  const loadRefreshToken = async () => {
    try {
      const response = await authenticationService.refreshToken({
        refreshToken: refreshToken,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const axiosOption = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  });

  axiosOption.interceptors.request.use(
    async (config: any) => {
      if (!checkTokenExp(accessToken)) {
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : loadRefreshToken();
        try {
          const response = await refreshTokenRequest;
          if (response) {
            await AsyncStorage.setItem('@accessToken', response?.accessToken);
            config.headers = {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + response?.data?.accessToken,
            };
            // reset token request for the next expiration
            refreshTokenRequest = null;
          }
        } catch (error: any) {
          refreshTokenRequest = null;
          if (!error.response) {
            globalModal.show({
              title: 'Lỗi khi kết nối với server',
              description: 'Không có kết nối đến server',
              type: 'failed',
            });
          }
        }

        return config;
      }

      return config;
    },

    error => {
      Promise.reject(error);
    },
  );

  axiosOption.interceptors.response.use(
    response => {
      return response;
    },
    errors => {
      console.log(
        'Error:',
        JSON.stringify(
          {
            url: errors.response.config.url,
            status: errors.response.status,
            method: errors.response.config.method,
            data: errors.response.data,
            headers: errors.response.headers,
          },
          null,
          2,
        ),
      );

      if (!errors.response) {
        globalModal.show({
          title: 'Lỗi khi kết nối với server',
          description: 'Không có kết nối đến server',
          type: 'failed',
        });
      }
      if (errors?.response?.status === 401) {
        navigate(PATCH_SCREEN.SIGN_IN);
        showMessage({message: 'Phiên đăng nhập đã hết hạn', type: 'danger'});
      }

      throw errors;
    },
  );

  return axiosOption;
};

export default axiosService;
