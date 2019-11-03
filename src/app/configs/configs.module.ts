import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigsPage } from './configs.page';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  imports: [
    HttpClientModule,
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ConfigsPage }])
  ],
  declarations: [ConfigsPage]
})
export class ConfigsPageModule {}
