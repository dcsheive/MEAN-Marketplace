import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-user-listings',
  templateUrl: './user-listings.component.html',
  styleUrls: ['./user-listings.component.css']
})
export class UserListingsComponent implements OnInit {
  user;
  products;
  constructor(private _us: UserService, private router: Router, private _ls: ListingService) { }

  ngOnInit() {
    this._ls.attach(this);
    if (localStorage.getItem('userid') === 'undefined') {
      this.router.navigateByUrl('/');
    }
    this.user = localStorage.getItem('userid');
    this.getProducts();
  }
  getProducts() {
    this._ls.getAllMy(this.user, data => {
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
    if (action === 'create') {
      this.products.unshift(data);
    }
    if (action === 'edit') {
      for (let product of this.products) {
        if (product._id === data._id) {
          product = data;
        }
      }
    }
  }
}
