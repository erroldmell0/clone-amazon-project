export const cart = [];

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