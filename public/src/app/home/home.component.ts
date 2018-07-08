import { Component} from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private _us: UserService, private router: Router) {}
  logout() {
    this._us.logout(data => {
      localStorage.setItem('userid', undefined);
      this.router.navigateByUrl('/');
    });
  }
}
