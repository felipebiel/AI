import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'status',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../status/status.module').then(m => m.StatusPageModule)
          }
        ]
      },
      {
        path: 'evento',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../evento/evento.module').then(m => m.EventoPageModule)
          }
        ]
      },
      {
        path: 'consumo',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../consumo/consumo.module').then(m => m.ConsumoPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/status',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/status',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
