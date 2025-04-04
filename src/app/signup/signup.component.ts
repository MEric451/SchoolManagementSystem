import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http:HttpClient) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.signupForm.valid){
      const data=this.signupForm.value;
      this.http.post('http://172.16.10.16:8083/api/v1/auth/register', data).subscribe({
        next: (data)=>{
        alert('registration succsful')
        this.router.navigate(['dashboard'])
        },
        error:()=>{
          alert('failed')
        }
      })
    }
  }
}