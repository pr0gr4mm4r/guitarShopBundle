import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../../services/registration/registration.service';
import {User} from '../../model/user';
import {Router} from '@angular/router';
import {Address} from "../../model/address";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  address: Address = new Address();
  emailExists = false;
  nameExists = false;
  emailHint = false;
  nameHint = false;
  confirmPassword = '';
  passwordHint = false;

  constructor(private registrationService: RegistrationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  registerPreparation() {
    this.registrationService.checkIfEmailPersisted(this.user.email).subscribe(data => this.emailExists = data);
    this.registrationService.checkIfNamePersisted(this.user.name).subscribe(data => this.nameExists = data);
    if (!this.comparePasswords()) {
      this.passwordHint = true;
    } else {
      this.passwordHint = false;
    }
    window.setTimeout(() => this.register(), 490);
  }

  register() {
    if (this.emailExists) {
      this.emailHint = true;
    } else {
      this.emailHint = false;
    }
    if (this.nameExists) {
      this.nameHint = true;
    } else {
      this.nameHint = false;
    }
    if (this.nameExists || this.emailExists || this.passwordHint) {
      return;
    }

    let userInfoObjects = [];
    userInfoObjects.push(this.user);
    userInfoObjects.push(this.address);
    this.registrationService.register(userInfoObjects).subscribe(() => {
    this.router.navigate(['/login']);
  }, () => {
      return;
    });
  }

  comparePasswords(): boolean {
    return this.user.password === this.confirmPassword;
  }
}
