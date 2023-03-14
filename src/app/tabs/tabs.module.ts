import { AddressDetailsComponent } from './userInfo/address-details/address-details.component';
import { SharedModule } from './../shared/module/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { ParentTabComponent } from './parent-tab/parent-tab.component';
import { BasicDetailsComponent } from './userInfo/basic-details/basic-details.component';


@NgModule({
  declarations: [
    ParentTabComponent,
    BasicDetailsComponent,
    AddressDetailsComponent
  ],
  imports: [
    CommonModule,
    TabsRoutingModule,
    SharedModule
  ]
})
export class TabsModule { }
