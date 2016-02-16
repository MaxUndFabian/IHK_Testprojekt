import {Component} from 'angular2/core';
import {SidebarComponent} from './news-sidebar.component';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'pfadfinder-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/main.html',
  directives: [SidebarComponent]
})
export class PfadfinderMeinolfComponent {
  // Declaring the variable for binding with initial value
  yourName: string = '';
}