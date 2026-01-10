import { expect, test, describe } from '@jest/globals';
import { ordersReducer, initialState } from './orders-slice';
import { getUserOrders, createOrder, getOrderByNumber } from '@thunks/orders';

describe('проверка слайса orders-slice', () => {
  describe('test getUserOrders', () => {
    const mockOrders = {
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
      ]
    };

    test('getUserOrders.fulfilled', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: mockOrders
      };

      const state = ordersReducer(initialState, action);
      expect(state.userOrders).toEqual(mockOrders);
    });

    test('getUserOrders.pending', () => {
      const action = {
        type: getUserOrders.pending.type
      };

      const state = ordersReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('getUserOrders.rejected', () => {
      const action = {
        type: getUserOrders.rejected.type,
        payload: 'ошибка при загрузке'
      };

      const state = ordersReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('ошибка при загрузке');
    });
  });

  describe('test createOrder', () => {
    const mockOrder = {
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
    };
    test('createOrder.fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = ordersReducer(initialState, action);
      expect(state.orderModalData).toEqual(mockOrder);
    });

    test('createOrder.pending', () => {
      const action = {
        type: createOrder.pending.type
      };
      const state = ordersReducer(initialState, action);

      expect(state.orderRequest).toBe(true);
    });

    test('createOrder.rejected', () => {
      const action = {
        type: createOrder.rejected.type,
        payload: 'ошибка при загрузке'
      };
      const state = ordersReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('ошибка при загрузке');
    });
  });

  describe('test getOrderByNumber', () => {
    const mockOrder = {
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
    };

    test('getOrderByNumber.fulfilled', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const state = ordersReducer(initialState, action);
      expect(state.orderModalData).toBe(mockOrder);
    });

    test('getOrderByNumber.pending', () => {
      const action = {
        type: getOrderByNumber.pending.type
      };
      const state = ordersReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('getOrderByNumber.rejected', () => {
      const action = {
        type: getUserOrders.rejected.type,
        payload: 'ошибка при загрузке'
      };

      const state = ordersReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('ошибка при загрузке');
    });
  });
});
