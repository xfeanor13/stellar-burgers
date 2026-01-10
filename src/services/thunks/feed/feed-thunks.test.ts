import { expect, test, describe } from '@jest/globals';
import { default as testStore } from '../../selectors/testStoreForSelectors';
import { getFeeds } from './feed-thunks';
import { getFeedsApi } from '../../../others/api/burger-api';

jest.mock('../../../others/api/burger-api');
(getFeedsApi as jest.Mock).mockImplementation(() =>
  Promise.resolve({
    // Метод json()
    orders: [
      {
        _id: '689e3499673086001ba82dca',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Традиционный-галактический флюоресцентный минеральный бессмертный бургер',
        createdAt: '2025-08-14T19:10:17.951Z',
        updatedAt: '2025-08-14T19:10:18.884Z',
        number: 86534
      },
      {
        _id: '689e31cb673086001ba82dc8',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный бессмертный бургер',
        createdAt: '2025-08-14T18:58:19.664Z',
        updatedAt: '2025-08-14T18:58:20.819Z',
        number: 86533
      }
    ],
    total: 2,
    totalToday: 2,
    success: true
  })
);

test('test getFeeds', async () => {
  await testStore.dispatch(getFeeds());
  const state = testStore.getState();
  expect(state.feed.orders).toEqual([
    {
      _id: '689e3499673086001ba82dca',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Традиционный-галактический флюоресцентный минеральный бессмертный бургер',
      createdAt: '2025-08-14T19:10:17.951Z',
      updatedAt: '2025-08-14T19:10:18.884Z',
      number: 86534
    },
    {
      _id: '689e31cb673086001ba82dc8',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный бессмертный бургер',
      createdAt: '2025-08-14T18:58:19.664Z',
      updatedAt: '2025-08-14T18:58:20.819Z',
      number: 86533
    }
  ]);
  expect(state.feed.total).toBe(2);
  expect(state.feed.totalToday).toBe(2);
});
