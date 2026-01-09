import { expect, test, describe } from '@jest/globals';

import { userReducer, initialState } from './user-slice';

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  checkUserAuth,
  logoutUser
} from '@thunks/user';

describe('test user-slice', () => {
  describe('test registerUser', () => {
    const mockUser = {
      email: 'horse',
      name: 'vasya'
    };
    test(' registerUser.fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };

      const state = userReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
    });
  });

  describe('test loginUser', () => {
    const mockUser = {
      email: 'horse',
      name: 'vasya'
    };
    test('loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };

      const state = userReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
    });
  });

  describe('test forgotPassword', () => {
    test('forgotPassword.fullfiled', () => {});
  });

  describe('test resetPassword', () => {
    test('resetPassword,fuldilled', () => {});
  });

  describe('test checkUserAuth', () => {
    test('checkUserAuth.fulfilled', () => {});
  });

  describe('test logoutUser', () => {
    test('logoutUser.fulfilled', () => {});
  });
});
