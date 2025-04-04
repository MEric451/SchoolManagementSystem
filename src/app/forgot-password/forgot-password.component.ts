import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
email: string = '';

constructor(private router: Router) {}
  resetPassword() {
    if (!this.email) {
      alert('Please enter your email.');
      return;
    }

    alert(`A password reset link has been sent to ${this.email}`);
    this.router.navigate(['/login']); 
  }

}

