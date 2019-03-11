import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatSelectModule, MatTabsModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
