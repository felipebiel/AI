import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoPage } from './evento.page';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: EventoPage }])
  ],
  declarations: [EventoPage, DateAgoPipe]
})
export class EventoPageModule {}
