import { Injectable } from "@angular/core";
import { NotifierService } from 'angular-notifier';


@Injectable({
    providedIn: 'root'
  })
  export class NotifierMessageService {
  
    constructor(private notifier: NotifierService) { }
  
    default(strmensaje: string, onclose: () => void = () => {}) {
      this.notifier.notify(TypeNotifier.default, strmensaje);
      onclose();
    }
  
    info(strmensaje: string, onclose: () => void = () => {}) {
      this.notifier.notify(TypeNotifier.info, strmensaje);
      onclose();
    }
  
    success(strmensaje: string, onclose: () => void = () => {}) {
      this.notifier.notify(TypeNotifier.success, strmensaje);
      onclose();
    }
  
    warning(strmensaje: string, onclose: () => void = () => {}) {
      this.notifier.notify(TypeNotifier.warning, strmensaje);
      onclose();
    }
  
    error(strmensaje: string, onclose: () => void = () => {}) {
      this.notifier.notify(TypeNotifier.error, strmensaje);
      onclose();
    }
  
    hideAllNotifications() {
      this.notifier.hideAll();
    }
  
    hideOldestNotification() {
      this.notifier.hideOldest();
    }
  
    hideNewestNotification() {
      this.notifier.hideNewest();
    }
  
    showSpecificNotification(id: string, message: string, type: TypeNotifier) {
      this.notifier.show({ id, message, type });
    }
  
    hideSpecificNotification( id: string) {
      this.notifier.hide( id );
    }
  }
  
  
  enum TypeNotifier {
    default = 'default',
    info = 'info',
    success = 'success',
    warning = 'warning',
    error = 'error'
  }
  