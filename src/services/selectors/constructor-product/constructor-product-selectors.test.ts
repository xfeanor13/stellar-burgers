import { expect, test, describe } from '@jest/globals';
import {
  selectConstructorBun,
  selectConstructorIngredients
} from './constructor-product-selectors';
import { default as testStore } from '../testStoreForSelectors';

describe('test selectors constructor', () => {
  test('test selectConstructorBun', () => {
    const bun = selectConstructorBun(testStore.getState());
    expect(bun).toEqual({
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
    });
  });
  test('selectConstructorIngredients', () => {
    const ingredients = selectConstructorIngredients(testStore.getState());
    expect(ingredients).toEqual([
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
});
