import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NKDatetimeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
