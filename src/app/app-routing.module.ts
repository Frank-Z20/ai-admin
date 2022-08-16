import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './pages/department/department.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { SystemMenu } from './system-menu';
import { SystemMenuService } from './service/system-menu.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data: {title: '首页'} },
  { path: 'user', component: UserComponent, data: {title: '用户管理'} },
  { path: 'department', component: DepartmentComponent, data: {title: '部门管理'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
