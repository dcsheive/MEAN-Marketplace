import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  listeners = [];
  constructor(private _httpClient: HttpClient) { }
  attach(component) {
    let inList = false;
    for ( const comp of this.listeners) {
      if (comp === component) {
        inList = true;
      }
    }
    if (!inList) {
      this.listeners.push(component);
    }
  }
  notify(data, action) {
    for (const lis of this.listeners) {
      lis.update(data, action);
    }
  }
  create(listing, cb) {
    this._httpClient.post('/api/products/', listing).subscribe(data => cb(data));
  }
  getAll(cb) {
    this._httpClient.get('/api/products/').subscribe(data => cb(data));
  }
  getRandom(cb) {
    this._httpClient.get('/api/products/random').subscribe(data => cb(data));
  }
  getAllMy(id, cb) {
    this._httpClient.get('/api/myproducts/' + id).subscribe(data => cb(data));
  }
  getListing(listing, cb) {
    this._httpClient.get('/api/products/' + listing._id).subscribe(data => cb(data));
  }
  update(listing,  cb) {
    this._httpClient.put('/api/products/' + listing._id, listing).subscribe(data => cb(data));
  }
  delete(listing, cb) {
    this._httpClient.delete('/api/products/' + listing._id, listing).subscribe(data => cb(data));
  }
}
