import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  @ViewChild('authForm') form: NgForm;

  constructor(private authSvc: AuthService, private router: Router) {}
  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    //
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      //
      authObs = this.authSvc.login(email, password);
      console.log('Login');
      this.isLoading = false;
    } else {
      this.authSvc.signup(email, password);
    }
    // subscribe to the login/signup service
    authObs.subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        this.router.navigate(['/recipes']);
      },
      error: (errMsg) => {
        console.log('ERROR :: ', errMsg);
        this.error = errMsg;
        this.isLoading = false;
      },
      complete: () => {
        console.log('Complete!!');
      },
    });
    //console.log(authForm.value);
    authForm.reset();
  }
}
