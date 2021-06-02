'use strict';

//Конструктор для создания товара на странице
class ProductItem {
  constructor(product, img = 'img/noimage.jpg', title = 'Product Name', price = 'Is unknown') {
    this.img = product.img || img;
    this.title = product.title || title;
    this.price = product.price || price;
  }
  render() {
    return `<div class='products__item'>
            <img src=${this.img} class='products__item-img' alt='Изображение товара'>
            <h3 class='products__item-title'>${this.title}</h3>
            <p class='products__item-text'>${this.price} rub.</p>
            <button class='products__item-btn'>Add</button>
          </div>`;
  }
}

//Конструктор для создания списка товаров на странице

class ProductsList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [{
        img: 'img/good-1.jpg',
        title: 'Shirt',
        price: 150
      },
      {
        img: 'img/good-2.jpg',
        title: 'Socks',
        price: 50
      },
      {
        img: 'img/good-3.jpg',
        title: 'Jacket',
        price: 350
      },
      {
        img: 'img/good-4.jpg',
        title: 'Shoes',
        price: 250
      },
    ];
  }
  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productItem = new ProductItem(product);
      block.insertAdjacentHTML('beforeend', productItem.render());
    }
  }
  calculateAmountOfProduct() { //Подсчет общей суммы всех продуктов на странице
    // Первый вариант
    // let amount = 0;
    // for (let product of this.goods) {
    //   amount += product.price;
    // }

    // Второй вариант
    let res = this.goods.reduce((sum, item) => sum += item.price, 0);
    console.log(res);
  }

}

let list = new ProductsList();
list.render();
list.calculateAmountOfProduct();


//Конструктор для создания элемента корзины 

class CartItem {
  constructor(product) {
    this.img = product.img;
    this.title = product.title;
    this.price = product.price;
  }

  increaseProductQuantity() {} // Увеличить количество товара

  reduceProductQuantity() {} // Уменьшить количество товара

  delite() {} //Удалить товар из корзины

  recalculateAmountOfProduct() {} // Пересчитать сумму товара, в зависимости от количества

}

//Конструктор для создания корзины 

class Cart {

  constructor() {

  }

  recalculateAmountOfProducts() {} //  Пересчитать общую сумму всех товаров

  placeOrder() {} // Оформить заказ

}


// Расчет стоимости и калорийности гамбургера

class Hamburger {
  constructor(size, filling, seasoning, mayonnaise) {
    this.size = size;
    this.filling = filling;
    this.seasoning = seasoning || false;
    this.mayonnaise = mayonnaise || false;
  }
  calc() {
    let cost = 0;
    let calories = 0;
    if (this.size == 'big') {
      cost += 100;
      calories += 40;
    } else {
      cost += 50;
      calories += 20;
    }
    if (this.filling == 'cheese') {
      cost += 10;
      calories += 20;
    } else if (this.filling == 'salad') {
      cost += 20;
      calories += 5;
    } else {
      cost += 15;
      calories += 10;
    }
    if (this.seasoning) {
      cost += 15;
    }
    if (this.mayonnaise) {
      cost += 20;
      calories += 5;
    }
    console.log(`Вы взяли гамбургер стоимостью ${cost} руб. и калорийностью ${calories} калорий`);
  }
}

let hamburger1 = new Hamburger('big', 'cheese', true, false);
hamburger1.calc();
let hamburger2 = new Hamburger('big', 'salad', true, true);
hamburger2.calc();
let hamburger3 = new Hamburger('small', 'salad', false, true);
hamburger3.calc();




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