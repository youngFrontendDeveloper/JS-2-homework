'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



//Конструктор для создания списка товаров на странице

class GoodsList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._makeGETRequest()
      .then(data => {
        this.goods = [...data];
        this.render();
      });
  }

  _makeGETRequest() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new GoodsItem(product);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }
}



//Конструктор для создания товара на странице
class GoodsItem {
  constructor(product, img = 'img/noimage.jpg', title = 'Product Name', price = 'Is unknown') {
    this.id = product.id_product;
    this.img = product.img || img;
    this.title = product.product_name || title;
    this.price = product.price || price;
  }
  render() {
    return `<div class='products__item' data-id="${this.id}">
            <img src=${this.img} class='products__item-img' alt='Изображение товара'>
            <h3 class='products__item-title'>${this.title}</h3>
            <p class='products__item-text'>${this.price} rub.</p>
            <button class='products__item-btn'>Add</button>
          </div>`;
  }
}

let list = new GoodsList();


//Конструктор для создания корзины 

class CartList {

  constructor(container = '.cart-popup__content') {
    this.container = container;
    this.goods = [];

    this.allProducts = [];
    this._makeGETRequest()
      .then(data => {
        this.goods = [...data.contents];
        this.amount = data.amount;
        this.countGoods = data.countGoods;
        this.render();
      });
  }

  _makeGETRequest() {
    return fetch(`${API}/getBasket.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const block = document.querySelector(this.container);
    const countGoods = document.querySelector('#countGoods');
    const amount = document.querySelector('#amount');
    for (let product of this.goods) {
      const cartObj = new CartItem(product);
      this.allProducts.push(cartObj);
      block.insertAdjacentHTML('beforeend', cartObj.render());
    }
    countGoods.insertAdjacentHTML('beforeend', this.countGoods)
    amount.insertAdjacentHTML('beforeend', `${this.amount} руб.`);
  }

  recalculateAmountOfProducts() {} //  Пересчитать общую сумму всех товаров

  placeOrder() {} // Оформить заказ

  delite() {} //Удалить товар из корзины

}


//Конструктор для создания элемента корзины 

class CartItem {
  constructor(product, img = 'img/noimage.jpg', title = 'Product Name', price = 'Is unknown', quantity = 1) {
    this.id = product.id_product;
    this.img = product.img || img;
    this.title = product.product_name || title;
    this.price = product.price || price;
    this.quantity = product.quantity || quantity;
  }

  render() {
    return ` <ul class="cart-popup__list">
              <li class="cart-popup__list-item" data-id="${this.id}">
                <img src="${this.img}" alt="Изображение товара">
              </li>
              <li class="cart-popup__list-item">${this.title}</li>
              <li class="cart-popup__list-item">${this.price} руб.</li>
              <li class="cart-popup__list-item">${this.quantity}</li>
              <li class="cart-popup__list-item">${this.price * this.quantity} руб.</li>
              <li class="cart-popup__list-item cart-popup__list-item--delete" title="Удалить товар">
                <img class="cart-popup__delete" src="img/delete-from-cart.ico" alt="Удалить товар">
              </li>
            </ul>`;
  }

  increaseProductQuantity() {} // Увеличить количество товара

  reduceProductQuantity() {} // Уменьшить количество товара


  recalculateAmountOfProduct() {} // Пересчитать сумму товара, в зависимости от количества

}

let cartList = new CartList();






// Открытие модального окна корзины
const cart = document.querySelector('.cart-button');
const cartPopup = document.querySelector('.cart-popup');

cart.addEventListener('click', () => {
  cartPopup.classList.add('open');
});

// Закрытие модального окна корзины
const cartPopupClose = document.querySelector('.cart-popup__close');

cartPopupClose.addEventListener('click', () => {
  cartPopup.classList.remove('open');
});



// const goods = [{
//     img: 'img/good-1.jpg',
//     title: 'Shirt',
//     price: 150
//   },
//   {
//     img: 'img/good-2.jpg',
//     title: 'Socks',
//     price: 50
//   },
//   {
//     img: 'img/good-3.jpg',
//     title: 'Jacket',
//     price: 350
//   },
//   {
//     img: 'img/good-4.jpg',
//     title: 'Shoes',
//     price: 250
//   },
//   {},
// ];

// const renderGoodsItem = (img = 'img/noimage.jpg', title = 'Product Name', price = 'Is unknown') => {
//   return `<div class='goods-item'>
//             <img src=${img} class='goods-item__img' alt='Изображение товара'>
//             <h3 class='goods-item__title'>${title}</h3>
//             <p class='goods-item__text'>${price} rub.</p>
//             <button class='goods-item__btn'>Add</button>
//           </div>`;

// };

// const renderGoodsList = (list) => {
//   let goodsList = list.map(item => renderGoodsItem(item.img, item.title, item.price));
//   // document.querySelector('.goods-list').innerHTML = goodsList.join('');
//   document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.img, item.title, item.price)).join('');
// };

// const renderGoodsList = (list) => {
//   let goodsList = list.map(item => renderGoodsItem(item.img, item.title, item.price));
//   // document.querySelector('.goods-list').innerHTML = goodsList.join('');
//   document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.img, item.title, item.price)).join('');
// };

// renderGoodsList(goods);