export const NORMAL   = 'normal';
export const UNILEVER = 'unilever';
export const APPLE    = 'apple';
export const NIKE     = 'nike';
export const FORD     = 'ford';

export const CLASSIC_AD   = 'Classic Ad';
export const STANDOUT_AD  = 'Standout Ad';
export const PREMIUM_AD   = 'Premium Ad';

export const PRODUCTS = [CLASSIC_AD, STANDOUT_AD, PREMIUM_AD];

export const PRODUCT_PRICE = [
  { label: CLASSIC_AD,  price: 269.99 },
  { label: STANDOUT_AD, price: 322.99 },
  { label: PREMIUM_AD,  price: 394.99 },
];

export const FORDEAL   = 'FORDEAL';
export const GREATERAS = 'GREATERAS';
export const DROPPRICE = 'DROPPRICE';

export const USER_RULES = [
  {userRole: NORMAL,    dealTypes: []},
  {userRole: UNILEVER,  dealTypes: [{dealType: FORDEAL,   GREATER_QTY : 3,  SMALLER_QTY: 2, PRODUCT: CLASSIC_AD}]},
  {userRole: APPLE,     dealTypes: [{dealType: DROPPRICE, PRICE: 299.99,    PRODUCT: STANDOUT_AD}]},
  {userRole: NIKE,      dealTypes: [{dealType: GREATERAS, GREATER_QTY : 4,  PRICE: 379.99,  PRODUCT: PREMIUM_AD}]},
  {userRole: FORD,      dealTypes: [{dealType: FORDEAL,   GREATER_QTY : 5,  SMALLER_QTY: 4, PRODUCT: CLASSIC_AD},
                                    {dealType: DROPPRICE, PRICE: 309.99,    PRODUCT: STANDOUT_AD},
                                    {dealType: GREATERAS, GREATER_QTY : 3,  PRICE: 389.99, PRODUCT: PREMIUM_AD}]}
];

export const TEST_USERS = [
  {userName : 'Bloke - Default',userRole : NORMAL},
  {userName : 'Jane - UNILEVER',userRole : UNILEVER},
  {userName : 'Joe - APPLE',    userRole : APPLE},
  {userName : 'Donald - NIKE',  userRole : NIKE},
  {userName : 'Tarzan - FORD',  userRole : FORD},
];
