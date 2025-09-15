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
]

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