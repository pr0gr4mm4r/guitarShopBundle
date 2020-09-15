import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor() {
  }

  ngOnInit() {
    let role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      this.isAdmin = true;
    } else if (role === 'USER') {
      this.isUser = true;
    }
  }

  logout() {
    localStorage.clear();
  }
}
