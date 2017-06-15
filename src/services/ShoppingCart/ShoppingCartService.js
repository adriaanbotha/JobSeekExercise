const PRICE_RULES = require('../../data/priceRules');

export default class ShoppingCartService  {

  constructor () {
    const userProfile = null;
  }

  setUser(userProfile) {
    this.userProfile = userProfile;
    const userRole = PRICE_RULES.USER_RULES.find((role) => role.userRole === userProfile.userRole);
    this.userDeals = userRole.dealTypes;
  }

  processCart = (cartItemsAll) => {
    return new Promise((resolve) => {
      if (!this.userDeals) return;
      let cartItems = [...cartItemsAll];
      let discTotal = 0;

      this.userDeals.forEach((deal) => {
        switch (deal.dealType) {
          case PRICE_RULES.FORDEAL:
            let items = cartItems.filter((item) => item.jobProduct === deal.PRODUCT);
            if (items.length > 0) {
              discTotal += (items.length / deal.GREATER_QTY) * items[0].jobPrice;
            }
            break;
          case PRICE_RULES.GREATERAS:
            let greaterAsItems = cartItems.filter((item) => item.jobProduct === deal.PRODUCT);
            if (greaterAsItems && greaterAsItems.length >= deal.GREATER_QTY) {
              cartItems.filter((item) => {
                if (item.jobProduct === deal.PRODUCT) {
                  item.jobPrice = deal.PRICE;
                }
              });
            }
            break;
          case PRICE_RULES.DROPPRICE:
            cartItems.filter((item) => {
              if (item.jobProduct === deal.PRODUCT) {
                item.jobPrice = deal.PRICE;
              }
            });
            break;
          default:
            break;
        }
      });

      let total = 0;
      cartItems.forEach(ci => {
        total += ci.jobPrice || 0;
      });
      resolve({cartItems, discTotal, total: total - discTotal});
    })
  };
}
