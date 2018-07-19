import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  item;
  constructor(private _ls: ListingService) { }

  ngOnInit() {
    this.getBike();
  }
  getBike() {
    this._ls.getRandom(data => {
      this.item = data[0];
    });
  }


}
