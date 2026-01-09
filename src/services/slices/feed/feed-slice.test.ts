import { expect, test, describe } from '@jest/globals';

import { feedReducer, initialState } from './feed-slice';

import { getFeeds } from '../../thunks/feed';

describe('теста слайса feeds', () => {
  test('тест успешного прохождения', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: {
        success: true,
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
        total: 86159,
        totalToday: 155
      }
    };

    const state = feedReducer(initialState, action);

    expect(state.total).toBe(86159);
    expect(state.totalToday).toBe(155);
    expect(state.orders).toEqual([
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
  });

  test('проверка на загрузку', () => {
    const action = {
      type: getFeeds.pending.type
    };

    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('проверка на ошибку при загрузки', () => {
    const action = {
      type: getFeeds.rejected.type,
      payload: 'ошибка загрузки'
    };

    const state = feedReducer(initialState, action);
    expect(state.error).toBe('ошибка загрузки');
  });
});
