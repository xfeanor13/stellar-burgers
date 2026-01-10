import { expect, test, describe } from '@jest/globals';
import {
  selectFeedOrders,
  selectFeedLoading,
  selectFeedError,
  selectFeedTotal,
  selectFeedTotalToday
} from './feed-selectors';
import { default as testStore } from '../testStoreForSelectors';

describe('test feed-selectors', () => {
  test('test selectFeedOrders', () => {
    const orders = selectFeedOrders(testStore.getState());
    expect(orders).toHaveLength(0);
  });
  test('test selectFeedLoading', () => {
    const loading = selectFeedLoading(testStore.getState());
    expect(loading).toBe(false);
  });
  test('test selectFeedError', () => {
    const error = selectFeedError(testStore.getState());
    expect(error).toBeNull();
  });
  test('test selectFeedTotal', () => {
    const total = selectFeedTotal(testStore.getState());
    expect(total).toBe(0);
  });
  test('test selectFeedTotalToday', () => {
    const total = selectFeedTotalToday(testStore.getState());
    expect(total).toBe(0);
  });
});
