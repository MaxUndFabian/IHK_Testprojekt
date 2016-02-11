import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'group-page-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/group.html'
})
export class GroupPageComponent {
  id: number;
  constructor(params: RouteParams){
      this.id = params.get('id');
  }
}