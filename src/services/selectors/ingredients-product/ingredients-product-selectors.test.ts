import { expect, test, describe } from '@jest/globals';
import {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError,
  selectBuns,
  selectMains,
  selectSauces
} from './ingredients-product-selectors';
import { default as testStore } from '../testStoreForSelectors';

describe('test ingredients-product-selectors', () => {
  test('test selectIngredients', () => {
    const ingredients = selectIngredients(testStore.getState());
    expect(ingredients).toEqual([
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
    ]);
  });
  test('test selectIngredientsLoading', () => {
    const loading = selectIngredientsLoading(testStore.getState());
    expect(loading).toBe(false);
  });
  test('test selectIngredientsError', () => {
    const error = selectIngredientsError(testStore.getState());
    expect(error).toBeNull();
  });
  test('test selectBuns', () => {
    const buns = selectBuns(testStore.getState());
    expect(buns).toEqual([
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
      }
    ]);
  });
  test('test selectMains', () => {
    const mains = selectMains(testStore.getState());
    expect(mains).toEqual([
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
    ]);
  });
  test('test selectSauces', () => {
    const sauce = selectSauces(testStore.getState());
    expect(sauce).toEqual([
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
      }
    ]);
  });
});
