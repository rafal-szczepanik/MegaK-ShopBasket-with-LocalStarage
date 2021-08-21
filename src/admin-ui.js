const adminPanel = document.querySelector(".admin-form");
const inputProduct = document.querySelector('[name="product-name"]');
const inputPrice = document.querySelector('[name="product-price"]');
const shopList = document.querySelector(".products-list");
const adminFormPassword = document.querySelector(".access-admin-panel-form");
const adminInputPassword = document.querySelector(".input-password");
const adminBtnPassword = document.querySelector(".admin-pass-btn");
const adminFormText = document.querySelector(".admin-form-h1");

const shop = new Shop();

disableHandler = ({ target }) => {
  adminBtnPassword.disabled = !target.value.length;
};

showAdminPanel = (e) => {
  e.preventDefault();
  if (adminInputPassword.value === "password") {
    adminPanel.classList.add("visible-admin");
    adminFormText.innerText = `Admin Panel: You have entered correct password. Now you can add a new product`;
  } else if (adminInputPassword.value === "close") {
    adminPanel.classList.remove("visible-admin");
  } else {
    alert("password incorrect");
  }
  adminInputPassword.value = "";
};

shopUi = () => {
  shopList.innerHTML = `<li><strong>Wild Rose</strong>99.99zł<button class="buy-product" data-name="Wild Rose" data-price="99.99">Buy</button></li>
<li><strong>Fresh Sea Salt</strong>120.05zł<button class="buy-product" data-name="Fresh Sea Salt " data-price="120.05">Buy</button></li>
<li><strong>Red Fruits Lipstick</strong>100.45zł<button class="buy-product" data-name="Red Fruits Lipstick" data-price="100.45">Buy</button></li>`;
  for (const { textName, textPrice } of shop.getShopSummary()) {
    const shopLi = document.createElement("li");
    const shopStrong = document.createElement("strong");
    const shopBtn = document.createElement("button");
    shopStrong.innerText = `${textName}`;
    const newPriceTxt = document.createTextNode(`${textPrice}zł `);
    shopLi.appendChild(shopStrong);
    shopLi.appendChild(newPriceTxt);
    shopBtn.classList.add("buy-product");
    shopBtn.dataset.name = textName;
    shopBtn.dataset.price = textPrice;
    shopBtn.innerText = "Buy";
    shopLi.appendChild(shopBtn);
    shopList.appendChild(shopLi);
    document
      .querySelectorAll(".buy-product")
      .forEach((btn) => btn.addEventListener("click", buyProduct));
  }
};

addNewProductToShop = (e) => {
  e.preventDefault();
  const name = inputProduct.value;
  const price = inputPrice.value;
  inputProduct.value = "";
  inputPrice.value = "";
  const myShopProduct = new shopProduct(name, price);
  shop.addProductToShop(myShopProduct);
  shopUi();
};
shopUi();

document
  .querySelectorAll(".buy-product")
  .forEach((btn) => btn.addEventListener("click", buyProduct));
adminPanel.addEventListener("submit", addNewProductToShop);
adminFormPassword.addEventListener("submit", showAdminPanel);
adminInputPassword.addEventListener("keyup", disableHandler);
