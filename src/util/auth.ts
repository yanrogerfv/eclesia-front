// utils/auth.ts
import Cookies from 'js-cookie';

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

export const getToken = (): string | null => {
  return Cookies.get('token') || null;
};