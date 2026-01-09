import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { createOrder, getOrderByNumber, getUserOrders } from '@thunks/orders';
import { TOrder } from 'types';

interface IOrdersState {
  userOrders: TOrder[];
  loading: boolean;
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: IOrdersState = {
  userOrders: [],
  loading: false,
  error: null,
  orderRequest: false,
  orderModalData: null
};

// создаю слайс для заказов
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    // Обработка загрузки списка заказов пользователя
    builder.addCase(getUserOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Обработка создания заказа
    builder.addCase(createOrder.pending, (state) => {
      state.orderRequest = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = action.payload;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.orderRequest = false;
      state.error = action.payload as string;
    });

    // Обработка получения заказа по номеру
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.orderModalData = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderByNumber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { clearOrderModalData } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
