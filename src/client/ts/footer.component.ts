import { Component } from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
  selector: 'footer-meinolf',
  templateUrl: 'client/html/footer.html'
})
export class FooterComponent {
  constructor(private _router: Router){}
    
  gotoLinks(){
      let link = ['Links'];
      this._router.navigate(link);
  }
  
  gotoContact(){
      let link = ['Contact'];
      this._router.navigate(link);
  }
  
  gotoImprint(){
      let link = ['Imprint'];
      this._router.navigate(link);
  }
}