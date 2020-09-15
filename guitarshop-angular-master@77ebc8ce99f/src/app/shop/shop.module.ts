import {NgModule} from '@angular/core';
import {ConfiguratorComponent} from './configurator/configurator.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {OverviewTitleComponent} from '../admin/overview-title/overview-title.component';
import {SharedModule} from '../shared/shared.module';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';

import {TableOverviewSingleBuyComponent} from './single-buy/table-overview-single-buy/table-overview-single-buy.component';
import {SearchByNameSingleBuyComponent} from './single-buy/search-by-name-single-buy/search-by-name-single-buy.component';


@NgModule({
  declarations: [ConfiguratorComponent, LandingPageComponent, OverviewTitleComponent, ShoppingCartComponent, SearchByNameSingleBuyComponent, TableOverviewSingleBuyComponent, TableOverviewSingleBuyComponent, SearchByNameSingleBuyComponent],
  imports: [
    SharedModule
  ],
  exports: [
    ConfiguratorComponent,
    LandingPageComponent,
    OverviewTitleComponent
  ]
})
export class ShopModule {
}
