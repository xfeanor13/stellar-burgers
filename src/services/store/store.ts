import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsProductReducer } from '@slices/ingredients-product/ingredients-product-slice';
import { constructorProductReducer } from '@slices/constructor-product/constructor-product-slice';
import { userReducer } from '@slices/user/user-slice';
import { ordersReducer } from '@slices/orders/orders-slice';
import { feedReducer } from '@slices/feed/feed-slice';

// комбинирую слайсы в стор
export const rootReducer = combineReducers({
  ingredientsProduct: ingredientsProductReducer,
  constructorProduct: constructorProductReducer,
  user: userReducer,
  orders: ordersReducer,
  feed: feedReducer
});

// создаю стор
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// типизирую стор и диспатч
export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;

export default store;
