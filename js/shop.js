let allProducts = [];
let currentCategory = "all";
let currentLimit = 8;
let currentCols = 6;
let currentSort = "default";

/* Load products */
fetch("products.json")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    buildCategories();
    renderProducts();
  });

function buildCategories() {
  let categories = {};

  allProducts.forEach((p) => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });

  let tabs = document.getElementById("categoryTabs");
  let select = document.getElementById("categorySelect");

  tabs.innerHTML = `
    <div class="category-tab active" onclick="filterCategory('all', this)">
      <div class="tab-left">
        <i class="bi bi-folder2-open"></i>
      </div>
      <div class="tab-right">
        <h2>All Products</h2>
        <p class="count">${allProducts.length} Items</p>
      </div>
    </div>
  `;

  Object.keys(categories).forEach((cat) => {
    tabs.innerHTML += `
      <div class="category-tab" onclick="filterCategory('${cat}', this)">
        <div class="tab-left">
          <i class="bi bi-folder2-open"></i>
        </div>
        <div class="tab-right">
          <h2>${cat}</h2>
          <p class="count">${categories[cat]} Items</p>
        </div>
      </div>
    `;

    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

/* Render Products */
function renderProducts() {
  let filtered =
    currentCategory === "all"
      ? [...allProducts]
      : allProducts.filter((p) => p.category === currentCategory);

  /* SORT */
  switch (currentSort) {
    case "priceHigh":
      filtered.sort((a, b) => b.price - a.price);
      break;

    case "priceLow":
      filtered.sort((a, b) => a.price - b.price);
      break;

    case "latest":
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;

    case "oldest":
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;

    case "az":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "za":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  /* LIMIT */
  let shown = filtered.slice(0, currentLimit);

  document.getElementById("resultsText").innerText =
    `Showing ${shown.length} of ${filtered.length} results`;

  let row = document.getElementById("productsRow");
  row.innerHTML = "";

  shown.forEach((product) => {
    row.innerHTML += `
      <div class="col-lg-${12/currentCols} col-md-6">

        <a href="product.html?id=${product.id}" class="product-card-link">

          <div class="product-card">

            ${
              product.sale
                ? `<div class="sale-badge">Sale ${product.salePercent}%</div>`
                : ""
            }

            <img src="${product.image}" class="product-img">

            <p class="product-category">${product.category}</p>

            <h3 class="product-name">${product.name}</h3>

            <div class="price-row">
              <p class="product-price">
                $${product.price}
                ${
                  product.oldPrice
                    ? `<span class="old-price">$${product.oldPrice}</span>`
                    : ""
                }
              </p>

              <button class="add-cart">
                <i class="bi bi-cart"></i> Add to cart
              </button>
            </div>

          </div>
        </a>

      </div>
    `;
  });
}

/* Category Filter */
function filterCategory(cat, el) {
  currentCategory = cat;

  document
    .querySelectorAll(".category-tab")
    .forEach((tab) => tab.classList.remove("active"));

  el.classList.add("active");

  renderProducts();
}

document
  .getElementById("categorySelect")
  .addEventListener("change", function () {
    currentSort = this.value;
    renderProducts();
  });

/* Limit Products */
document.getElementById("limitSelect").addEventListener("change", function () {
  currentLimit = parseInt(this.value);
  renderProducts();
});

document.querySelectorAll(".grid-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // active style
    document
      .querySelectorAll(".grid-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    // عدد الأعمدة
    currentCols = parseInt(this.dataset.cols);

    renderProducts();
  });
});
