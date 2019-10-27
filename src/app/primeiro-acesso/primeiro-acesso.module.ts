import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrimeiroAcessoPage } from './primeiro-acesso.page';
import { QtdMoradoresPage } from '../help/qtd-moradores/qtd-moradores.page';

const routes: Routes = [
  {
    path: '',
    component: PrimeiroAcessoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PrimeiroAcessoPage,
    QtdMoradoresPage
  ],
  entryComponents: [QtdMoradoresPage]
})
export class PrimeiroAcessoPageModule {}
