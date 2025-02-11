export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// {
//   productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//   quantity : 1
// } , {
//   productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//   quantity : 2,
// }

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

//add to cart button
export function addToCart(productId) {
    let matchingItem;
    cart.forEach((cartItem) =>{
      if(productId===cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem) {
      let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      let add = Number(quantitySelector.value);
      matchingItem.quantity += add;
    } else {
      let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      let add = Number(quantitySelector.value);
      cart.push({
        productId : productId,
        quantity : add
      });
    }

    saveToStorage();
  }

export function removeFromCart(productId) {
    const newcart = [];

    cart.forEach((cartItem) =>{
      if(cartItem.productId!=productId) {
        newcart.push(cartItem);
      }
    });

    cart = newcart;
    saveToStorage();
  }

  export function calculateCartQuantity() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}