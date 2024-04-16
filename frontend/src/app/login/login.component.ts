import { Component } from '@angular/core';
import { response } from 'express';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';
  public message: string = '';

  constructor(private loginService: LoginService) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          this.message = 'Login successful';
        } else {
          console.log(response.message);
          this.message = 'An error occurred';
        }
      }, 
      error => {
        console.error(error);
        this.message = 'An error occurred';
      }
    );
  }
}
