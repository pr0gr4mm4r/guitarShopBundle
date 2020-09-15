import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewTitleComponent} from './admin/overview-title/overview-title.component';
import {AuthenticationComponent} from './user/authentication/authentication.component';
import {RegistrationComponent} from './user/registration/registration.component';
import {LandingPageComponent} from './shop/landing-page/landing-page.component';
import {ConfiguratorComponent} from './shop/configurator/configurator.component';
import {AddProductComponent} from './admin/add-product/add-product.component';
import {ShoppingCartComponent} from "./shop/shopping-cart/shopping-cart.component";
import {UpdateProductComponent} from "./admin/update-product/update-product.component";
import {DeleteProductComponent} from "./admin/delete-product/delete-product.component";
import {TableOverviewSingleBuyComponent} from "./shop/single-buy/table-overview-single-buy/table-overview-single-buy.component";
import {SearchByNameSingleBuyComponent} from "./shop/single-buy/search-by-name-single-buy/search-by-name-single-buy.component";


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'addProduct', component: AddProductComponent},
  {path: 'updateProduct', component: UpdateProductComponent},
  {path: 'deleteProduct', component: DeleteProductComponent},
  {path: 'getProduct', component: AddProductComponent},
  {path: 'configurator', component: ConfiguratorComponent},
  {path: 'searchByNameSingleBuy', component: SearchByNameSingleBuyComponent},
  {path: 'tableOverviewSingleBuy', component: TableOverviewSingleBuyComponent},
  {path: 'landingPage', component: LandingPageComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'overviewTitle', component: OverviewTitleComponent},
  {path: 'shoppingCart', component: ShoppingCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
