import {cart,removeFromCart,calculateCartQuantity,updateQuantity,updateDeliveryOption} from '../../data/cart.js'; //named export 
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js'; // ./ : add it to make it a module
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //default export
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';

export function renderOrderSummary() {
  let checkOutPageHtml = '';
  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct =getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId)

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    checkOutPageHtml +=  `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHtml(matchingProduct,cartItem)}
            
          </div>
        </div>
      </div>
    `
  });

  document.querySelector('.order-summary').innerHTML = checkOutPageHtml;

  //genrate delivery option html
  function deliveryOptionHtml(matchingProduct, cartItem) {
    let html = ``;

    deliveryOptions.forEach((deliveryoptions) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryoptions.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryoptions.priceCents===0?'Free':`$${formatCurrency(deliveryoptions.priceCents)}`

    const isChecked = deliveryoptions.id ===cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option" 
                data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryoptions.id}">
            <input type="radio"
              ${isChecked?'checked':''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
              ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} - Shipping
              </div>
            </div>
        </div>`
    });

    return html
  }

  //adding eventlistener to the radio buttons
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', ()=> {
        const {productId,deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary(); 
      });
    });

  //delete event listner
  document.querySelectorAll(".js-delete-link")
    .forEach((link) => {
      link.addEventListener('click',() => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateCheckoutheading();
        renderPaymentSummary();
      });
    });

  //change the checkout heading
  updateCheckoutheading()
  function updateCheckoutheading() {
    let quantity = calculateCartQuantity();

    document.querySelector('.js-return-to-home-link')
      .innerHTML = quantity;
  }
    
  //update event listener
  document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click',() => {
      const productId = link.dataset.productId;
      console.log(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click',() => {
      const productId = link.dataset.productId;

      let quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      let newQuantity = Number(quantityInput.value);
      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      updateCheckoutheading();
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
    });
  });
}

