import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/components/layout/layout.component";
import {AuthGuard} from "./applications/modules/authentication/guards/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./applications/modules/authentication/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full'
      },
      {
        path: 'pages',
        loadChildren: () => import('./applications/modules/page/page.module').then((m) => m.PageModule),
      },
      {
        path: '',
        loadChildren: () => import('./applications/modules/box/box.module').then((m) => m.BoxModule),
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./applications/modules/remote-screen/remote-screen.module').then((m) => m.RemoteScreenModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
