import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;

  constructor(private http:HttpClient,private fb:FormBuilder,private router:Router){
    this.loginForm=this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }
  
  onSubmit(){
    if(this.loginForm.valid){
      const data=this.loginForm.value;
      this.http.post<{status:string; user:{role:string}; token:string}>('http://172.16.10.16:8083/api/v1/auth/login', data).subscribe({
        next:(response)=>{
          if (response.token){
            localStorage.setItem('token',response.token);

            if(response.user && response.user.role){
              localStorage.setItem('role',response.user.role)

            this.router.navigate(['dashboard'])
            }

            alert('login success')

          }
          error:()=>{
            alert('login failed')
          }
        }
      })

    }

  }
}