debugger;
class Product {
  id = 0;
  name = "";
  price = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementsByClassName("container")[0].classList.remove("hidden");
  const products = [
    { id: 1, name: "Product 1", price: 56 },
    { id: 2, name: "product 2", price: 34 },
    { id: 3, name: "product 3", price: 78 },
    { id: 4, name: "product 4", price: 35 },
  ];

  /** @type {Product[]} */
  const cart = [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<span> ${product.name} - ${product.price.toFixed(
      2
    )} </span>
    <p>=</p>
    <button data-id = "${product.id}">Add to cart</button>`;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);

      //   console.log(product);

      addToCart(product);
    }
  });

  function addToCart(/** @type {Product} */ product) {
    cart.push(product);
    saveCartLocal();
    renderCart();
  }

  function removeFromCart(/** @type {Product} */ product) {
    const productId = product.id;

    const productIndex = cart.findIndex((item) => item.id === productId);
    if (productIndex === -1) return;

    cart.splice(productIndex, 1);
    saveCartLocal();
    renderCart();
  }

  function saveCartLocal() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    emptyCartMessage.innerText = "";

    let totalPrice = 0;

    console.log(cart);

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cartItems.innerHTML = "";

      cart.forEach((item, index, array) => {
        totalPrice += item.price;
        const cartItem = getNewCartItem(item);
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
      cartItems.classList.add("hidden");
    }
  }

  function getNewCartItem(item) {
    const cartItem = document.createElement("div");

    cartItem.innerHTML = `${item.name} - ${item.price.toFixed(2)}
            <button data-id="${item.id}">remove</button>`;

    const removeButton = cartItem.querySelector("button");
    removeButton.addEventListener("click", () => {
      removeFromCart(item);
    });
    console.log(removeButton);

    return cartItem;
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("checkout successfully");
    console.log("test1");
    renderCart();
    console.log("test2");
  });
});
