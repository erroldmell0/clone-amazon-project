export let cart = [{
  productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity : 1
} , {
  productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity : 2,
}];

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
  }

export function removeFromCart(productId) {
    const newcart = [];

    cart.forEach((cartItem) =>{
      if(cartItem.productId!=productId) {
        newcart.push(cartItem);
      }
    });

    cart = newcart;
  }