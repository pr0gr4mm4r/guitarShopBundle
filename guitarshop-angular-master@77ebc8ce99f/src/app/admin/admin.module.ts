import {NgModule} from '@angular/core';
import {AddProductComponent} from './add-product/add-product.component';
import {DeleteProductComponent} from './delete-product/delete-product.component';
import {UpdateProductComponent} from './update-product/update-product.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [AddProductComponent,
    DeleteProductComponent,
    UpdateProductComponent],
  imports: [
    SharedModule
  ],
  exports: [
    AddProductComponent,
    DeleteProductComponent,
    UpdateProductComponent
  ]
})
export class AdminModule {
}
