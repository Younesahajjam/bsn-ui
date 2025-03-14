import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string){
   localStorage.setItem('token',token);
  }

 // get token(){ return localStorage.getItem('token') as string; }
 get token(): string | null {
  const token = localStorage.getItem('token');
  console.log('Token retrieved from localStorage:', token);  // Vérifier ce qui est récupéré
  return token;
}

isTokenNotValid() {
  return !this.isTokenValid();
}

isTokenValid() {
  const token = this.token;
  if (!token) {
    return false;
  }

 // decode the token
 const jwtHelper = new JwtHelperService();
 // check expiry date
 const isTokenExpired = jwtHelper.isTokenExpired(token);
 if (isTokenExpired) {
   localStorage.clear();
   return false;
 }
 return true;
}


}
