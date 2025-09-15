const restArray = [
  {
    id: 1,
    title: 'Мясная бомба',
    price: 689,
    weight: '520г',
    image: 'brg1.png',
  },
  {
    id: 2,
    title: 'Супер сырный',
    price: 550,
    weight: '520г',
    image: 'brg2.png',
  },
  {
    id: 3,
    title: 'Сытный',
    price: 639,
    weight: '580г',
    image: 'brg3.png',
  },
  {
    id: 4,
    title: 'Тяжелый удар',
    price: 480,
    weight: '470г',
    image: 'brg4.png',
  },
  {
    id: 5,
    title: 'Вечная класика',
    price: 450,
    weight: '450г',
    image: 'brg5.png',
  },
  {
    id: 6,
    title: 'Итальянский',
    price: 580,
    weight: '510г',
    image: 'brg6.png',
  },
];

const cartItems = [];

const productsHandler = () => {
  const container = document.querySelector('.menu_container');

  const loadingGoods = () => {
    if (container) {
      container.innerHTML = `<h3 style="width: 100%; text-align: center;">Загрузка...</h3>`;
    }
  };

  const renderGoods = (array) => {
    if (!container) {
      console.error('Menu container not found');
      return;
    }

    container.innerHTML = '';
    if (array.length === 0) {
      container.innerHTML = '<p style="width: 100%; text-align: center;">Товары не найдены</p>';
      return;
    }

    array.forEach((card) => {
      container.insertAdjacentHTML('beforeend', `
        <div class="card products-card" data-id="${card.id}">
          <div class="img_card f_img">
            <img src="./img/${card.image}" alt="${card.title}">
          </div>
          <p id="price">${card.price} ₽</p>
          <p class="name_pr">${card.title}</p>
          <p class="massa">${card.weight}</p>
          <button class="but_sub add btn-primary">Добавить</button>
        </div>
      `);
    });
  };

  if (container) {
    loadingGoods();
    setTimeout(() => {
      renderGoods(restArray);
      addToCart();
    }, 1000);
  } else {
    console.error('Menu container not found during initialization');
  }
};

const addToCart = () => {
  const container = document.querySelector('.menu_container');
  const cartList = document.querySelector('.cart_items');
  const cartCountElement = document.getElementById('length');

  if (!container) {
    console.error('Menu container not found');
    return;
  }
  if (!cartList) {
    console.error('Cart items list not found');
    return;
  }
  if (!cartCountElement) {
    console.error('Cart count element not found');
    return;
  }

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.but_sub');
    if (btn) {
      const card = btn.closest('.products-card');
      const productId = parseInt(card.dataset.id);
      const selectedProduct = restArray.find(item => item.id === productId);

      if (!selectedProduct) {
        console.error(`Product with ID ${productId} not found`);
        return;
      }

      const existingProduct = cartItems.find(item => item.id === selectedProduct.id);
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        cartItems.push({
          ...selectedProduct,
          count: 1,
        });
      }

      console.log('Cart items:', cartItems); // Debug log
      renderProductsInCart();
      updateCartCount();
    }
  });

  const renderProductsInCart = () => {
    cartList.innerHTML = '';
    if (cartItems.length === 0) {
      cartList.innerHTML = '<li style="text-align: center;">Корзина пуста</li>';
      return;
    }

    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('product');
      li.innerHTML = `
        <img src="./img/${item.image}" alt="${item.title}">
        <div class="cart-description">
          <div class="cart_title">${item.title}</div>
          <div class="cart_massa">${item.weight}</div>
          <div class="cart_price">${item.price}₽</div>
        </div>
        <div class="length">
          <button class="minus" onclick="updateCartItemCount(${item.id}, -1)">-</button>
          <div class="number">${item.count}</div>
          <button class="plus" onclick="updateCartItemCount(${item.id}, 1)">+</button>
        </div>
      `;
      cartList.appendChild(li);
    });
    calculateTotalCartValue();
  };

  const updateCartCount = () => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);
    cartCountElement.textContent = totalItems;
  };

  window.updateCartItemCount = (id, delta) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      item.count += delta;
      if (item.count <= 0) {
        const index = cartItems.findIndex(item => item.id === id);
        cartItems.splice(index, 1);
      }
      console.log('Updated cart items:', cartItems); // Debug log
      renderProductsInCart();
      updateCartCount();
    }
  };

  const calculateTotalCartValue = () => {
    const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
    const totalCartValue = document.querySelector('.result');
    if (totalCartValue) {
      totalCartValue.textContent = `${totalValue} ₽`;
    } else {
      console.error('Total cart value element not found');
    }
  };

  const orderButton = document.querySelector('.but_sub');
  if (orderButton) {
    orderButton.addEventListener('click', () => {
      if (cartItems.length === 0) {
        alert('Корзина пуста!');
        return;
      }
      const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
      alert(`Заказ успешно оформлен, сумма к оплате ${totalValue} ₽!`);
      cartItems.length = 0; // Clear the cart
      renderProductsInCart(); // Re-render cart to show "Корзина пуста"
      updateCartCount(); // Reset cart count to 0
      calculateTotalCartValue(); // Update total value to 0
    });
  } else {
    console.error('Order button (.btn_sub) not found');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  productsHandler();
});

// Массив товаров
const products = [
    { id: 1, name: "Товар 1", price: 100, image: "images/product1.jpg" },
    { id: 2, name: "Товар 2", price: 200, image: "images/product2.jpg" },
    // ... добавить больше товаров
  ];
  
  // Массив для корзины (хранит информацию о товарах в корзине)
  let cart = [];
  
  // Получаем элементы DOM
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalContainer = document.querySelector('.total');
  const checkoutButton = document.querySelector('.checkout');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  // Функция для добавления товара в корзину
  function addToCart(productId) {
    // Находим товар по ID
    const product = products.find(item => item.id === productId);
  
    // Проверяем, есть ли уже этот товар в корзине
    const existingProduct = cart.find(item => item.id === productId);
  
    if (existingProduct) {
      // Если товар уже есть, увеличиваем его количество
      existingProduct.quantity++;
    } else {
      // Иначе добавляем новый товар
      cart.push({ ...product, quantity: 1 });
    }
  
    // Обновляем информацию о корзине
    updateCart();
  }
  
  // Функция для обновления информации о корзине
  function updateCart() {
    // Очищаем содержимое корзины
    cartItemsContainer.innerHTML = '';
  
    // Общая сумма
    let total = 0;
  
    // Отображаем товары в корзине
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
  
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.name;
  
      const name = document.createElement('p');
      name.textContent = item.name;
  
      const price = document.createElement('span');
      price.textContent = item.price * item.quantity + ' руб.';
  
      const quantity = document.createElement('span');
      quantity.textContent = 'x' + item.quantity;
  
      cartItem.appendChild(image);
      cartItem.appendChild(name);
      cartItem.appendChild(price);
      cartItem.appendChild(quantity);
  
      cartItemsContainer.appendChild(cartItem);
  
      // Добавляем сумму товара к общей сумме
      total += item.price * item.quantity;
    });
  
    // Отображаем общую сумму
    totalContainer.textContent = 'Итого: ' + total + ' руб.';
  }
  
  // Функция для оформления заказа (временная)
  function checkout() {
    alert('Заказ оформлен!');
    // Здесь нужно добавить логику оформления заказа
    // например, отправку данных на сервер
    cart = []; // Очищаем корзину после оформления заказа
    updateCart();
  }
  
  // Добавляем обработчики событий для кнопок "Добавить в корзину"
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.parentNode.dataset.productId);
      addToCart(productId);
    });
  });
  
  // Добавляем обработчик события для кнопки "Оформить заказ"
  checkoutButton.addEventListener('click', checkout);
  
  // Обновляем информацию о корзине при загрузке страницы
  updateCart();
