import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class AiRouteReuseStrategy implements RouteReuseStrategy {
    public static routeSnapshots: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        const url = this.getFullRouteUrl(route);
        AiRouteReuseStrategy.routeSnapshots[url] = handle;
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const url = this.getFullRouteUrl(route);
        return !!AiRouteReuseStrategy.routeSnapshots[url];
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        const url = this.getFullRouteUrl(route);
        return route.routeConfig ? AiRouteReuseStrategy.routeSnapshots[url] : null;
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig &&
            JSON.stringify(future.params) === JSON.stringify(curr.params);
    }

    private getFullRouteUrl(route: ActivatedRouteSnapshot): string {
        return this.getFullRouteUrlPaths(route).filter(Boolean).join('/').replace(/\//g, '_');
    }
    
    private getFullRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
        const paths = this.getRouteUrlPaths(route);
        return route.parent
            ? [...this.getFullRouteUrlPaths(route.parent), ...paths]
            : paths;
    }

    private getRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
        return route.url.map(urlSegment => urlSegment.path);
    }
}
