import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UserListingsComponent } from './user-listings/user-listings.component';
import { ListingsComponent } from './listings/listings.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'browse', component: ListingsComponent },
  { path: 'listings', component: UserListingsComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
