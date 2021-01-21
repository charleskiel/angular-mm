import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './nav-bar/nav-bar.component'
//import { StatusBarComponent } from './stat-bar/status-bar.component'
import { AppComponent } from './app.component';
import { StockComponent } from './stock/stock.component';
//import { SocketComponent } from './socket/socket.component';
import { StockListComponent } from './stock-list/stock-list.component';
import {SocketioService} from './socketio.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {Stock} from './stock/stock';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    //SocketComponent,
    StockListComponent,
    NavBarComponent,
    StatusBarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HighchartsChartModule
    //SocketComponent,

  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
