import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit { // least finished user component (current error message: 431 Request Header Field too large

  singleProducts: Product[];
  productCompositions: [];
  shoppingCartQuantityInfoMap: Map<number, number>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.maintainShoppingCart();
    this.prepareProducts()
    this.prepareImages();
    this.singleProducts = [];
    this.productCompositions = [];
  }

  prepareImages() {
    if(this.singleProducts) {
      // @ts-ignore
      [...this.singleProducts].forEach(product => product.currentImage = 'data:image/jpeg;base64,' + product.currentImage);
    }
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

  prepareProducts() {
    this.productService.getProducts().subscribe(product => {
        let shoppingCartIds = JSON.parse(localStorage.getItem("shoppingCart"));
        let singles = [];
        for(let i = 0; i < shoppingCartIds.length; i++){
          if(typeof shoppingCartIds === "number") {
            singles.push(shoppingCartIds[i]);
          }
        }
        for(let key of this.shoppingCartQuantityInfoMap.keys()){
          for(let i = 0; i < this.shoppingCartQuantityInfoMap.get(key); i++){
            this.singleProducts.push(product.find(product=>product.id === key));
          }
        }
      }
    );
  }
}
