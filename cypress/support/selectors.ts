export const IngredientSelectors = {
  BUN_CRATOR: '[data-cy="643d69a5c3f7b9001cfa093c"]',           // Краторная булка
  MEAT_BIOCUTLET: '[data-cy="643d69a5c3f7b9001cfa0941"]',      // Биокотлета
  SAUCE_SPICY: '[data-cy="643d69a5c3f7b9001cfa0942"]',         // Соус Spicy-X
  BUN_FLUORESCENT: '[data-cy="643d69a5c3f7b9001cfa093d"]',     // Флюоресцентная булка
  SAUCE_SPACE: '[data-cy="643d69a5c3f7b9001cfa0943"]',         // Соус Space
} as const;

export const ConstructorSelectors = {
  BUN_TOP: '[data-cy="constructor-bun-top"]',
  BUN_BOTTOM: '[data-cy="constructor-bun-bottom"]',
  INGREDIENTS_LIST: '[data-cy="constructor-ingredients"]',
  TOTAL_PRICE: '[data-cy="constructor-price"]',
  ORDER_BUTTON: '[data-cy="order-button"]',
} as const;

export const ModalSelectors = {
  OVERLAY: '[data-cy="modal-overlay"]',
  CONTAINER: '[data-cy="modal"]',
  CLOSE_BUTTON: '[data-cy="modal-close"]',
  INGREDIENT_DETAILS: '[data-cy="ingredient-details"]',
  INGREDIENT_CALORIES: '[data-cy="ingredient-calories"]',
  INGREDIENT_PROTEINS: '[data-cy="ingredient-proteins"]',
  INGREDIENT_FAT: '[data-cy="ingredient-fat"]',
  INGREDIENT_CARBOHYDRATES: '[data-cy="ingredient-carbohydrates"]',
  ORDER_DETAILS: '[data-cy="order-details"]',
  ORDER_NUMBER: '[data-cy="order-number"]',
} as const;