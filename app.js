// Attach event listeners using event delegation
document.addEventListener("click", function (event) {
  if (event.target.matches(".increment")) {
    const card = event.target.closest(".card");
    const quantityElement = card.querySelector(".quantity");
    const subtotalElement = card.querySelector(".subtotal");
    const priceElement = card.querySelector(".card_price");
    incrementQuantity(quantityElement, subtotalElement, priceElement);
  } else if (event.target.matches(".decrement")) {
    const card = event.target.closest(".card");
    const quantityElement = card.querySelector(".quantity");
    const subtotalElement = card.querySelector(".subtotal");
    const priceElement = card.querySelector(".card_price");
    decrementQuantity(quantityElement, subtotalElement, priceElement);
  } else if (event.target.matches(".card_button")) {
    const card = event.target.closest(".card");
    const quantityElement = card.querySelector(".quantity");
    const subtotalElement = card.querySelector(".subtotal");
    const priceElement = card.querySelector(".card_price");
    addToCart(quantityElement, subtotalElement, priceElement);
  }
});

// Function to increment quantity
function incrementQuantity(quantityElement, subtotalElement, priceElement) {
  let quantity = parseInt(quantityElement.textContent);
  quantity++;
  updateQuantityDisplay(quantityElement, quantity);
  updateSubtotalDisplay(subtotalElement, priceElement);
}

// Function to decrement quantity
function decrementQuantity(quantityElement, subtotalElement, priceElement) {
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 0) {
    quantity--;
    updateQuantityDisplay(quantityElement, quantity);
    updateSubtotalDisplay(subtotalElement, priceElement);
  }
}

// Function to update quantity display
function updateQuantityDisplay(quantityElement, quantity) {
  quantityElement.textContent = quantity;
}

// Function to update subtotal display
function updateSubtotalDisplay(subtotalElement, priceElement) {
  const price = parseInt(priceElement.textContent.split(" ")[1]); // Extract price value
  const quantity = parseInt(
    subtotalElement.closest(".card").querySelector(".quantity").textContent
  );
  const subtotal = quantity * price;
  subtotalElement.textContent = subtotal;
}

// Function to handle "Add to Cart" button click
function addToCart(quantityElement, subtotalElement, priceElement) {
  console.log("Added to cart");
  const card = quantityElement.closest(".card");
  const name = card
    .querySelector(".card_name")
    .textContent.split(":")[1]
    .trim();
  const price = parseInt(priceElement.textContent.split(" ")[1]);
  const quantity = parseInt(quantityElement.textContent);
  const subtotal = parseInt(subtotalElement.textContent);
  const item = {
    name,
    price,
    quantity,
    subtotal,
  };
  console.log(item);
}

// Attach event listener to "Go to Payment" button
const paymentButton = document.querySelector(".payment_button");
paymentButton.addEventListener("click", goToPayment);

function goToPayment() {
  const cards = document.querySelectorAll(".card");
  const items = [];

  cards.forEach((card) => {
    const quantityElement = card.querySelector(".quantity");
    const quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
      const nameElement = card.querySelector(".card_name");
      const name = nameElement.textContent.split(":")[1].trim();
      const priceElement = card.querySelector(".card_price");
      const price = parseInt(priceElement.textContent.split(" ")[1]);
      const subtotalElement = card.querySelector(".subtotal");
      const subtotal = parseInt(subtotalElement.textContent);

      items.push({
        name,
        price,
        quantity,
        subtotal,
      });
    }
  });

  console.log(items);
  localStorage.setItem("cartsValue", JSON.stringify(items));
  window.location.href = "Cart.html";
}
