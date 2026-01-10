import { expect, test, describe } from '@jest/globals';
import { default as testStore } from '../../selectors/testStoreForSelectors';
import { getUserOrders, createOrder, getOrderByNumber } from './orders-thunks';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../../others/api/burger-api';

jest.mock('../../../others/api/burger-api', () => ({
  getOrdersApi: jest.fn(),
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

// Настройка первых двух функций
(getOrdersApi as jest.Mock).mockResolvedValueOnce([
  {
    _id: '689e3499673086001ba82dca',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0946'],
    status: 'done',
    name: 'Традиционный-галактический флюоресцентный минеральный бессмертный бургер',
    createdAt: '2025-08-14T19:10:17.951Z',
    updatedAt: '2025-08-14T19:10:18.884Z',
    number: 86534
  },
  {
    _id: '689e31cb673086001ba82dc8',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093f'],
    status: 'done',
    name: 'Флюоресцентный бессмертный бургер',
    createdAt: '2025-08-14T18:58:19.664Z',
    updatedAt: '2025-08-14T18:58:20.819Z',
    number: 86533
  }
]);

// Настройка третьей функции
(getOrderByNumberApi as jest.Mock).mockResolvedValueOnce({
  orders: [
    {
      _id: '689e31cb673086001ba82dc8',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093f'],
      status: 'done',
      name: 'Флюоресцентный бессмертный бургер',
      createdAt: '2025-08-14T18:58:19.664Z',
      updatedAt: '2025-08-14T18:58:20.819Z',
      number: 86533
    }
  ]
});
(orderBurgerApi as jest.Mock).mockResolvedValueOnce({
  order: {
    _id: '689e3499673086001ba82dca',
    ingredients: ['1', '2', '3'],
    status: 'done',
    name: 'Традиционный-галактический флюоресцентный минеральный бессмертный бургер',
    createdAt: '2025-08-14T19:10:17.951Z',
    updatedAt: '2025-08-14T19:10:18.884Z',
    number: 86534
  },
  name: 'burger',
  success: true
});

describe('test orders-thunks', () => {
  test('test getUserOrders', async () => {
    await testStore.dispatch(getUserOrders());
    const userOrders = testStore.getState().orders.userOrders;
    expect(userOrders).toEqual([
      {
        _id: '689e3499673086001ba82dca',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0946'],
        status: 'done',
        name: 'Традиционный-галактический флюоресцентный минеральный бессмертный бургер',
        createdAt: '2025-08-14T19:10:17.951Z',
        updatedAt: '2025-08-14T19:10:18.884Z',
        number: 86534
      },
      {
        _id: '689e31cb673086001ba82dc8',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093f'],
        status: 'done',
        name: 'Флюоресцентный бессмертный бургер',
        createdAt: '2025-08-14T18:58:19.664Z',
        updatedAt: '2025-08-14T18:58:20.819Z',
        number: 86533
      }
    ]);
  });
  test('test createOrder', async () => {
    await testStore.dispatch(createOrder(['1', '2', '3']));
    const modalData = testStore.getState().orders.orderModalData;
    expect(modalData).toEqual({
      _id: '689e3499673086001ba82dca',
      ingredients: ['1', '2', '3'],
      status: 'done',
      name: 'Традиционный-галактический флюоресцентный минеральный бессмертный бургер',
      createdAt: '2025-08-14T19:10:17.951Z',
      updatedAt: '2025-08-14T19:10:18.884Z',
      number: 86534
    });
  });
  test('test getOrderByNumber', async () => {
    await testStore.dispatch(getOrderByNumber('3'));
    const modalData = testStore.getState().orders.orderModalData;
    expect(modalData).toEqual({
      _id: '689e31cb673086001ba82dc8',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093f'],
      status: 'done',
      name: 'Флюоресцентный бессмертный бургер',
      createdAt: '2025-08-14T18:58:19.664Z',
      updatedAt: '2025-08-14T18:58:20.819Z',
      number: 86533
    });
  });
});
