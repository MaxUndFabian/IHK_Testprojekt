import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {LoginService} from './login.service';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: '[loginMeinolf]',
  // Location of the template for this component
  templateUrl: 'client/html/login.html',
  providers: [LoginService]
})
export class LoginComponent {
    linkText: string;
    input_username: string;
    input_password: string;
    username: string;
    role: string;
    
    constructor(private _loginService: LoginService, private _router: Router){
        this.linkText = 'Login';
        this.updateLoginStatus();
    }
    
    linkClicked(){
        if(localStorage.loggedIn == "true"){
            this.logout();
            localStorage.loggedIn = false;
        }
        else{
            $('#loginModal').modal('show');
        }
    }
    
    login(){
        this._loginService.login(this.input_username, this.input_password)
                          .subscribe((res) => {
                               //console.log(res);
                               this.username = res.username;
                               localStorage.username = res.username;
                               
                               this.role = res.role;
                               localStorage.role = res.role;
                               
                               this.linkText = 'Logout';
                               this.input_username = '';
                               this.input_password = '';
                               
                               localStorage.loggedIn = true;
                               $('#loginModal').modal('hide');
                               
                               //TODO reload the route, or navigate to specific route,
                               // otherwise elements, that require login won't be displayed or will still be displayed
                               this._router.navigateByUrl('/');
                          });
    }
    
    logout(){
        this._loginService.logout().subscribe();
        this.linkText = 'Login';
        this.username = null;
        localStorage.clear();
        this._router.navigateByUrl('/');
    }
    
    updateLoginStatus(){
        this._loginService.isLoggedIn().subscribe((res)=> {
           if(res.username){
               localStorage.loggedIn = true;
               this.linkText = "Logout";
               this._loginService.login("","").subscribe((res)=>{
                   this.username = res.username;
                   this.role = res.role;
               })
           }
           else{
               localStorage.loggedIn = false;
               this.linkText = 'Login';
           }
        });
    }
}