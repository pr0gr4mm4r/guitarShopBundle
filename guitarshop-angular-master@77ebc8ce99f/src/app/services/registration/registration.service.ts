import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  register(userInfoObjects): Observable<Object> {
    return this.http.post<Object>(environment.apiUrl + '/addUser', userInfoObjects);
  }

  checkIfEmailPersisted(email): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + '/checkIfEmailPersisted/' + email);
  }

  checkIfNamePersisted(name): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + '/checkIfNamePersisted/' + name);
  }
}
