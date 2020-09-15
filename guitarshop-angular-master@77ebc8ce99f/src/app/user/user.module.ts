import {NgModule} from '@angular/core';
import {RegistrationComponent} from './registration/registration.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [RegistrationComponent, AuthenticationComponent],
  imports: [
   SharedModule
  ],
  exports: [
    RegistrationComponent,
    AuthenticationComponent
  ]
})
export class UserModule {
}
