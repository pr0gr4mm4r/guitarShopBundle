import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../services/product/product.service";

declare var $;

@Component({
  selector: 'app-search-by-name-single-buy',
  templateUrl: './search-by-name-single-buy.component.html',
  styleUrls: ['./search-by-name-single-buy.component.css']
})
export class SearchByNameSingleBuyComponent implements OnInit {

  product: Product;
  productName: String;
  productQuantity: number;
  quantityMessage: String;
  disableAddShoppingCartButton: boolean;
  shoppingCartQuantityInfoMap: Map<number, number>;
  timer;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.maintainShoppingCart();
    this.disableAddShoppingCartButton = false;
    this.quantityMessage = "";
    this.productQuantity = 1;
    this.product = new Product();
    this.loadProductWithTimeout();
  }

  loadProductWithTimeout() {
    this.timer = setTimeout(() => this.loadProductWithTimeout(), 100);
    if (this.product.currentName !== $("#searchProduct").val()) {
      $("#addShoppingCartButton").prop("disabled", true);
    } else {
      $("#addShoppingCartButton").prop("disabled", false);
    }
    this.productService.getProductByName(this.productName).subscribe(product => {
        if (product && this.product !== product) {
          this.product = product;
          this.prepareImage();
        }
      }
    );
  }

  ngOnDestroy(){
    clearTimeout(this.timer);
  }


  prepareImage() {
    // @ts-ignore
    this.product.currentImage = 'data:image/jpeg;base64,' + this.product.currentImage;
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
    if (this.shoppingCartQuantityInfoMap.has(this.product.id)) {
      maximumQuantity = this.product.storageQuantity - this.shoppingCartQuantityInfoMap.get(this.product.id);
    } else {
      maximumQuantity = this.product.storageQuantity;
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
      console.log(localStorage.getItem('shoppingCart'));
    } else {
      let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      this.createShoppingCartQuantityInfoMap(shoppingCart);
    }
  }
}
