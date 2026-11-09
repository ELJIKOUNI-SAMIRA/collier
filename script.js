
/* MOBILE MENU */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});


/* PRODUCT FILTER */

const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.filter;

    products.forEach(product => {
      if (category === "all" || product.dataset.category === category) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }
    });

  });
});


/* SHOPPING CART */

let cart = [];

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function openCart() {
  cartPanel.classList.add("show");
  cartOverlay.classList.add("show");
}

function hideCart() {
  cartPanel.classList.remove("show");
  cartOverlay.classList.remove("show");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
cartOverlay.addEventListener("click", hideCart);


/* ADD TO CART */

document.querySelectorAll(".add-cart").forEach(button => {

  button.addEventListener("click", () => {

    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: 1
      });
    }

    updateCart();
    openCart();

  });

});


/* UPDATE CART */

function updateCart() {

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart">Votre panier est vide.</p>';
  }

  cart.forEach((item, index) => {

    const element = document.createElement("div");
    element.className = "cart-item";

    const description = document.createElement("span");

    description.textContent =
      `${item.name} × ${item.quantity} — ${item.price * item.quantity} DH`;

    const removeButton = document.createElement("button");

    removeButton.textContent = "Supprimer";
    removeButton.type = "button";

    removeButton.addEventListener("click", () => {
      cart.splice(index, 1);
      updateCart();
    });

    element.append(description, removeButton);
    cartItems.appendChild(element);

  });

  const quantity = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = quantity;
  cartTotal.textContent = `${total} DH`;

}


/* WHATSAPP ORDER */

document.getElementById("checkoutBtn").addEventListener("click", () => {

  if (cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  const orderDetails = cart.map(item => {
    return `${item.name} x${item.quantity} = ${item.price * item.quantity} DH`;
  }).join("\n");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const message =
    `Bonjour SAMIRA-JK ! Je souhaite commander :\n\n${orderDetails}\n\nTotal : ${total} DH`;

  // Remplace par ton numéro WhatsApp
  const phoneNumber = "212600000000";

  const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");

});
