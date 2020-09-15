import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../services/product/product.service";

declare var $;

@Component({
  selector: 'app-table-overview-single-buy',
  templateUrl: './table-overview-single-buy.component.html',
  styleUrls: ['./table-overview-single-buy.component.css']
})

export class TableOverviewSingleBuyComponent implements OnInit {

  products: Product[];
  selectedProduct: Product;
  productQuantity: number;
  quantityMessage: String;
  disableAddShoppingCartButton: boolean;
  shoppingCartQuantityInfoMap: Map<number, number>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.maintainShoppingCart();
    this.disableAddShoppingCartButton = false;
    this.quantityMessage = "";
    this.productQuantity = 1;
    this.products = [];
    this.productService.getProducts().subscribe(products => {
        this.products = products;
        this.prepareImages();
      }
    );
  }

  prepareImages() {
    // @ts-ignore
    [...this.products].forEach(product => product.currentImage = 'data:image/jpeg;base64,' + product.currentImage);
  }

  sortByName() {
    this.products = this.products.sort((a, b) => this.compareNames(a, b));
  }

  sortByCurrentPrice() {
    this.products = this.products.sort((a, b) => this.comparePrices(a, b))
  }

  sortByCategoryAndName() {
    this.products = this.products.sort((a, b) => this.compareNames(a, b));
    this.products = this.products.sort((a, b) => this.compareCategories(a, b));
  }

  comparePrices(a: Product, b: Product) {
    let aPrice = a.currentPrice;
    let bPrice = b.currentPrice;
    if (aPrice < bPrice) {
      return -1;
    } else if (aPrice > bPrice) {
      return 1;
    }
    return 0;
  }

  compareNames(a: Product, b: Product) {
    let aName = a.currentName.toLowerCase();
    let bName = b.currentName.toLowerCase();
    if (aName < bName) {
      return -1;
    } else if (aName > bName) {
      return 1;
    }
    return 0;
  }

  compareCategories(a: Product, b: Product) {
    let aCategory = a.category;
    let bCategory = b.category;
    if (aCategory < bCategory) {
      return -1;
    } else if (aCategory > bCategory) {
      return 1;
    }
    return 0;
  }

  updateSelectedProduct(product: Product) {
    this.selectedProduct = product;
    this.openConfirmation();
  }

  openConfirmation() {
    $('#exampleModalCenter').modal();
  }

  addToShoppingCart(product: Product) {
    if (this.quantityMessage === "") {
      const orderComponents = JSON.parse(localStorage.getItem('shoppingCart'));
      for (let i = 0; i < this.productQuantity; i++) {
        orderComponents.push(product.id);
      }
      localStorage.setItem('shoppingCart', JSON.stringify(orderComponents));
      console.log(localStorage.getItem('shoppingCart'));
      this.resetVariables();
      this.maintainShoppingCart();
      setTimeout(() => $('#exampleModalCenter').modal('hide'));
    }
  }

  resetVariables() {
    this.productQuantity = 1;
    this.quantityMessage = "";
  }

  messageDecision() {
    const productQuantityInputValue = $("#productQuantityInput").val();
    let maximumQuantity;
    if (this.shoppingCartQuantityInfoMap.has(this.selectedProduct.id)) {
      maximumQuantity = this.selectedProduct.storageQuantity - this.shoppingCartQuantityInfoMap.get(this.selectedProduct.id);
    } else {
      maximumQuantity = this.selectedProduct.storageQuantity;
    }
    if (productQuantityInputValue < 1) {
      this.quantityMessage = "a higher quantity number is required";
      this.disableAddShoppingCartButton = true;
      return;
    } else if (productQuantityInputValue > maximumQuantity) {
      this.quantityMessage = "a lower quantity number is required";
      this.disableAddShoppingCartButton = true;
      return;
    }
    this.quantityMessage = "";
    this.disableAddShoppingCartButton = false;
  }

  createShoppingCartQuantityInfoMap(shoppingCart: []) {
    let flattenedShoppingCart = [];
    for (let i = 0; i < shoppingCart.length; i++) {
      if (typeof shoppingCart[i] === "number") {
        flattenedShoppingCart.push(shoppingCart[i]);
      } else if (typeof shoppingCart[i] === "object") {
        for (let j = 0; j < shoppingCart[i][j]; j++) {
          flattenedShoppingCart.push(shoppingCart[i][j]);
        }
      }
    }
    this.shoppingCartQuantityInfoMap = new Map();
    for (let i = 0; i < flattenedShoppingCart.length; i++) {
      const mapContainsId = [...this.shoppingCartQuantityInfoMap.keys()].includes(flattenedShoppingCart[i])
      if (mapContainsId) {
        this.shoppingCartQuantityInfoMap.set(flattenedShoppingCart[i], this.shoppingCartQuantityInfoMap.get(flattenedShoppingCart[i]) + 1);
      } else {
        this.shoppingCartQuantityInfoMap.set(flattenedShoppingCart[i], 1);
      }
    }
  }

  maintainShoppingCart() {
    if (JSON.parse(localStorage.getItem('shoppingCart')) === null) {
      localStorage.setItem('shoppingCart', JSON.stringify([]));
    } else {
      let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      this.createShoppingCartQuantityInfoMap(shoppingCart);
    }
  }
}
