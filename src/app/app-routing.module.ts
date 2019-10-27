import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: "", redirectTo: '/login', pathMatch: "full" },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  {
    path: 'configs',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./configs/configs.module').then(m => m.ConfigsPageModule)
      }
    ]
  },
  { path: 'sobre', loadChildren: './sobre/sobre.module#SobrePageModule' },
  { path: 'meus-dados', loadChildren: './meus-dados/meus-dados.module#MeusDadosPageModule' },
  { path: 'primeiro-acesso', loadChildren: './primeiro-acesso/primeiro-acesso.module#PrimeiroAcessoPageModule' },
  { path: 'qtd-moradores', loadChildren: './help/qtd-moradores/qtd-moradores.module#QtdMoradoresPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
