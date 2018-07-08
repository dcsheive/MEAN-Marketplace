import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  user;
  products: any;
  constructor(private _ls: ListingService, private _us: UserService , private router: Router) { }

  ngOnInit() {
    this._ls.attach(this);
    if (localStorage.getItem('userid') === 'undefined') {
      this.router.navigateByUrl('/');
    }
    this.user = localStorage.getItem('userid');
    this.getProducts();
  }
  getProducts() {
    this._ls.getAll(data => {
      this.products = data.reverse();
    });
  }
  update(data, action) {
    if (action === 'delete') {
      for (const product of this.products) {
        if (product._id === data._id) {
          const index = this.products.indexOf(product);
          if (index > -1) {
            this.products.splice(index, 1);
          }
        }
      }
    }
  }
}
