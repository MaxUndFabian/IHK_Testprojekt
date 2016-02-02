import {Component} from 'angular2/core';
@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'pfadfinder-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/test.html'
})
export class PfadfinderMeinolf {
  // Declaring the variable for binding with initial value
  yourName: string = '';
}