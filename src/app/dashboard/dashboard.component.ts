import { Component,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  @ViewChild('sidenav') sidenav!: MatSidenav;
  showConfigMenu = false;
  showStudMenu=false;

  constructor(private router: Router) {}

  toggleConfigMenu() {
    this.showConfigMenu = !this.showConfigMenu;
  }
  toggleStudMenu() {
    this.showStudMenu = !this.showStudMenu;
  }

  
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}