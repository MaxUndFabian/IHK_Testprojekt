import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, Router} from 'angular2/router';

import { PfadfinderMeinolfComponent } from './pfadfinder_meinolf';
import { NewsComponent } from './news';
import { NewsArticleComponent } from './article';
import { GroupPageComponent } from './group_page';
import { LinksComponent } from './links';
import { FooterComponent} from './footer';
import { ContactComponent } from './contact';
import { ImprintComponent } from './imprint';

@Component({
  selector: 'my-app',
  templateUrl: 'client/html/navigation.html',
  directives: [ROUTER_DIRECTIVES, FooterComponent],
  providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: PfadfinderMeinolfComponent
  },
  {
    path: '/news',
    name: 'News',
    component: NewsComponent
  },
  {
    path: '/news/:id',
    name: 'NewsArticle',
    component: NewsArticleComponent
  },
  {
    path: '/group/:id',
    name: 'GroupPage',
    component: GroupPageComponent
  },
  {
    path: '/links',
    name: 'Links',
    component: LinksComponent
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactComponent
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: ImprintComponent
  }
])
export class AppRoutingComponent {
  constructor(private _router: Router){}
    
  gotoGroup(id: number){
      let link = ['GroupPage', {id: id}];
      this._router.navigate(link);
  }
}