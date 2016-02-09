import {bootstrap}  from 'angular2/platform/browser';
import {AppRoutingComponent} from './app-routing.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

bootstrap(AppRoutingComponent, [HTTP_PROVIDERS]);