import {Injectable, Inject}                         from 'angular2/core';
import {Http, Response, Headers, RequestOptions}    from 'angular2/http';
import {Observable}                                 from 'rxjs/Observable';


@Injectable({
})
export class LoginService {
  
  loggedIn: boolean;
  
  constructor(private http: Http) { 
      this.loggedIn = false;
  }
  
  login(username: string, password: string) {
    let body = JSON.stringify({username, password});
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
      
    return this.http.post('api/login', body, options)
                    .map(function(res){
                        res.json();
                        if(res.username){
                            this.loggedIn = true;
                        }
                    })
                    .catch(this.handleError);
  }
  
  /*getUsername(id: number){
      return this.http.get('api/news/' + id)
                    .map(res => <News> res.json())
                    //.do(data => console.log(data))
                    .catch(this.handleError);
  }*/
  
  isLoggedIn(title: string, content: string, tag_id): boolean{
      return this.loggedIn;
  }
  
  logout() {
      return this.http.get('api/logout')
                      .map(res => res.json())
                      .catch(this.handleError);
      this.loggedIn = false;
  }
  
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}