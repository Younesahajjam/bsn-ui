import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';


@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule,CodeInputModule,],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ActivateAccountComponent {

  message = '';
  isOkay= true;
  submitted= false;

  constructor(
    private  router: Router
    ,private authService: AuthenticationService){}
    
    onCodeCompleted(token: string): void{
     this.confirmAccount(token);
    }

    redirectToLogin(){
      this.router.navigate(['login']);
    }

   private confirmAccount(token: string):void{
    this.authService.confirm({
      token
    }).subscribe({
      next: ()=>{
        this.message='Your account has been successfully activated',
        this.submitted=true,
        this.isOkay= true
      },
      error: ()=>{
        this.message='token has been expired or invalid';
        this.submitted=true;
        this.isOkay=false;
      }
    });
   }
}


