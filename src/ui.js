const buyBtns = document.querySelectorAll(".buy-product");
const shopBasket = document.querySelector(".shop-basket-list");
const buyAllBtn = document.querySelector(".buy-all");
const basketNumber = document.querySelector(".basket-content-number");
const basketButton = document.querySelector(".basket-button");
const myBasket = document.querySelector(".basket");

const basket = new Basket();

disableBuyBtnHandler = (value) => {
  buyAllBtn.disabled = value === 0;
};
createBasketUi = () => {
  shopBasket.innerText = "";
  for (const { text, id } of basket.getBasketSummary()) {
    const newLi = document.createElement("li");
    newLi.innerText = text;
    newLi.dataset.id = id;
    newLi.addEventListener("click", removeProduct);
    shopBasket.appendChild(newLi);
    if (basket.items.length > 0) {
      newLi.classList.add("visible");
      basketNumber.classList.add("basket-active");
      basketNumber.innerText = basket.items.length;
    }
  }
  const basketTotalValue = basket.getTotalValue();
  buyAllBtn.innerText = `Buy for ${basketTotalValue.toFixed(2)}zł`;
  disableBuyBtnHandler(basketTotalValue);
};

const addProductToBasket = (newProduct) => {
  basket.add(newProduct);
  console.log("ok");
  createBasketUi();
  showLi();
};
showBasket = () => {
  myBasket.classList.toggle("basket-active");
  showLi();
};
showLi = () => {
  const newLiList = document.querySelectorAll(".basket li");
  if (myBasket.classList.contains("basket-active")) {
    setTimeout(
      () =>
        newLiList.forEach((li) => {
          li.classList.add("visible");
          buyAllBtn.classList.add("visible");
        }),
      500
    );
  } else if (basket.items.length === 0) {
    setTimeout(
      () =>
        newLiList.forEach((li) => {
          buyAllBtn.classList.add("visible");
        }),
      500
    );
  } else {
    newLiList.forEach((li) => li.classList.remove("visible"));
    buyAllBtn.classList.remove("visible");
  }
};

const buyProduct = ({ target }) => {
  const name = target.dataset.name;
  const price = Number(target.dataset.price);
  const newProduct = new Product(name, price);
  addProductToBasket(newProduct);
};
const buyAllProducts = () => {
  alert(`You've bought products for ${basket.getTotalValue()}zł`);
  basketNumber.classList.remove("basket-active");
  basket.clear();
  createBasketUi();
};

const removeProduct = (e) => {
  const id = Number(e.target.dataset.id);
  basket.remove(id);
  if (basket.items.length === 0) {
    buyAllBtn.classList.add("visible");
    basketNumber.classList.remove("basket-active");
  }
  createBasketUi();
  showLi();
};

buyBtns.forEach((btn) => btn.addEventListener("click", buyProduct));
buyAllBtn.addEventListener("click", buyAllProducts);
basketButton.addEventListener("click", showBasket);

createBasketUi();
showLi();
