import {NgModule} from '@angular/core';
import {UiModule} from '../ui/ui.module';
import {
  MatAutocompleteModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatTabsModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  exports:[
    UiModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule
  ]
})
export class SharedModule { }
