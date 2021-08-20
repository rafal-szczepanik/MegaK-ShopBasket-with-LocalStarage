class Basket {
  constructor() {
    this.items = this.getFromLocalStorage() ?? [];
    // this.totalValue = 0
  }

  clear() {
    // this.items=[];
    // this.splice(0);
    this.items.length = 0;
    this.saveToLocalStorage();
  }

  add(item) {
    this.items.push(item);
    // this.addToTotalValue(item.price)
    this.saveToLocalStorage();
  }

  remove(no) {
    this.items.splice(no - 1, 1);
    this.saveToLocalStorage();
  }

// addToTotalValue(newPrice){
//     this.totalValue+=newPrice;
// }

  getTotalValue() {
    return this.items.reduce((a, b) => a + b.price, 0);
  }

  getBasketSummary() {
    return this.items
      .map((product, i) => {
        return {
          text: `${i + 1}. ${product.name} - ${Number(product.price.toFixed(2))}zł`,
          id: `${i + 1}`,
        };
      });
  }

  saveToLocalStorage() {
    localStorage.setItem('basket-store', JSON.stringify(this.items));
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('basket-store'));
  }
}

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

