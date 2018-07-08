import { Component, OnInit, Input } from '@angular/core';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['../listing/listing.component.css']
})
export class UserListingComponent implements OnInit {
  @Input() item;
  newListing;
  edit;
  constructor(private _ls: ListingService) { }

  ngOnInit() {
    this.edit = false;
    this.init();
    this.newListing = this.item;
  }
  deleteProduct(id) {
    this._ls.delete(id, data => {
      this._ls.notify(data, 'delete');
    });
  }
  updateProduct() {
    this._ls.update(this.newListing, data => {
      this._ls.notify(data, 'edit');
    });
    this.init();
    this.edit = false;
  }
  startEdit() {
    this.edit = true;
  }
  cancelEdit() {
    this.edit = false;
  }
  init() {
    this.newListing = {
      _id: '',
      title: '',
      description: '',
      price: '',
      location: '',
      image: '',
    };
  }
}
