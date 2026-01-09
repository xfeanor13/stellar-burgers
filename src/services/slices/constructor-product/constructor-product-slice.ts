import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from 'types';
import { v4 as uuidv4 } from 'uuid';

interface IConstructorProductState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: IConstructorProductState = {
  bun: null,
  ingredients: []
};

// слайс конструктора
export const constructorProductSlice = createSlice({
  name: 'constructorProduct',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload as TConstructorIngredient;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      // добавляю Ид для соответствия интерфейсу TConstructorIngredient
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredient = state.ingredients[from];
      state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, ingredient);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

// экспортирую актионы для компонента конструктора бургера.
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorProductSlice.actions;
export const constructorProductReducer = constructorProductSlice.reducer;
