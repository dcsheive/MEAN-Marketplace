import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingComponent } from './listing/listing.component';
import { UserListingsComponent } from './user-listings/user-listings.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { NewListingComponent } from './new-listing/new-listing.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { ListingService } from './listing.service';
import { DayComponent } from './day/day.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ListingsComponent,
    ListingComponent,
    UserListingsComponent,
    UserListingComponent,
    NewListingComponent,
    DayComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, ListingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
