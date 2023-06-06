import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderNavComponent } from './components/header-nav/header-nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderNavComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardComponent implements OnInit {

  isActive = false;

  constructor() { }

  ngOnInit(): void {
  }

  closeMenu(){
    this.isActive = !this.isActive;
  }

}
