import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product/product.service';

declare var $: any;


@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent implements OnInit {

  products: Product[];
  body_products: Product[];
  guitar_neck_products: Product[];
  strings_products: Product[];
  selected_body_position: number;
  selected_guitar_neck_position: number;
  selected_strings_position: number;
  selected_body_page: number;
  selected_guitar_neck_page: number;
  selected_strings_page: number;
  sliced_body_products: Product[][];
  sliced_neck_products: Product[][];
  sliced_strings_products: Product[][];
  current_body_product_array: Product[];
  current_guitar_neck_product_array: Product[];
  current_strings_product_array: Product[];
  current_body_product_array_number: number;
  current_guitar_neck_product_array_number: number;
  current_strings_product_array_number: number;
  current_body_product: Product;
  current_neck_product: Product;
  current_strings_product: Product;
  disableAddShoppingCartButton: boolean;
  productCompositionQuantity: number;
  quantityMessage: String;
  shoppingCartQuantityInfoMap: Map<number, number>;
  maximumQuantity: number;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.maintainShoppingCart();
    this.quantityMessage = "";
    this.productCompositionQuantity = 1;
    this.disableAddShoppingCartButton = false;
    this.body_products = [];
    this.guitar_neck_products = [];
    this.strings_products = [];
    this.current_body_product_array = [];
    this.current_guitar_neck_product_array = [];
    this.current_strings_product_array = [];
    this.sliced_body_products = [];
    this.sliced_neck_products = [];
    this.sliced_strings_products = [];
    this.selected_body_position = -1;
    this.selected_guitar_neck_position = -1;
    this.selected_strings_position = -1;
    this.selected_body_page = 1;
    this.selected_guitar_neck_page = 1;
    this.selected_strings_page = 1;
    this.current_body_product_array_number = 0;
    this.current_guitar_neck_product_array_number = 0;
    this.current_strings_product_array_number = 0;
    this.productService.getProducts().subscribe(products => {
        this.products = products;
        this.prepareProducts();
        this.prepareImages();
      }
    );
  }

  prepareImages() {
    // @ts-ignore
    [...this.products].forEach(product => product.currentImage = 'data:image/jpeg;base64,' + product.currentImage);
  }

  prepareProducts() {
    for (let i = 0; i < this.products.length; i++) {
      const category = this.products[i].category;
      if (category === 'body') {
        this.body_products.push(this.products[i]);
      } else if (category === 'guitar_neck') {
        this.guitar_neck_products.push(this.products[i]);
      } else if (category === 'strings') {
        this.strings_products.push(this.products[i]);
      }
    }
    setTimeout(() => this.sliceBodyProducts(), 0);
    setTimeout(() => this.sliceGuitarNeckProducts(), 0);
    setTimeout(() => this.sliceStringProducts(), 0);
  }

  sliceBodyProducts() {
    let i, j, temparray, chunk = 4, missing = chunk - this.body_products.length % chunk;
    for (i = 0; i < this.body_products.length; i += chunk) {
      temparray = this.body_products.slice(i, i + chunk);
      if (missing === 0) {
        this.sliced_body_products.push(temparray);
        this.updateCurrentBodyProductArray();
        return;
      }
      if (missing > 0) {
        if (i >= this.body_products.length - this.body_products.length % chunk) {
          for (j = 0; j < missing; j++) {
            const product = new Product();
            temparray.push(product);
          }
        }
        this.sliced_body_products.push(temparray);
      }
      this.updateCurrentBodyProductArray();
    }
  }

  sliceGuitarNeckProducts() {
    let i, j, temparray, chunk = 4, missing = chunk - this.guitar_neck_products.length % chunk;
    for (i = 0; i < this.guitar_neck_products.length; i += chunk) {
      temparray = this.guitar_neck_products.slice(i, i + chunk);
      if (missing === 0) {
        this.sliced_neck_products.push(temparray);
        this.updateCurrentGuitarNeckProductArray();
        return;
      }
      if (missing > 0) {
        if (i >= this.guitar_neck_products.length - (this.guitar_neck_products.length % chunk)) {
          for (j = 0; j < missing; j++) {
            const product = new Product();
            temparray.push(product);
          }
        }
        this.sliced_neck_products.push(temparray);
      }
      this.updateCurrentGuitarNeckProductArray();
    }
  }

  sliceStringProducts() {
    let i, j, temparray, chunk = 4, missing = chunk - this.strings_products.length % chunk;
    for (i = 0; i < this.strings_products.length; i += chunk) {
      temparray = this.strings_products.slice(i, i + chunk);
      if (missing === 0) {
        this.sliced_strings_products.push(temparray);
        this.updateCurrentStringsProductArray();
        return;
      }
      if (missing > 0) {
        if (i >= this.strings_products.length - (this.strings_products.length % chunk)) {
          for (j = 0; j < missing; j++) {
            const product = new Product();
            temparray.push(product);
          }
        }
        this.sliced_strings_products.push(temparray);
      }
      this.updateCurrentStringsProductArray();
    }
  }

  updateCurrentBodyProductArray() {
    this.current_body_product_array = this.sliced_body_products[this.current_body_product_array_number];
  }

  updateCurrentGuitarNeckProductArray() {
    this.current_guitar_neck_product_array = this.sliced_neck_products[this.current_guitar_neck_product_array_number];
  }

  updateCurrentStringsProductArray() {
    this.current_strings_product_array = this.sliced_strings_products[this.current_strings_product_array_number];
  }

  updateCurrentBodyProduct() {
    this.current_body_product = this.body_products[(this.selected_body_page - 1) * 4 + this.selected_body_position];
  }

  updateCurrentNeckProduct() {
    this.current_neck_product = this.guitar_neck_products[(this.selected_guitar_neck_page - 1) * 4 + this.selected_guitar_neck_position];
  }

  updateCurrentStringsProduct() {
    this.current_strings_product = this.strings_products[(this.selected_strings_page - 1) * 4 + this.selected_strings_position];
  }

  increaseCurrentBodyProductArrayNumber() {
    if (this.current_body_product_array_number >= this.sliced_body_products.length - 1) {
      return;
    }
    this.current_body_product_array_number++;
    this.selected_body_page++;
    this.updateCurrentBodyProductArray();
  }

  decreaseCurrentBodyProductArrayNumber() {
    if (this.current_body_product_array_number <= 0) {
      return;
    }
    this.current_body_product_array_number--;
    this.selected_body_page--;
    this.updateCurrentBodyProductArray();
  }

  increaseCurrentGuitarNeckProductArrayNumber() {
    if (this.current_guitar_neck_product_array_number >= this.sliced_neck_products.length - 1) {
      return;
    }
    this.current_guitar_neck_product_array_number++;
    this.selected_guitar_neck_page++;
    this.updateCurrentGuitarNeckProductArray();
  }

  decreaseCurrentGuitarNeckProductArrayNumber() {
    if (this.current_guitar_neck_product_array_number <= 0) {
      return;
    }
    this.current_guitar_neck_product_array_number--;
    this.selected_guitar_neck_page--;
    this.updateCurrentGuitarNeckProductArray();
  }

  increaseCurrentStringsProductArrayNumber() {
    if (this.current_strings_product_array_number >= this.sliced_strings_products.length - 1) {
      return;
    }
    this.current_strings_product_array_number++;
    this.selected_strings_page++;
    this.updateCurrentGuitarNeckProductArray();
  }

  decreaseCurrentStringsProductArrayNumber() {
    if (this.current_strings_product_array_number <= 0) {
      return;
    }
    this.current_strings_product_array_number--;
    this.selected_strings_page--;
    this.updateCurrentStringsProductArray();
  }

  updateSelectedBodyPosition(index: number) {
    this.deselectSelectedBodyProducts();
    this.selected_body_position = index;
    if (this.current_body_product_array[index].id != null) {
      this.current_body_product_array[index].selected = !this.current_body_product_array[index].selected;
    }
    this.updateCurrentBodyProduct();
  }

  updateSelectedGuitarNeckPosition(index: number) {
    this.deselectSelectedGuitarNeckProducts();
    this.selected_guitar_neck_position = index;
    if (this.current_guitar_neck_product_array[index].id != null) {
      this.current_guitar_neck_product_array[index].selected = !this.current_guitar_neck_product_array[index].selected;
    }
    this.updateCurrentNeckProduct();
  }

  updateSelectedStringsPosition(index: number) {
    this.deselectSelectedStringsProducts();
    this.selected_strings_position = index;
    if (this.current_strings_product_array[index].id != null) {
      this.current_strings_product_array[index].selected = !this.current_strings_product_array[index].selected;
    }
    this.updateCurrentStringsProduct();
  }

  deselectSelectedBodyProducts() {
    for (let i = 0; i < this.sliced_body_products.length; i++) {
      for (let j = 0; j < this.sliced_body_products[i].length; j++) {
        this.sliced_body_products[i][j].selected = false;
      }
    }
  }

  deselectSelectedGuitarNeckProducts() {
    for (let i = 0; i < this.sliced_neck_products.length; i++) {
      for (let j = 0; j < this.sliced_neck_products[i].length; j++) {
        this.sliced_neck_products[i][j].selected = false;
      }
    }
  }

  deselectSelectedStringsProducts() {
    for (let i = 0; i < this.sliced_strings_products.length; i++) {
      for (let j = 0; j < this.sliced_strings_products[i].length; j++) {
        this.sliced_strings_products[i][j].selected = false;
      }
    }
  }

  openConfirmation() {
    $('#exampleModalCenter').modal();
  }

  messageDecision() {
    const productCompositionQuantityInputValue = $("#productQuantityInput").val();
    let firstOperand;
    let secondOperand;
    let thirdOperand;
    if(this.shoppingCartQuantityInfoMap.size == 0){
      this.maximumQuantity = Math.min(this.current_body_product.storageQuantity,
        this.current_neck_product.storageQuantity, this.current_strings_product.storageQuantity
      );
    }else if(this.shoppingCartQuantityInfoMap.size >= 0){
      if(this.shoppingCartQuantityInfoMap.has(this.current_body_product.id)){
        firstOperand = this.current_body_product.storageQuantity - this.shoppingCartQuantityInfoMap.get(this.current_body_product.id);
      }else {
        firstOperand = this.current_body_product.storageQuantity;
      }
      if(this.shoppingCartQuantityInfoMap.has(this.current_neck_product.id)){
        secondOperand = this.current_neck_product.storageQuantity - this.shoppingCartQuantityInfoMap.get(this.current_neck_product.id);
      }else {
        secondOperand = this.current_neck_product.storageQuantity;
      }
      if(this.shoppingCartQuantityInfoMap.has(this.current_strings_product.id)){
        thirdOperand = this.current_strings_product.storageQuantity - this.shoppingCartQuantityInfoMap.get(this.current_strings_product.id);
      }else {
        thirdOperand = this.current_strings_product.storageQuantity;
      }
      this.maximumQuantity = Math.min(firstOperand, secondOperand, thirdOperand);
    }
    if (productCompositionQuantityInputValue < 1) {
      this.quantityMessage = "a higher quantity number is required";
      this.disableAddShoppingCartButton = true;
      return;
    } else if (productCompositionQuantityInputValue > this.maximumQuantity) {
      this.quantityMessage = "a lower quantity number is required";
      this.disableAddShoppingCartButton = true;
      return;
    }
    this.quantityMessage = "";
    this.disableAddShoppingCartButton = false;
  }

  addToShoppingCart() {
    const selectedBodyProductId = this.current_body_product.id;
    const selectedNeckProductId = this.current_neck_product.id;
    const selectedStringsProductId = this.current_strings_product.id;
    const orderComponents = JSON.parse(localStorage.getItem('shoppingCart'));
    for (let i = 0; i < this.productCompositionQuantity; i++) {
      orderComponents.push([selectedBodyProductId, selectedNeckProductId, selectedStringsProductId]);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(orderComponents));
    this.maintainShoppingCart();
    setTimeout(() => $('#exampleModalCenter').modal('hide'));
  }

  resetVariables() {
    this.productCompositionQuantity = 1;
    this.quantityMessage = "";
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
