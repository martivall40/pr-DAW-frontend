import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core'; 

import { MaterialModule } from '../material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './components/home/home.component';
import { PriceComponent } from './components/home/price/price.component';
import { ImgDialogComponent } from './components/shared-components/dialog/img-dialog/img-dialog.component';
import { PlaceComponent } from './components/place/place.component';
import { AddPlaceComponent } from './components/place/add-place/add-place.component';
import { DeviceComponent } from './components/device/device.component';
import { AddDeviceComponent } from './components/device/add-device/add-device.component';
import { LogAllComponent } from './components/log/log-all/log-all.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    PriceComponent,
    ImgDialogComponent,
    PlaceComponent,
    AddPlaceComponent,
    DeviceComponent,
    AddDeviceComponent,
    LogAllComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,

  ],
  entryComponents: [ImgDialogComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher, },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
