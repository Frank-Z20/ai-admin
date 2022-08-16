import { Component } from '@angular/core';
import { ThemeService } from './service/theme.service';
import { SystemMenu } from './system-menu';
import { SystemMenuService } from './service/system-menu.service';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  isCollapsed = false;
  activatedMenuIndex = -1;
  menus: SystemMenu[] = [];
  tabs: { path: string, title: string }[] = [];

  constructor(
    private themeService: ThemeService,
    private sysMenuService: SystemMenuService,
    private router: Router
  ) {
    this.router.events.pipe(filter(e => e instanceof ActivationEnd))
	    .subscribe((e) => {
        const thisEvt = <ActivationEnd>e;
        const activatedRoutePath = thisEvt.snapshot.routeConfig?.path;
        const routeData = thisEvt.snapshot.routeConfig?.data;
        let menuTitle = '新标签页';
        if(routeData) {
          menuTitle = routeData['title'];
        }
        let isExist = false;
        debugger
        this.tabs.every((t, i) => {
          if(activatedRoutePath === t.path) {
            this.activatedMenuIndex = i;
            isExist = true;
            return false;
          }
          return true;
        });

        if(!isExist) {
          this.activeMenu(activatedRoutePath, menuTitle);
        }
	    });
  }

  activeMenu(menuPath: string | undefined, menuTitle: string): void {
    if(!menuPath) return;
    let menuIndex = -1;
    this.tabs.every((t, i) => {
      if(menuPath === t.path) {
        menuIndex = i;
        return false;
      }
      return true;
    });

    if(menuIndex === -1) {
      this.tabs.push({path: menuPath, title: menuTitle});
      menuIndex = this.tabs.length - 1;
      this.activatedMenuIndex = menuIndex;
    }
  }

  activeRoute(path: string): void {
    this.router.navigateByUrl(path).finally();
  }

  toggleTab(path: string): void {
    this.activeRoute(path);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

  closeTab(path: string): void {
    if (1 === this.tabs.length) return;

    let selectedIndex = -1;
    this.tabs.every((t, i) => {
      if(t.path === path) {
        selectedIndex = i;
        return false;
      }

      return true;
    });
    this.tabs.splice(selectedIndex, 1);

    if(selectedIndex === this.activatedMenuIndex)  {
      let prevIndex = this.activatedMenuIndex - 1;
      this.activatedMenuIndex = prevIndex > 0 ? prevIndex : 0;
      this.activeRoute(this.tabs[this.activatedMenuIndex].path);
    }else if (this.activatedMenuIndex > selectedIndex) {
	    this.activatedMenuIndex -= 1;
	  }
  }

  ngOnInit(): void {
    this.sysMenuService.getSystemMenus().subscribe((data: SystemMenu[]) => this.menus = data);
  }
}
