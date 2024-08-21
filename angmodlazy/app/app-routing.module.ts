import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // ... other routes
  { 
    path: 'user-profile', 
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }