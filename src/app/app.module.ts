import { NgModule, LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoginService } from './services/login-service.service';
import { TriggerService } from './services/trigger-service.service';
import { BaseService } from './services/base.service';
//import { AuthInterceptor } from './helpers/authInterceptor';
import localePE from "@angular/common/locales/es-PE";
import { registerLocaleData } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotifierModule } from 'angular-notifier';
import { BuscarEmpleoComponent } from './pages/buscar-empleo/buscar-empleo.component';
import { RegistraUserComponent } from './components/registra-user/registra-user.component';
import { BuscarEmpleoDetComponent } from './pages/buscar-empleo-det/buscar-empleo-det.component';
import { EmpleoDetComponent } from './pages/empleo-det/empleo-det.component';

registerLocaleData(localePE,'es-PE');

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent, 
    LoginComponent, BuscarEmpleoComponent, RegistraUserComponent, BuscarEmpleoDetComponent, EmpleoDetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    RouterModule,
    NgxLoadingModule.forRoot({}),
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule,
    ModalModule.forChild(),
    NgSelectModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 20
        },
        vertical: {
          position: 'top',
          distance: 20,
          gap: 10
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 3000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease'
        },
        overlap: 150
      }
    })
   
  ],
  schemas:[NO_ERRORS_SCHEMA], 
  providers: [
    LoginService, 
   { provide: LOCALE_ID, useValue: "es-PE" },
   TriggerService, 
   BaseService, 
   //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
