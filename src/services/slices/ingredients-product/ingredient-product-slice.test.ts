import { expect, test, describe } from '@jest/globals';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  ingredientsProductReducer,
  initialState,
  IIngredientsState
} from './ingredients-product-slice';

import { fetchIngredients } from '../../thunks/ingredients-product';

describe('теста слайса ингредиентов', () => {
  const mockIngredients = [
    {
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
  ];

  interface IngredientsOnlyState {
    ingredientsProduct: IIngredientsState;
  }

  // Правильная типизация стореджа
  let store: {
    getState(): IngredientsOnlyState; // возвращается объект с ключом ingredientsProduct
    dispatch(action: any): void; // пока допускаем любое действие
  };

  beforeEach(() => {
    // Создаем новое хранилище перед каждым тестом
    store = configureStore({
      reducer: {
        ingredientsProduct: ingredientsProductReducer
      }
    });
  });

  test('test fulfilled', async () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsProductReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  test('ошибочная загрузка ингредиентов', async () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'ошибка сети'
    };
    const state = ingredientsProductReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('ошибка сети');
  });

  test('процесс загрузки', async () => {
    const action = {
      type: fetchIngredients.pending.type
    };
    const finalState = ingredientsProductReducer(initialState, action);

    expect(finalState.items).toEqual([]);
    expect(finalState.loading).toBe(true);
  });
});
