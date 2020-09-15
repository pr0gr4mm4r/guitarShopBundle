import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'app-find-book',
  templateUrl: './overview-title.component.html',
  styleUrls: ['./overview-title.component.css']
})
export class OverviewTitleComponent implements OnInit {

  private isAdmin = false;

  constructor(
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('role') === null) {
      this.navigateToLogin();
    }
  }

  compareTitles(a, b) {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    if (aTitle < bTitle) {
      return -1;
    } else if (aTitle > bTitle) {
      return 1;
    }
    return 0;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
