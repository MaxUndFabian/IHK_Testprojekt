import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Router} from 'angular2/router';

import { DateSortPipe } from './date_sort.pipe';

import {GroupPageService} from './group-page.service';
import {NewsService} from './news.service';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'group-page-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/group.html',
  providers: [GroupPageService, NewsService],
  pipes: [DateSortPipe]
})
export class GroupPageComponent {
  
  group: any = {};
  news: any = new Array<any>();
  constructor(params: RouteParams, private _groupService: GroupPageService, private _newsService: NewsService, private _router: Router){
      this._groupService.getGroup(params.get('id')).subscribe(
          (res) => {
              console.log(res);
              this.group = res;
              this.getNews();
          },
          (error) => {
              console.log(error);
          }
      )
  }
  
  getNews(){
      this._newsService.getNewsByTagId(this.group.tag_id).subscribe(
          (res) => {
              this.news = res;
              this.news.forEach(elem => {
                  elem.creationDate = new Date(elem.creationDate);
              })
          },
          (error) => {
              
          }
      )
  }
  
  gotoArticle(id: number){
      let link = ['NewsArticle', {id: id}];
      this._router.navigate(link);
  }
}