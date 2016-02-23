import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, Router} from 'angular2/router';

import { PfadfinderMeinolfComponent } from './pfadfinder_meinolf.component';
import { NewsComponent } from './news.component';
import { NewsArticleComponent } from './article.component';
import { GroupPageComponent } from './group_page.component';
import { LinksComponent } from './links.component';
import { FooterComponent} from './footer.component';
import { ContactComponent } from './contact.component';
import { ImprintComponent } from './imprint.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@Component({
  selector: 'my-app',
  templateUrl: 'client/html/navigation.html',
  directives: [ROUTER_DIRECTIVES, LoginComponent, FooterComponent],
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
  },
  {
      path: '/register',
      name: 'Register',
      component: RegisterComponent
  }
])
export class AppRoutingComponent {
  constructor(private _router: Router){}
    
  gotoGroup(id: number){
      let link = ['GroupPage', {id: id}];
      this._router.navigate(link);
  }
}