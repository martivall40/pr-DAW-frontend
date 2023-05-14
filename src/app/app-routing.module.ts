import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PlaceComponent } from './components/place/place.component';
import { AddPlaceComponent } from './components/place/add-place/add-place.component';
import { DeviceComponent } from './components/device/device.component';
import { AddDeviceComponent } from './components/device/add-device/add-device.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'place', component: PlaceComponent, canActivate: [AuthGuard]},
  {path: 'add-place', component: AddPlaceComponent, canActivate: [AuthGuard]},
  {path: 'device', component: DeviceComponent, canActivate: [AuthGuard]},
  {path: 'device/:id', component: DeviceComponent, canActivate: [AuthGuard]},
  {path: 'add-device', component: AddDeviceComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
