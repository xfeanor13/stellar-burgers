import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsProductReducer } from '@slices/ingredients-product/ingredients-product-slice';
import { constructorProductReducer } from '@slices/constructor-product/constructor-product-slice';
import { userReducer } from '@slices/user/user-slice';
import { ordersReducer } from '@slices/orders/orders-slice';
import { feedReducer } from '@slices/feed/feed-slice';

export const rootReducer = combineReducers({
  ingredientsProduct: ingredientsProductReducer,
  constructorProduct: constructorProductReducer,
  user: userReducer,
  orders: ordersReducer,
  feed: feedReducer
});

const initialState = {
  ingredientsProduct: {
    items: [
      {
        _id: 'bun-1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'test-image.png',
        image_large: 'test-image-large.png',
        image_mobile: 'test-image-mobile.png'
      },
      {
        id: '2',
        _id: 'sauce-1',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'test-image.png',
        image_large: 'test-image-large.png',
        image_mobile: 'test-image-mobile.png'
      },
      {
        id: '3',
        _id: 'ingredient-1',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'test-image.png',
        image_large: 'test-image-large.png',
        image_mobile: 'test-image-mobile.png'
      }
    ],
    loading: false,
    error: null
  },

  constructorProduct: {
    bun: {
      id: '1',
      _id: 'bun-1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'test-image.png',
      image_large: 'test-image-large.png',
      image_mobile: 'test-image-mobile.png'
    },
    ingredients: [
      {
        id: '2',
        _id: 'sauce-1',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'test-image.png',
        image_large: 'test-image-large.png',
        image_mobile: 'test-image-mobile.png'
      },
      {
        id: '3',
        _id: 'ingredient-1',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'test-image.png',
        image_large: 'test-image-large.png',
        image_mobile: 'test-image-mobile.png'
      }
    ]
  },

  user: {
    user: {
      email: 'pochta',
      name: 'denis'
    },
    isAuth: false,
    isAuthChecked: false,
    loading: false,
    error: 'err',
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false
  },
  orders: {
    userOrders: [],
    loading: false,
    error: null,
    orderRequest: false,
    orderModalData: null
  },
  feed: {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  }
};

// создаю стор
const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
