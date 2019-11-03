import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeusDadosPage } from './meus-dados.page';
import { HttpClientModule } from '@angular/common/http'


const routes: Routes = [
  {
    path: '',
    component: MeusDadosPage
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeusDadosPage]
})
export class MeusDadosPageModule {}
