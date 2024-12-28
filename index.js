import { products } from "./data.js";

const currencyBtn = document.getElementById("nav--btn-currency");
const currencyList = document.querySelector(".nav--list-currency");
const spanCountry = document.getElementById("nav--btn-currency-country");
const spanSymbol = document.getElementById("nav--btn-currency-symbol");
const submenuBtn = document.querySelector(".submenu-btn");
const submenuList = document.querySelector(".nav--submenu-list");
const hamburgerIcon = document.getElementById("nav--hamburger-icon");
const sidebarMenu = document.querySelector(".nav--sidebar-menu");
const closeSidebarMenu = document.getElementById("nav--sidebar-close-icon");
const overlay = document.querySelector(".overlay");
const productsContainer = document.querySelector(".product--container");
const productsSecondContainer = document.querySelector(
    ".product--second-container"
);

// Toggle desktop submenu
submenuBtn.addEventListener("click", (event) => {
    // Close the currency submenu if it's open
    if (!currencyList.classList.contains("hide")) {
        currencyList.classList.add("hide");
    }

    // Toggle the current submenu
    submenuList.classList.toggle("hide");
    event.stopPropagation();
});

// Toggle currency menu dropdown
currencyBtn.addEventListener("click", (event) => {
    // Close the desktop submenu if it's open
    if (!submenuList.classList.contains("hide")) {
        submenuList.classList.add("hide");
    }

    // Toggle the currency submenu
    currencyList.classList.toggle("hide");
    event.stopPropagation();
});

// Close header submenus
const closeSubmenus = (event) => {
    if (!submenuList.contains(event.target) && event.target !== submenuBtn) {
        submenuList.classList.add("hide");
    }

    if (!currencyList.contains(event.target) && event.target !== currencyBtn) {
        currencyList.classList.add("hide");
    }
};

document.addEventListener("click", closeSubmenus);

// Update currency selection
currencyList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        const selectedCurrency = event.target.getAttribute("data-currency");
        const selectedSymbol = event.target.getAttribute("data-symbol");

        spanCountry.textContent = selectedCurrency;
        spanSymbol.textContent = selectedSymbol;

        currencyList.classList.add("hide");
    }
});

// Toggle sidebar menu/overlay
const toggleSidebar = () => {
    sidebarMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
};

hamburgerIcon.addEventListener("click", toggleSidebar);
closeSidebarMenu.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", toggleSidebar);

// Render product cards
const productsFirstDisplay = products.slice(0, 5); // First five products
const productsSecondDisplay = products.slice(5); // Remaining products

function renderProductCards(products, container, spanLastOdd = false) {
    products.forEach((product, index) => {
        // Create new div for each card
        const productCard = document.createElement("div");
        productCard.classList.add("product--card");

        // Set default image
        const productImage = document.createElement("img");
        productImage.classList.add("product--image");
        productImage.src = product.image;

        // Set hover image
        const productHoverImage = document.createElement("img");
        productHoverImage.classList.add("product--image-hover");
        productHoverImage.src = product.hoverImage;

        // HTML for card content
        productCard.innerHTML = `
            <div class="product--heading-container">
                <h2 class="product--heading">${product.name}</h2>
                <p class="product--price">${
                    product.isSoldOut ? "Sold Out" : product.price
                }</p>
            </div>
            ${
                product.description
                    ? `<p class="product--description">${product.description}</p>`
                    : ""
            }
            ${
                product.preOrder
                    ? `<p class="product--preorder">PRE-ORDER</p>`
                    : ""
            }
        `;

        // If it's the last item in an odd-length group, apply the "span-two" class
        if (
            spanLastOdd &&
            index === products.length - 1 &&
            products.length % 2 !== 0
        ) {
            productCard.classList.add("span-two");
        }

        // Insert the product image before other content
        productCard.insertBefore(productImage, productCard.firstChild);
        productCard.insertBefore(productHoverImage, productCard.firstChild);

        // Append card to container
        container.appendChild(productCard);
    });
}

// Render the first and second displays
renderProductCards(productsFirstDisplay, productsContainer, true);
renderProductCards(productsSecondDisplay, productsSecondContainer);
