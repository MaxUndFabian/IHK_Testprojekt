import {Injectable, Inject}                         from 'angular2/core';
import {Http, Response, Headers, RequestOptions}    from 'angular2/http';
import {Observable}                                 from 'rxjs/Observable';


@Injectable({
})
export class GroupPageService {
  constructor(private http: Http) { }
  
  getGroupTitles() {
    return this.http.get('api/group/titlelist')
                    .map(res => res.json())
                    .catch(this.handleError);
  }
  
  getGroup(id: number){
      console.log("get: 'api/group/" + id + "'.");
      return this.http.get('api/group/' + id)
                      .map(res => res.json())
                      .catch(this.handleError);
  }
  
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error._body || 'Server error');
  }
}