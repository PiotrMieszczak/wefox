import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiRootModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { HttpClientModule } from '@angular/common/http';

const APP_MODULES = [CoreModule];
const UI_LIB_MODULES = [
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiAlertModule,
  TuiDialogModule,
];
const STORE_MODULES = [AkitaNgDevtools.forRoot()];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    [...APP_MODULES],
    [...UI_LIB_MODULES],
    [...STORE_MODULES],
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
