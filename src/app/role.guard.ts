import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['expectedRole'].split('|');
    const userRole = localStorage.getItem('role');

    if (userRole  && expectedRoles.includes(userRole)) {
      return true;
    } else {
      alert('Access Denied, Please contact Admin')
      return false;
    }
  }
}