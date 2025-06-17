// --------------- INITIALISATION PRODUITS DU SITE ---------------- //
if (!localStorage.getItem("allProducts")) {
    const allProducts = [
      // Femme
      { name: "Chaussure Noire", price: 120, img: "zara.jpg", description: "Chaussures élégantes en cuir noir pour un look chic et moderne. Parfaites pour toutes les occasions.", category: "femme" },
      { name: "Chaussure Marron", price: 110, img: "chaussuremarron.jpg", description: "Chaussures marron classiques en daim. Confort et style garantis.", category: "femme" },
      { name: "Chemise Blanche", price: 90, img: "chemiseblanc.jpg", description: "Chemise blanche à manches longues, tissu doux et respirant, idéale pour le travail ou les sorties.", category: "femme" },
      { name: "Chemise Noire", price: 95, img: "chemisenoir.jpg", description: "Chemise noire élégante pour une allure sophistiquée.", category: "femme" },
      { name: "Pantalon Jeans", price: 80, img: "pantalonjeans.jpg", description: "Pantalon jeans coupe droite, confortable et tendance.", category: "femme" },
      { name: "Pantalon Cargo", price: 85, img: "pantaloncargo.jpg", description: "Pantalon cargo avec poches multiples, idéal pour un look décontracté.", category: "femme" },
  
      // Homme
      { name: "chemise vert", price: 100, img: "chemisevert.jpg", description: "Chemise verte tendance pour homme, coupe slim et tissu agréable.", category: "homme" },
      { name: "chemise", price: 90, img: "chemise.jpg", description: "Chemise classique pour homme, parfaite pour toutes les occasions.", category: "homme" },
      { name: "pantalon cargo", price: 150, img: "pantaloncargoo.jpg", description: "Pantalon cargo résistant, idéal pour un style urbain.", category: "homme" },
      { name: "pantalon jeans", price: 60, img: "pantalonjeanss.jpg", description: "Jean basique bleu foncé, essentiel de la garde-robe masculine.", category: "homme" },
      { name: "chaussure new balance", price: 95, img: "newbalance.jpg", description: "Chaussures New Balance pour un confort optimal au quotidien.", category: "homme" },
      { name: "Mocassins", price: 120, img: "chaussurenoirr.jpg", description: "Mocassins élégants en cuir noir, idéals pour les occasions formelles.", category: "homme" },
  
      // Enfant
      { name: "chelise blanc", price: 50, img: "chemisse blancc.jpg", description: "Chemise blanche pour enfant, confortable et légère pour un usage quotidien.", category: "enfant" },
      { name: "chemise bej", price: 45, img: "chemisebej.jpg", description: "Chemise beige douce et agréable à porter pour les enfants.", category: "enfant" },
      { name: "pantalon bej", price: 55, img: "jeansbej.jpg", description: "Pantalon beige pour enfant, coupe droite et tissu résistant.", category: "enfant" },
      { name: "pantalon vert", price: 65, img: "jeansvert.jpg", description: "Pantalon vert pour enfant, stylé et confortable.", category: "enfant" },
      { name: "chaussure", price: 70, img: "spadri.jpg", description: "Chaussures pour enfant, souples et durables pour le jeu quotidien.", category: "enfant" },
      { name: "chaussure", price: 30, img: "spadri1.jpg", description: "Petites chaussures pratiques pour enfants, faciles à enfiler.", category: "enfant" }
    ];
  
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }
  
  // --------------- PRODUITS PERSONNALISÉS ---------------- //
  function getCustomProducts() {
    return JSON.parse(localStorage.getItem("customProducts") || "[]");
  }
  
  function saveCustomProducts(products) {
    localStorage.setItem("customProducts", JSON.stringify(products));
  }
  
  function loadProductsAdmin() {
    const container = document.getElementById("product-container");
    container.innerHTML = "";
    const products = getCustomProducts();
  
    if (products.length === 0) {
      container.innerHTML = "<p>Aucun produit personnalisé ajouté.</p>";
      return;
    }
  
    products.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.name}</strong> - ${item.price} DH - <em>${item.category}</em><br>
        <img src="${item.img}" alt="${item.name}" style="height: 60px; margin-top: 5px;" /><br>
        <button class="edit" onclick="editProduct(${index})">✏ Modifier</button>
        <button class="delete" onclick="deleteProduct(${index})">🗑 Supprimer</button>
      `;
      container.appendChild(li);
    });
  }
  
  document.getElementById("add-product-form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("product-name").value.trim();
    const price = parseFloat(document.getElementById("product-price").value);
    const category = document.getElementById("product-category").value.trim();
    const imageFile = document.getElementById("product-image").files[0];
  
    if (!name || isNaN(price) || !category || !imageFile) {
      return alert("Veuillez remplir tous les champs correctement.");
    }
  
    const reader = new FileReader();
    reader.onload = function() {
      const imgData = reader.result;
      const products = getCustomProducts();
  
      products.push({
        name,
        price,
        category,
        img: imgData
      });
  
      saveCustomProducts(products);
      loadProductsAdmin();
      e.target.reset();
    };
    reader.readAsDataURL(imageFile);
  });
  
  function deleteProduct(index) {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    const products = getCustomProducts();
    products.splice(index, 1);
    saveCustomProducts(products);
    loadProductsAdmin();
  }
  
  function editProduct(index) {
    const products = getCustomProducts();
    const prod = products[index];
  
    const newName = prompt("Nom du produit :", prod.name);
    if (newName === null) return;
  
    const newPrice = prompt("Prix du produit :", prod.price);
    if (newPrice === null || isNaN(parseFloat(newPrice))) return alert("Prix invalide.");
  
    const newCategory = prompt("Catégorie du produit :", prod.category);
    if (newCategory === null) return;
  
    prod.name = newName.trim();
    prod.price = parseFloat(newPrice);
    prod.category = newCategory.trim();
  
    products[index] = prod;
    saveCustomProducts(products);
    loadProductsAdmin();
  }
  
  // --------------- PRODUITS DU SITE ---------------- //
  function getSiteProducts() {
    return JSON.parse(localStorage.getItem("allProducts") || "[]");
  }
  
  function saveSiteProducts(products) {
    localStorage.setItem("allProducts", JSON.stringify(products));
  }
  
  function loadSiteProductsAdmin() {
    const container = document.getElementById("site-product-container");
    container.innerHTML = "";
  
    const siteProducts = getSiteProducts();
  
    if (siteProducts.length === 0) {
      container.innerHTML = "<p>Aucun produit du site trouvé.</p>";
      return;
    }
  
    siteProducts.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.name}</strong> - ${item.price} DH<br>
        <em>${item.description || "Pas de description"}</em><br>
        <img src="${item.img}" alt="${item.name}" style="height: 60px; margin-top: 5px;" /><br>
        <button class="edit" onclick="editSiteProduct(${index})">✏ Modifier</button>
        <button class="delete" onclick="deleteSiteProduct(${index})">🗑 Supprimer</button>
      `;
      container.appendChild(li);
    });
  }
  
  function editSiteProduct(index) {
    const products = getSiteProducts();
    const prod = products[index];
  
    const newPrice = prompt("Nouveau prix :", prod.price);
    if (newPrice === null || isNaN(parseFloat(newPrice))) return alert("Prix invalide.");
  
    const newDesc = prompt("Nouvelle description :", prod.description || "");
    if (newDesc === null) return;
  
    prod.price = parseFloat(newPrice);
    prod.description = newDesc;
  
    products[index] = prod;
    saveSiteProducts(products);
    loadSiteProductsAdmin();
  }
  
  function deleteSiteProduct(index) {
    if (!confirm("Supprimer ce produit du site ?")) return;
  
    const products = getSiteProducts();
    products.splice(index, 1);
    saveSiteProducts(products);
    loadSiteProductsAdmin();
  }
  
  // --------------- INITIALISATION ---------------- //
  loadProductsAdmin();
  loadSiteProductsAdmin();
  
