
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