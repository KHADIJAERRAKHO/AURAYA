document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category");
  const productList = document.getElementById("product-list");
  const productDetail = document.getElementById("product-detail");
  const backButton = document.getElementById("back-button");
  const cartIcon = document.getElementById("cart-icon");
  const cartPanel = document.getElementById("cart-panel");
  const cartItems = document.getElementById("cart-items");
  const searchBar = document.getElementById("search-bar");
  const cartCount = document.getElementById("cart-count");
  const filters = document.querySelector(".filters");
  const categoryFilter = document.getElementById("category-filter");
  const priceFilter = document.getElementById("price-filter");

  let cart = {};
  let currentCategory = "";

  const productsData = {
    femme: [
      { name: "Chaussure Noire", price: 120, img: "zara.jpg", description: "Chaussures élégantes en cuir noir pour un look chic et moderne. Parfaites pour toutes les occasions." },
      { name: "Chaussure Marron", price: 110, img: "chaussuremarron.jpg", description: "Chaussures marron classiques en daim. Confort et style garantis." },
      { name: "Chemise Blanche", price: 90, img: "chemiseblanc.jpg", description: "Chemise blanche à manches longues, tissu doux et respirant, idéale pour le travail ou les sorties." },
      { name: "Chemise Noire", price: 95, img: "chemisenoir.jpg", description: "Chemise noire élégante pour une allure sophistiquée." },
      { name: "Pantalon Jeans", price: 80, img: "pantalonjeans.jpg", description: "Pantalon jeans coupe droite, confortable et tendance." },
      { name: "Pantalon Cargo", price: 85, img: "pantaloncargo.jpg", description: "Pantalon cargo avec poches multiples, idéal pour un look décontracté." }
    ],
    homme: [
      { name: "chemise vert", price: 100, img: "chemisevert.jpg", description: "Chemise verte tendance pour homme, coupe slim et tissu agréable." },
      { name: "chemise", price: 90, img: "chemise.jpg", description: "Chemise classique pour homme, parfaite pour toutes les occasions." },
      { name: "pantalon cargo", price: 150, img: "pantaloncargoo.jpg", description: "Pantalon cargo résistant, idéal pour un style urbain." },
      { name: "pantalon jeans", price: 60, img: "pantalonjeanss.jpg", description: "Jean basique bleu foncé, essentiel de la garde-robe masculine." },
      { name: "chaussure new balance", price: 95, img: "newbalance.jpg", description: "Chaussures New Balance pour un confort optimal au quotidien." },
      { name: "Mocassins", price: 120, img: "chaussurenoirr.jpg", description: "Mocassins élégants en cuir noir, idéals pour les occasions formelles." }
    ],
    enfant: [
      { name: "chelise blanc", price: 50, img: "chemisse blancc.jpg", description: "Chemise blanche pour enfant, confortable et légère pour un usage quotidien." },
      { name: "chemise bej", price: 45, img: "chemisebej.jpg", description: "Chemise beige douce et agréable à porter pour les enfants." },
      { name: "pantalon bej", price: 55, img: "jeansbej.jpg", description: "Pantalon beige pour enfant, coupe droite et tissu résistant." },
      { name: "pantalon vert", price: 65, img: "jeansvert.jpg", description: "Pantalon vert pour enfant, stylé et confortable." },
      { name: "chaussure", price: 70, img: "spadri.jpg", description: "Chaussures pour enfant, souples et durables pour le jeu quotidien." },
      { name: "chaussure", price: 30, img: "spadri1.jpg", description: "Petites chaussures pratiques pour enfants, faciles à enfiler." }
    ]
  };
  if (!localStorage.getItem("allProducts")) {
    localStorage.setItem("allProducts", JSON.stringify(products));
  }
  
  // ✅ Ajout des produits créés dans l’espace admin
  const customProducts = JSON.parse(localStorage.getItem("customProducts") || "[]");
  customProducts.forEach(prod => {
    const category = prod.category.toLowerCase();
    if (!productsData[category]) {
      productsData[category] = [];
    }
    productsData[category].push({
      name: prod.name,
      price: parseFloat(prod.price),
      img: prod.img,
      description: "Produit ajouté par l'administrateur."
    });
  });

  categories.forEach((category) => {
    category.addEventListener("click", () => {
      currentCategory = category.dataset.name.toLowerCase();
      document.getElementById("categories").style.display = "none";
      filters.classList.remove("hidden");
      backButton.classList.remove("hidden");
      productList.innerHTML = "";
      productList.classList.remove("hidden");

      displayProducts(currentCategory);
    });
  });

  function displayProducts(category) {
    productList.innerHTML = "";

    productsData[category].forEach((item, index) => {
      const itemName = item.name.toLowerCase();
      const key = `${item.name}-${category}`;

      // ✅ Filtrage par catégorie
      const selectedType = categoryFilter.value;
      if (selectedType !== "all" && !itemName.includes(selectedType)) return;

      // ✅ Filtrage par prix
      const selectedPrice = priceFilter.value;
      if (selectedPrice === "low" && item.price >= 50) return;
      if (selectedPrice === "medium" && (item.price < 50 || item.price > 100)) return;
      if (selectedPrice === "high" && item.price <= 100) return;

      const product = document.createElement("div");
      product.classList.add("product");
      product.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>Prix: ${item.price} DH</p>
        <button onclick="showDetails('${category}', ${index})">Détails</button>
        <button onclick="addToCart('${item.name}', ${index}, ${item.price}, '${item.img}')">Ajouter</button>
      `;
      productList.appendChild(product);
    });
  }

  backButton.addEventListener("click", () => {
    document.getElementById("categories").style.display = "flex";
    productList.classList.add("hidden");
    productDetail.classList.add("hidden");
    backButton.classList.add("hidden");
    filters.classList.add("hidden");
  });

  window.showDetails = function (category, index) {
    const product = productsData[category][index];
    productDetail.innerHTML = `
      <span class="close-btn" onclick="closeDetails()">&times;</span>
      <div class="product-gallery">
        <img src="${product.img}" alt="${product.name}">
        <img src="${product.img}" alt="${product.name}">
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>Prix :</strong> ${product.price} DH</p>
      <button onclick="addToCart('${product.name}', ${index}, ${product.price}, '${product.img}')">Ajouter au panier</button>
    `;
    productDetail.classList.remove("hidden");
  };

  window.closeDetails = function () {
    productDetail.classList.add("hidden");
  };

  window.addToCart = function (name, id, price, img) {
    const key = `${name}-${id}`;
    if (cart[key]) {
      cart[key].quantity += 1;
    } else {
      cart[key] = {
        name,
        id,
        price,
        img,
        quantity: 1,
      };
    }
    updateCartUI();
  };

  function updateCartUI() {
    cartItems.innerHTML = "";
    let count = 0;
    Object.entries(cart).forEach(([key, item]) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="item-info">
          <img src="${item.img}" alt="">
          <span>${item.name} x${item.quantity}</span>
        </div>
        <button onclick="removeFromCart('${key}')">&times;</button>
      `;
      cartItems.appendChild(li);
      count += item.quantity;
    });
    cartCount.textContent = count;
  }

  window.removeFromCart = function (key) {
    if (cart[key]) {
      cart[key].quantity -= 1;
      if (cart[key].quantity <= 0) {
        delete cart[key];
      }
    }
    updateCartUI();
  };

  cartIcon.addEventListener("click", () => {
    cartPanel.classList.toggle("hidden");
  });

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const products = document.querySelectorAll(".product");
    products.forEach((product) => {
      const title = product.querySelector("h4").textContent.toLowerCase();
      product.style.display = title.includes(query) ? "block" : "none";
    });
  });

  categoryFilter.addEventListener("change", () => {
    if (currentCategory) displayProducts(currentCategory);
  });

  priceFilter.addEventListener("change", () => {
    if (currentCategory) displayProducts(currentCategory);
  });
});
