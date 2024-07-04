import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  private _listnersLoad = new Subject<any>();
  private _listnersLoadOut = new Subject<any>();

  constructor() { }

  listenLoaderPetition(): Observable<any> {
    return this._listnersLoad.asObservable();
  }

  listenLoaderOutPetition(): Observable<any> {
    return this._listnersLoadOut.asObservable();
  }

  fireShowLoader(): void {
    this._listnersLoad.next('');
  }

  fireHideLoader(): void {
    this._listnersLoadOut.next('');
  }

}
