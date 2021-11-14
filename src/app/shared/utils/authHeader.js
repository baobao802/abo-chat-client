import localStore from '../../shared/utils/localStore';

const auth = localStore.getItem('auth');
export const authHeader = {
  Authorization: `${auth?.tokenPrefix} ${auth?.accessToken}`,
};
