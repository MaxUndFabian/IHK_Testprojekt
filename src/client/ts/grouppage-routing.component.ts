import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {GroupPageService} from './group-page.service';



@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: '[groupPageNavigation]',
  // Location of the template for this component
  templateUrl: 'client/html/group-navigation.html',
  providers: [GroupPageService]
})
export class GrouppageNavigation {
    groups: any[];
    
    constructor(private _router: Router, private _groupService: GroupPageService){
        this._groupService.getGroupTitles().subscribe(
            (res) => {
                this.groups = res;
            },
            (error) => {
                console.log(error);
            }
        )
    }
    
    gotoGroup(id: number){
      let link = ['GroupPage', {id: id}];
      this._router.navigate(link);
    }
}