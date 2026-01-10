import { expect, test, describe } from '@jest/globals';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TIngredient } from 'types';

import { constructorProductReducer } from './constructor-product-slice';

import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from './constructor-product-slice';

describe('constructor-product-slice', () => {
  const red = combineReducers({
    constructorProduct: constructorProductReducer
  });

  const store = configureStore({
    reducer: red
  });

  afterEach(() => {
    store.dispatch(clearConstructor());
  });

  const mockBun: TIngredient = {
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
  };

  const mockIngredient: TIngredient = {
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
  };

  const mockSauce: TIngredient = {
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
  };

  test('добавление булки', () => {
    store.dispatch(addIngredient(mockBun));
    const state = store.getState().constructorProduct;

    expect(state.bun).toBeDefined();
    expect(state.bun?.name).toBe('Краторная булка N-200i');
    expect(state.bun?.type).toBe('bun');
    expect(state.bun?.id).toBeDefined();
  });

  test('добавление ингредиента', () => {
    store.dispatch(addIngredient(mockIngredient));
    const state = store.getState().constructorProduct;
    expect(state.ingredients).toBeDefined();
    expect(state.ingredients[0]?.name).toBe(
      'Биокотлета из марсианской Магнолии'
    );
    expect(state.ingredients[0]?.type).toBe('main');
    expect(state.ingredients[0]?.id).toBeDefined();
  });

  test('добавление котлеты и соуса', () => {
    store.dispatch(addIngredient(mockIngredient));
    store.dispatch(addIngredient(mockSauce));
    const state = store.getState().constructorProduct;
    expect(state.ingredients.length).toBe(2);
  });

  test('удаление ингредиента', () => {
    const removeInitialState = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: 'ingredient-id-1' },
        { ...mockSauce, id: 'ingredient-id-2' }
      ]
    };
    const action = removeIngredient('ingredient-id-1');
    const state = constructorProductReducer(removeInitialState, action);
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0].id).toBe('ingredient-id-2');
  });

  test('перемещение ингредиента', () => {
    const removeInitialState = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: 'ingredient-id-1' },
        { ...mockSauce, id: 'ingredient-id-2' }
      ]
    };
    const action = moveIngredient({ from: 1, to: 0 });
    const state = constructorProductReducer(removeInitialState, action);
    expect(state.ingredients[0].id).toBe('ingredient-id-2');
  });

  test('очищение конструктора', () => {
    store.dispatch(addIngredient(mockBun));
    store.dispatch(addIngredient(mockIngredient));
    store.dispatch(addIngredient(mockSauce));
    const state = store.getState().constructorProduct;
    expect(state.ingredients.length).toBe(2);
    expect(state.bun).not.toBeNull();
    store.dispatch(clearConstructor());

    const clearedState = store.getState().constructorProduct;
    expect(clearedState.ingredients.length).toBe(0); // ожидание пустого массива ингредиентов
    expect(clearedState.bun).toBe(null); // булочки больше нет
  });
});
