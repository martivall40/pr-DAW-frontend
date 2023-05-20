import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PlaceComponent } from './components/place/place.component';
import { AddPlaceComponent } from './components/place/add-place/add-place.component';
import { DeviceComponent } from './components/device/device.component';
import { AddDeviceComponent } from './components/device/add-device/add-device.component';
import { LogAllComponent } from './components/log/log-all/log-all.component';
import { LogDeviceComponent } from './components/log/log-device/log-device.component';
import { LogProviderComponent } from './components/log/log-provider/log-provider.component';
import { GraphAllComponent } from './components/graph/graph-all/graph-all.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'place', component: PlaceComponent, canActivate: [AuthGuard]},
  {path: 'add-place', component: AddPlaceComponent, canActivate: [AuthGuard]},
  {path: 'device', component: DeviceComponent, canActivate: [AuthGuard]},
  {path: 'device/:id', component: DeviceComponent, canActivate: [AuthGuard]},
  {path: 'add-device/:id', component: AddDeviceComponent, canActivate: [AuthGuard]},
  {path: 'log/all', component: LogAllComponent, canActivate: [AuthGuard]},
  {path: 'log/device', component: LogDeviceComponent, canActivate: [AuthGuard]},
  {path: 'log/provider', component: LogProviderComponent, canActivate: [AuthGuard]},
  {path: 'graph/all', component: GraphAllComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
