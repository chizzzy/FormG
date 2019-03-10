import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatSelectModule, MatTabsModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule
  ]
})
export class SharedModule {
}
