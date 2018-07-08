import { Component, OnInit, Input } from '@angular/core';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Input() item;
  @Input() user;
  deleteit;
  contact;
  constructor(private _ls: ListingService) { }

  ngOnInit() {
    if (this.item.user._id === this.user) {
      this.deleteit = true;
    }
  }
  deleteProduct(id) {
    this._ls.delete(id, data => {
      this._ls.notify(data, 'delete');
    });
  }
  openContact(item) {
    this.item = item;
    this.contact = true;
  }
}
