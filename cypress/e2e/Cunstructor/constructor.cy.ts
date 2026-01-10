  import {
  IngredientSelectors,
  ConstructorSelectors,
  ModalSelectors
} from '../../support/selectors';

describe('Конструктор бургеров', () => {
    beforeEach(() => {
      // Перехватываем API запросы и подставляем моковые данные
      cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
      cy.intercept('GET', '**/api/auth/user', { statusCode: 401, body: { success: false, message: 'Unauthorized' } }).as('getUser');
      cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
      
      // Посещаем главную страницу
      cy.visit('/');
      
      // Ждем загрузки ингредиентов
      cy.wait('@getIngredients');
      
      // Ждем, чтобы убедиться что все элементы загрузились
      cy.wait(2000);
    });
  
    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
    });
  
    it('должен добавлять ингредиенты в конструктор', () => {
      // Ждем, пока элементы станут видимыми и прокручиваем к ним
      cy.get(IngredientSelectors.BUN_CRATOR).scrollIntoView().should('be.visible');
      
      // Добавляем булку
      cy.get(IngredientSelectors.BUN_CRATOR).find('button').click({ force: true });
      
      // Проверяем, что булка добавилась в конструктор
      cy.get(ConstructorSelectors.BUN_TOP).should('contain', 'Краторная булка N-200i');
      cy.get(ConstructorSelectors.BUN_BOTTOM).should('contain', 'Краторная булка N-200i');
      
      // Добавляем основной ингредиент
      cy.get(IngredientSelectors.MEAT_BIOCUTLET).scrollIntoView().should('be.visible');
      cy.get(IngredientSelectors.MEAT_BIOCUTLET).find('button').click({ force: true });
      
      // Проверяем, что основной ингредиент добавился
      cy.get(ConstructorSelectors.INGREDIENTS_LIST).should('contain', 'Биокотлета из марсианской Магнолии');
      
      // Добавляем соус
      cy.get(IngredientSelectors.SAUCE_SPICY).scrollIntoView().should('be.visible');
      cy.get(IngredientSelectors.SAUCE_SPICY).find('button').click({ force: true });
      
      // Проверяем, что соус добавился
      cy.get(ConstructorSelectors.INGREDIENTS_LIST).should('contain', 'Соус Spicy-X');
      
      // Проверяем, что цена обновилась
      cy.get(ConstructorSelectors.TOTAL_PRICE).should('contain', '3024');
    });
  
    it('должен открывать модальное окно ингредиента', () => {
      // Кликаем на ингредиент (по Link области)
      cy.get(IngredientSelectors.MEAT_BIOCUTLET).find('a').click({ force: true });
      
      // Проверяем, что модальное окно открылось
      cy.get(ModalSelectors.CONTAINER).should('be.visible');
      cy.get(ModalSelectors.INGREDIENT_DETAILS).should('be.visible');
      cy.get(ModalSelectors.INGREDIENT_DETAILS).should('contain', 'Биокотлета из марсианской Магнолии');
      
      // Проверяем детали ингредиента
      cy.get(ModalSelectors.INGREDIENT_CALORIES).should('contain', '4242');
      cy.get(ModalSelectors.INGREDIENT_PROTEINS).should('contain', '420');
      cy.get(ModalSelectors.INGREDIENT_FAT).should('contain', '142');
      cy.get(ModalSelectors.INGREDIENT_CARBOHYDRATES).should('contain', '242');
    });
  
    it('должен закрывать модальное окно по клику на крестик', () => {
      // Открываем модальное окно
      cy.get(IngredientSelectors.MEAT_BIOCUTLET).find('a').click({ force: true });
      cy.get(ModalSelectors.CONTAINER).should('be.visible');
      
      // Закрываем по клику на кнопку
      cy.get(ModalSelectors.CLOSE_BUTTON).find('svg').click({ force: true });
      
      // Проверяем, что модальное окно закрылось
      cy.get(ModalSelectors.CONTAINER).should('not.exist');
    });
  
    it('должен закрывать модальное окно по клику на оверлей', () => {
      // Открываем модальное окно
      cy.get(IngredientSelectors.MEAT_BIOCUTLET).find('a').click({ force: true });
      cy.get(ModalSelectors.CONTAINER).should('be.visible');
      
      // Закрываем по клику на оверлей
      cy.get(ModalSelectors.OVERLAY).click({ force: true });
      
      // Проверяем, что модальное окно закрылось
      cy.get(ModalSelectors.CONTAINER).should('not.exist');
    });
  
    it('должен создавать заказ', () => {
      // Перехватываем запрос пользователя как успешный для этого теста
      cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUserSuccess');
      
      // Устанавливаем токены авторизации
      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
        win.localStorage.setItem('accessToken', 'test-access-token');
      });
      cy.setCookie('accessToken', 'test-access-token');
      
      // Обновляем страницу для применения авторизации
      cy.reload();
      cy.wait('@getIngredients');
      cy.wait(2000);
      
      // Добавляем булку
      cy.get(IngredientSelectors.BUN_CRATOR).find('button').click({ force: true });
      
      // Добавляем основной ингредиент
      cy.get(IngredientSelectors.MEAT_BIOCUTLET).scrollIntoView();
      cy.get(IngredientSelectors.MEAT_BIOCUTLET).find('button').click({ force: true });
      
      // Добавляем соус
      cy.get(IngredientSelectors.SAUCE_SPICY).scrollIntoView();
      cy.get(IngredientSelectors.SAUCE_SPICY).find('button').click({ force: true });
      
      // Кликаем на кнопку "Оформить заказ"
      cy.get(ConstructorSelectors.ORDER_BUTTON).click({ force: true });
      
      // Ждем создания заказа
      cy.wait('@createOrder');
      
      // Проверяем, что модальное окно заказа открылось
      cy.get(ModalSelectors.ORDER_DETAILS).should('be.visible');
      cy.get(ModalSelectors.ORDER_NUMBER).should('contain', '12345');
      
      // Закрываем модальное окно заказа
      cy.get(ModalSelectors.CLOSE_BUTTON).find('svg').click({ force: true });
      
      // Проверяем, что модальное окно закрылось
      cy.get(ModalSelectors.CONTAINER).should('not.exist');
      
      // Проверяем, что конструктор очистился
      cy.get(ConstructorSelectors.BUN_TOP).should('contain', 'Выберите булки');
      cy.get(ConstructorSelectors.BUN_BOTTOM).should('contain', 'Выберите булки');
      cy.get(ConstructorSelectors.INGREDIENTS_LIST).should('contain', 'Выберите начинку');
      cy.get(ConstructorSelectors.TOTAL_PRICE).should('contain', '0');
    });
  
    it('должен перенаправлять на страницу входа при попытке заказа без авторизации', () => {
      // Добавляем булку
      cy.get(IngredientSelectors.BUN_CRATOR).find('button').click({ force: true });
      
      // Добавляем основной ингредиент
      cy.get(IngredientSelectors.MEAT_BIOCUTLET).find('button').click({ force: true });
      
      // Кликаем на кнопку "Оформить заказ"
      cy.get(ConstructorSelectors.ORDER_BUTTON).click({ force: true });
      
      // Проверяем, что произошло перенаправление на страницу входа
      cy.url().should('include', '/login');
    });
  });
  

