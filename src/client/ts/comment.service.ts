import {Injectable, Inject}                         from 'angular2/core';
import {Http, Response, Headers, RequestOptions}    from 'angular2/http';
import {Observable}                                 from 'rxjs/Observable';


@Injectable({
})
export class CommentService {
  constructor(private http: Http) { }
  
  
  getComments(newsId: number) {
    return this.http.get('api/news/' + newsId + '/comments')
                    .map(res => res.json())
                    .catch(this.handleError);
  }
  
  createComment(content: string, newsId: number){
      let body = JSON.stringify({content});
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      
      return this.http.post('api/news/' + newsId + '/comments', body, options)
                      .catch(this.handleError);
  }
  
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}