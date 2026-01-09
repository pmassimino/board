import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { AuthGuard } from './core/services/auth.guard';
import { CotizacionFormComponent } from './cotizacioncereal/cotizacion-form/cotizacion-form.component';
import { IndexComponent } from './index/index.component';
import { LayoutAppComponent } from './layouts/layout-app/layout-app.component';
import { LayoutLoginComponent } from './layouts/layout-login/layout-login.component';
import { LayoutMainComponent } from './layouts/layout-main/layout-main.component';
import { LoginComponent } from './login/login.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostFormComponent } from './post/post-form/post-form.component';




const routes: Routes = [
  {path: '', component: LayoutMainComponent,children: [
    {path: '', component: IndexComponent}, 
    {path: 'index', component: IndexComponent},
    
  ]},
  {path: '', component: LayoutLoginComponent,children: [
  {path: 'login', component: LoginComponent}, 
]},
{path: '', component: LayoutAppComponent,children: [
  { path: 'controlpanel', component: ControlPanelComponent,canActivate: [AuthGuard] },
  {path: 'cotizacioncereal/add', component: CotizacionFormComponent,canActivate: [AuthGuard]},  
]},
{path: '', component: LayoutAppComponent,children: [ 
  {path: 'post/list', component: PostListComponent,canActivate: [AuthGuard]},  
  {path: 'post/add', component: PostFormComponent,canActivate: [AuthGuard]}, 
  {path: 'post/:id', component: PostFormComponent,canActivate: [AuthGuard]},  
  
]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
