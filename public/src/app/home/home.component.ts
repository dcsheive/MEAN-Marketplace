import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private registerUser;
  private loginUser;
  private loginMessage;
  private user;
  constructor(private _us: UserService, private router: Router) {}
  ngOnInit() {
    this.init();
    if (localStorage.getItem('userid') === 'undefined') {
    } else {
      this.user = localStorage.getItem('userid');
    }
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
        $('#login').modal('hide');
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
        $('#register').modal('hide');
        this.router.navigateByUrl('/browse');
      }
    });
    this.init();
  }
  logout() {
    this._us.logout(data => {
      localStorage.setItem('userid', undefined);
      this.router.navigateByUrl('/');
    });
  }
}
