import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
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
        path: '',
        redirectTo: '/tabs/evento',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/evento',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
