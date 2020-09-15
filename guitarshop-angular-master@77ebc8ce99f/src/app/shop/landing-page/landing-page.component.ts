import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  english = true;
  isAdmin = false;
  isUser = false;

  constructor() {
  }

  ngOnInit() {
    if (localStorage.getItem('role') === 'ADMIN') {
      this.isAdmin = true;
    }
    if (localStorage.getItem('role') === 'USER') {
      this.isUser = true;
    }
  }

}
