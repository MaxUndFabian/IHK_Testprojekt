import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { PfadfinderMeinolfComponent } from './pfadfinder_meinolf';

@Component({
  selector: 'my-app',
  templateUrl: 'client/html/navigation.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
  {
    path: '/',
    name: 'Main',
    component: PfadfinderMeinolfComponent
  }
])
export class AppRoutingComponent {
}