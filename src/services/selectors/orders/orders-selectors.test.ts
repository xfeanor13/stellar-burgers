import { expect, test, describe } from '@jest/globals';
import {
  selectUserOrders,
  selectOrderModalData,
  selectOrderRequest
} from './orders-selectors';
import { default as testStore } from '../testStoreForSelectors';

describe('test order-selectors', () => {
  test('test selectUserOrders', () => {
    const orders = selectUserOrders(testStore.getState());
    expect(orders).toHaveLength(0);
  });
  test('test selectOrderModalData', () => {
    const modalData = selectOrderModalData(testStore.getState());
    expect(modalData).toBeNull();
  });
  test('test selectOrderRequest', () => {
    const orderRequest = selectOrderRequest(testStore.getState());
    expect(orderRequest).toBe(false);
  });
});
