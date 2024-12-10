import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = {email: '', firstname: '',lastname: '',password: ''};
  errorMsg:Array<string>=[];

constructor(private router:Router
    ,private authService:AuthenticationService
   
    ){}
  register(){
    this.errorMsg=[];
    this.authService.registre({
      body: this.registerRequest
    }).subscribe({
      next: ()=>{
        this.router.navigate(['activate-account']);
      },
      error: (err)=>{
        this.errorMsg=err.error.validationErrors;
      }
    })
  };

  
  login(){
    this.router.navigate(['login']);
  };

}
