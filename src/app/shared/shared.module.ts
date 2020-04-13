import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot()
  ],
  exports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule {
}
