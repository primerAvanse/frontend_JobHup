import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login-service.service';
//import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private loginService: LoginService, private fb: FormBuilder,
    private router: Router) {

    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  get f() { return this.form.controls; }

  login() {

    if (this.form.invalid) {
      return;
    }

    const val = this.form.value;

    if (val.user && val.password) {
      this.loginService.login(val.user, val.password)
        .subscribe(
          res => {
            console.log("sesion login 02 " + JSON.stringify(res));
            //this.loginService.emitcurrentUserSource(res.userResponse); 
          },
          error => { console.error(error); },
          () => {
            console.log("sesion redirect dashboard ");
            this.navigate();
          }
        );
    }

  }
  
  ReguistrarUser() {
    this.navigateRegister()

  }

  navigate() {
    this.router.navigateByUrl('/buscarempleo');
  }
  navigateRegister() {
    this.router.navigateByUrl('/registeruser');
  }

}

