import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../productService/product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit{

  LoginFormModel = this.fb.group(
    {
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+')]]
    }
  )


  constructor(private fb: FormBuilder, private ps: ProductService, private rout: Router){}

  ngOnInit(): void {
    
  }

  login(){
    if(this.LoginFormModel.valid){
      var path=this.LoginFormModel.value
      var loginData={
        email:path.email,
        password:path.password
      }
      this.ps.signin(loginData).subscribe({
        next:(result:any)=>{
          alert(`${result.user.username} Login Success`)
          this.LoginFormModel.reset()
 
   localStorage.setItem("currentUser",result.user.username)
   localStorage.setItem("currentUserId",result.user._id)

  //  store token

  localStorage.setItem("token",result.token)

          this.rout.navigateByUrl('')
        },
        error:(result:any)=>{
          alert(result.error);
        }
      })
    }
    else{
      alert("Invalid Form")
    }
  }

}
