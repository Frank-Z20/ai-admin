import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './pages/department/department.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './pages/user/user.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthLoginGuardGuard } from './auth/auth-login-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent, canActivate:[AuthLoginGuardGuard], data: {title: '首页'} },
      { path: 'user', component: UserComponent, canActivate:[AuthLoginGuardGuard], data: {title: '用户管理'} },
      { path: 'department', component: DepartmentComponent, canActivate:[AuthLoginGuardGuard], data: {title: '部门管理'} }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
