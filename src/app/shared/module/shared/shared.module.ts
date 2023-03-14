import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

const matModules = [

  MatTabsModule,
  MatIconModule,
  MatDialogModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    matModules
  ],
  exports: [
    matModules
  ]
})
export class SharedModule { }
