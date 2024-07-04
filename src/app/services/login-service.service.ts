import { Injectable } from '@angular/core';
import  * as moment from 'moment';
import { config } from './../../environments/environment'
import { UserSession, Usuario } from '../models/user';
import { BaseService } from './base.service';
import { Observable, ReplaySubject, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class LoginService { 

  private currentUserSource = new ReplaySubject<Usuario>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private base: BaseService, private httpCliente: HttpClient) { }

  login(user: string, password: string) : Observable<UserSession>{
  //   return this.base.ExecuteHttpPost<UserSession>(config.authMethod, {
  //     NombreUsua: user,
  //     ClaveUsua: password
  //   }, this.setSession);
  // }

    return this.base.ExecuteHttpPost<UserSession>(config.authMethod, {
      NombreUsua: user,
      ClaveUsua: password
    }, this.setSession);
  }


  // login(user: string, password: string): Observable<UserSession> {
  //   return this.httpCliente.post<UserSession>(config.endpointServices + config.authMethod, {
  //     NombreUsua: user,
  //     ClaveUsua: password
  //   }).pipe( tap( (res: UserSession) =>{this.setSession(res);}));
  // }

  private setSession(authResult: UserSession) {
    if(authResult){
      console.log("sesion 01" + JSON.stringify(authResult));
    //  this.currentUserSource.next(authResult.userResponse);
    localStorage.setItem('id_token', authResult.nombreUsua);
    const expiresAt = moment().add(60000, 'second');
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }
   
  }

  emitcurrentUserSource(userSession: Usuario) {
    this.currentUserSource.next(userSession);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }    
}
