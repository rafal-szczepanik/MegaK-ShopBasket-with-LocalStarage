class Shop {
  constructor() {
    this.shopItems = this.getFromLocalStorage()??[];
  }

  addProductToShop(item) {
    this.shopItems.push(item);
    this.saveToLocalStorage()
  }

  getShopSummary() {
    return this.shopItems
      .map((product, i) => {
        return {
          id: `${i + 1}`,
          textName: `${product.name}`,
          textPrice: `${Number(product.price).toFixed(2)}`,
        };
      });
  }

  saveToLocalStorage() {
    localStorage.setItem('products-in-shop', JSON.stringify(this.shopItems));
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('products-in-shop'));
  }
}

class shopProduct {
  constructor(name, price) {
    this.name = name;
    this.price = Number(price);
  }
}
