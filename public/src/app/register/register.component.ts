import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerUser;
  private loginUser;
  private loginMessage;
  constructor(private _us: UserService, private router: Router) {
  }
  ngOnInit() {
    this.init();
  }
  init() {
    this.registerUser = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: ''
    };
    this.loginUser = {
      email: '',
      password: '',
    };
  }
  login() {
    this._us.login(this.loginUser, (data) => {
      if (data.errors || data.message ) {
        console.log(data);
        this.loginMessage = data;
      } else {
        localStorage.setItem('userid', data._id);
        this.router.navigateByUrl('/browse');
      }
    });
    this.init();
  }
  register() {
    this._us.register(this.registerUser, (data) => {
      if (data.errors || data.message ) {
        console.log(data);
      } else {
        localStorage.setItem('userid', data._id);
        this.router.navigateByUrl('/browse');
      }
    });
    this.init();
  }

}
