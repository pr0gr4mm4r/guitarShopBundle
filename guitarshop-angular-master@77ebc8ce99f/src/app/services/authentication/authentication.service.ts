import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private email: String;
  private password: String;

  constructor(private http: HttpClient, private route: Router) {
  }

  authenticationService(email, password) {
    console.log(this.createBasicAuthToken(email, password));

    return this.http.get<any>(environment.apiUrl + '/login',
      {
        observe: 'response',
        headers:{authorization: this.createBasicAuthToken(email, password),
        }
      }).pipe(map((response) => {
      this.email = email;
      this.password = password;
    }));
  }

  receive_roles(email: String): Observable<[String]> {
    console.log("hi");
    return this.http.get<[String]>(environment.apiUrl + '/userRolesByEmail/' + email);
  }

  createBasicAuthToken(email, password) {
    return 'Basic ' + window.btoa(email + ":" + password);
  }
}
