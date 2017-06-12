import ShoppingCartService from '../../services/ShoppingCart/ShoppingCartService';

const PRICING_RULES = require('../../data/priceRules');
const shoppingCartService = new ShoppingCartService(PRICING_RULES);

function createCart (qty, productType, productPrice) {
  const shoppingCart = [];
  for (let i=0; i<qty; i++) {
    const item = Object.assign({},
      {jobTitle: 'Job A - Standout'},
      {jobDescription: 'This is a another TOP job description'},
      {jobCategory: 'IT - Software Developer'},
      {jobProduct: productType},
      {jobPrice: productPrice});
    shoppingCart.push(item);
  }
  return shoppingCart;
}

describe('SEEK Job Specials Add', () => {
  let classicPrice = {};
  let standOutPrice = {};
  let premiumItemPerPrice = {};

  beforeEach(() => {
    classicPrice = PRICING_RULES.PRODUCT_PRICE.find((p) => p.label === PRICING_RULES.CLASSIC_AD);
    standOutPrice = PRICING_RULES.PRODUCT_PRICE.find((p) => p.label === PRICING_RULES.STANDOUT_AD);
    premiumItemPerPrice = PRICING_RULES.PRODUCT_PRICE.find((p) => p.label === PRICING_RULES.PREMIUM_AD);
  });

  describe('Default', () => {
    let user = {};

    beforeEach(() => {
      user = {userName : 'Bloke - Default', userRole : PRICING_RULES.NORMAL};
      shoppingCartService.setUser(user);
    });
    test('EXAMPLE SCENARIO Default', () => {
      const shoppingCartA = createCart(1, PRICING_RULES.CLASSIC_AD, classicPrice.price);
      const shoppingCartB = createCart(1, PRICING_RULES.STANDOUT_AD, standOutPrice.price);
      const shoppingCartC = createCart(1, PRICING_RULES.PREMIUM_AD, premiumItemPerPrice.price);
      shoppingCartService.processCart([...shoppingCartA, ...shoppingCartB, ...shoppingCartC], user).then(cartDetails => {
        expect(cartDetails.cartItems.length).toBe(3);
        expect(cartDetails.total).toBe(987.97);
      });
    });
  });

  describe('Unilever', () => {
    let user = {};
    let itemPerPrice = {};

    beforeEach(() => {
      user = {userName : 'Jane - UNILEVER', userRole : PRICING_RULES.UNILEVER};
      itemPerPrice = PRICING_RULES.PRODUCT_PRICE.find((p) => p.label === PRICING_RULES.CLASSIC_AD);
      shoppingCartService.setUser(user);
    });
    test('should be 3 for 2 deal on Classic Adds', () => {
      const shoppingCart = createCart(3, PRICING_RULES.CLASSIC_AD, classicPrice.price);
      shoppingCartService.processCart(shoppingCart, user).then(cartDetails => {
        expect(cartDetails.cartItems.length).toBe(3);
        expect(cartDetails.discTotal).toBe(269.99);
        expect(cartDetails.total).toBe(269.99 * 3 - 269.99);
      });
    });
    test('EXAMPLE SCENARIO Customer: Unilever - should be 3 for 2 deal on Classic Adds', () => {
      const shoppingCartA = createCart(3, PRICING_RULES.CLASSIC_AD, classicPrice.price);
      const shoppingCartB = createCart(1, PRICING_RULES.PREMIUM_AD, premiumItemPerPrice.price);
      shoppingCartService.processCart([...shoppingCartA, ...shoppingCartB], user).then(cartDetails => {
        expect(cartDetails.cartItems.length).toBe(4);
        expect(cartDetails.total).toBe(934.97);
      });
    });
  });

  describe('Apple', () => {
    let user = {};
    let standoutItemPerPrice = {};
    let premiumItemPerPrice = {};

    beforeEach(() => {
      user = {userName : 'Joe - APPLE',    userRole : PRICING_RULES.APPLE};
      standoutItemPerPrice = PRICING_RULES.PRODUCT_PRICE.find((p) => p.label === PRICING_RULES.STANDOUT_AD);
      premiumItemPerPrice = PRICING_RULES.PRODUCT_PRICE.find((p) => p.label === PRICING_RULES.PREMIUM_AD);
      shoppingCartService.setUser(user);
    });
    test('should drop price to 299.99 on Standout Adds', () => {
      const shoppingCart = createCart(1, PRICING_RULES.STANDOUT_AD, standoutItemPerPrice.price);
      shoppingCartService.processCart(shoppingCart, user).then(cartDetails => {
        expect(cartDetails.cartItems.length).toBe(1);
        expect(cartDetails.cartItems[0].jobPrice).toBe(299.99);
      });
    });
    test('EXAMPLE SCENARIO Customer: APPLE - should drop price to 299.99 on Standout Adds', () => {
      const shoppingCartA = createCart(3, PRICING_RULES.STANDOUT_AD, standoutItemPerPrice.price);
      const shoppingCartB = createCart(1, PRICING_RULES.PREMIUM_AD, premiumItemPerPrice.price);
      shoppingCartService.processCart([...shoppingCartA, ...shoppingCartB], user).then(cartDetails => {
        expect(cartDetails.cartItems.length).toBe(4);
        expect(cartDetails.total).toBe(1294.96);
      });
    });
  });

  describe('Nike', () => {
    let user = {};
    let premiumItemPerPrice = {};

    beforeEach(() => {
      user =   {userName :'Donald - NIKE',  userRole :PRICING_RULES.NIKE};
      premiumItemPerPrice = PRICING_RULES.PRODUCT_PRICE.find((p) => p.label === PRICING_RULES.PREMIUM_AD);
      shoppingCartService.setUser(user);
    });
    test('should drop price when 4 or more Premium Adds is added', () => {
      const shoppingCartA = createCart(5, PRICING_RULES.PREMIUM_AD, premiumItemPerPrice.price);
      shoppingCartService.processCart(shoppingCartA, user).then(cartDetails => {
        expect(cartDetails.cartItems.length).toBe(5);
        expect(cartDetails.cartItems[0].jobPrice).toBe(379.99);
        expect(cartDetails.cartItems[1].jobPrice).toBe(379.99);
        expect(cartDetails.cartItems[2].jobPrice).toBe(379.99);
        expect(cartDetails.cartItems[3].jobPrice).toBe(379.99);
      });
    });
    test('should NOT drop price when 3 or LESS Premium Adds is added', () => {
      const shoppingCartB = createCart(2, PRICING_RULES.PREMIUM_AD, premiumItemPerPrice.price);
      shoppingCartService.processCart(shoppingCartB, user).then(cartDetails => {
        expect(cartDetails.cartItems.length).toBe(2);
        expect(cartDetails.cartItems[0].jobPrice).toBe(394.99);
        expect(cartDetails.cartItems[1].jobPrice).toBe(394.99);
      });
    });
    test('EXAMPLE SCENARIO Customer: Nike - should NOT drop price when 3 or LESS Premium Adds is added', () => {
      const shoppingCartB = createCart(4, PRICING_RULES.PREMIUM_AD, premiumItemPerPrice.price);
      shoppingCartService.processCart(shoppingCartB, user).then(cartDetails => {
        expect(cartDetails.cartItems.length).toBe(4);
        expect(cartDetails.total).toBe(1519.96);
      });
    });
  });

  describe('Ford', () => {
    let user = {};
    let classicPrice = {};
    let standOutPrice = {};
    let premiumItemPerPrice = {};

    beforeEach(() => {
      user = {userName : 'Tarzan - FORD', userRole : PRICING_RULES.FORD};
      classicPrice = PRICING_RULES.PRODUCT_PRICE.find((p) => p.label === PRICING_RULES.CLASSIC_AD);
      standOutPrice = PRICING_RULES.PRODUCT_PRICE.find((p) => p.label === PRICING_RULES.STANDOUT_AD);
      premiumItemPerPrice = PRICING_RULES.PRODUCT_PRICE.find((p) => p.label === PRICING_RULES.PREMIUM_AD);
      shoppingCartService.setUser(user);
    });
    test('EXAMPLE SCENARIO Customer: Ford', () => {
      const shoppingCartA = createCart(5, PRICING_RULES.CLASSIC_AD, classicPrice.price);
      const shoppingCartB = createCart(1, PRICING_RULES.STANDOUT_AD, standOutPrice.price);
      const shoppingCartC = createCart(3, PRICING_RULES.PREMIUM_AD, premiumItemPerPrice.price);
      shoppingCartService.processCart([...shoppingCartA, ...shoppingCartB, ...shoppingCartC], user).then(cartDetails => {
        expect(cartDetails.cartItems.length).toBe(9);
        expect(cartDetails.total).toBe(2559.92);
      });
    });
  });

});

