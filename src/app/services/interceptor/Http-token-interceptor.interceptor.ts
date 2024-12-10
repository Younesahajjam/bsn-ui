import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../token/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService); // Injecter le TokenService
  const token = tokenService.token; // Récupérer le jeton depuis le service
  console.log('TokenInterceptor called');  // Vérifier si l'intercepteur est appelé
  console.log('Token from TokenService:', token);  // Vérifier le token récupéré


  // Vérifier si un jeton est disponible, puis cloner la requête avec l'en-tête Authorization
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Cloned request with Authorization:', authReq);  // Vérifier la requête clonée
    return next(authReq); // Passer la requête avec l'en-tête Authorization
  }

  // Passer la requête sans modification si aucun jeton n'est disponible
  return next(req);
};