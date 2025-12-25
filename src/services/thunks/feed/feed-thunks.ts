import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@shared/api';

// актион загрузки заказов. использует апищный метод.
export const getFeeds = createAsyncThunk(
  'orders/getFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (err) {
      return rejectWithValue('Ошибка при получении заказов');
    }
  }
);
