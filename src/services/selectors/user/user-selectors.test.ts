import { expect, test, describe } from '@jest/globals';
import {
  selectUser,
  selectIsAuthChecked,
  selectIsAuth,
  selectUserLoading,
  selectUserError
} from './user-selectors';
import { default as testStore } from '../testStoreForSelectors';

describe('test user-selectors', () => {
  test('test selectUser', () => {
    const user = selectUser(testStore.getState());
    expect(user).toEqual({
      email: 'pochta',
      name: 'denis'
    });
  });
  test('test selectIsAuthChecked', () => {
    const authChecked = selectIsAuthChecked(testStore.getState());
    expect(authChecked).toBe(false);
  });
  test('test selectIsAuth', () => {
    const isAuth = selectIsAuth(testStore.getState());
    expect(isAuth).toBe(false);
  });
  test('test selectUserLoading', () => {
    const userLoading = selectUserLoading(testStore.getState());
    expect(userLoading).toBe(false);
  });
  test('test selectUserError', () => {
    const error = selectUserError(testStore.getState());
    expect(error).toBe('err');
  });
});
