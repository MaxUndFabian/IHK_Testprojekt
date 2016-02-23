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
    user: any;
    
    constructor(private _loginService: LoginService, private _router: Router){
        this.user = {};
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
                               this.user = res;
                               localStorage.username = res.username;
                               localStorage.role = res.rolename;
                               
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
        this.user = {};
        localStorage.clear();
        this._router.navigateByUrl('/');
    }
    
    updateLoginStatus(){
        this._loginService.isLoggedIn().subscribe((res)=> {
           if(res.username){
               localStorage.loggedIn = true;
               this.linkText = "Logout";
               this._loginService.login("","").subscribe((res)=>{
                   this.user = res;
                   console.log(this.user);
               })
           }
           else{
               localStorage.loggedIn = false;
               this.linkText = 'Login';
           }
        });
    }
    
    
    registerClicked(){
        $('#loginModal').modal('hide');
        this._router.navigate(['Register']);
    }
}