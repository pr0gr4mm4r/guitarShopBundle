import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<[Product]> {
    return this.http.get<[Product]>(environment.apiUrl + '/products');
  }

  getProductByName(name: String) {
    return this.http.get<Product>(environment.apiUrl + '/productByName/' + name);
  }
}
