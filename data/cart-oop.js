function Cart(localStorageKey) {
  const cart = {
    cartItems : undefined,

    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
      if (!this.cartItems) {
        this.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },

    //add to cart button
    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }

      this.saveToStorage();
    }, 

    //remove from cart
    removeFromCart(productId) {
      const newcart = [];

      this.cartItems.forEach((cartItem) =>{
        if(cartItem.productId!=productId) {
          newcart.push(cartItem);
        }
      });

      this.cartItems = newcart;
      this.saveToStorage();
    },

    //caculate the quantity
    calculateCartQuantity() {
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    
      return cartQuantity;
    },

    //update the quantity
    updateQuantity(productId, newQuantity) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      matchingItem.quantity = newQuantity;
    
      this.saveToStorage();
    },

    //update delivery option
    updateDeliveryOption(productId, DeliveryOptionId) {
      let matchingItem;
        this.cartItems.forEach((cartItem) =>{
          if(productId===cartItem.productId) {
            matchingItem = cartItem;
          }
        });
    
        matchingItem.deliveryOptionId = DeliveryOptionId;
        this.saveToStorage();
    }

  };  

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);