import { getIngredientsApi } from '../../../others/api/burger-api';
import { expect, test, describe } from '@jest/globals';
import { default as testStore } from '../../selectors/testStoreForSelectors';
import { fetchIngredients } from './ingredients-product-thunks';

jest.mock('../../../others/api/burger-api');

(getIngredientsApi as jest.Mock).mockImplementation(() =>
  Promise.resolve(
    // Метод json()
    [
      {
        id: '2',
        _id: 'bun-8',
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
        _id: 'sauce-9',
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
        _id: 'ingredient-10',
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
  )
);

test('test ingridients-product-thunk', async () => {
  await testStore.dispatch(fetchIngredients());
  const ingredients = testStore.getState().ingredientsProduct.items;
  expect(ingredients).toEqual([
    {
      id: '2',
      _id: 'bun-8',
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
      _id: 'sauce-9',
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
      _id: 'ingredient-10',
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
