import { Component, OnInit, Input } from '@angular/core';
import { ListingService } from '../listing.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.css']
})
export class NewListingComponent implements OnInit {
  newListing;
  validations;
  @Input() user;
  constructor(private _ls: ListingService) { }
  ngOnInit() {
    this.init();
  }
  init() {
    this.newListing = {
      title: '',
      description: '',
      price: '',
      location: '',
      image: ''
    };
  }
  addListing() {
    this._ls.create(this.newListing, data => {
      if (data.errors || data.message ) {
        console.log(data);
      } else {
        this._ls.notify(data, 'create');
        $('#new').modal('hide');
      }
    });
    this.init();

  }
}
