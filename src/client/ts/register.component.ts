import {Component} from 'angular2/core';
import {NgForm, FORM_DIRECTIVES, Control, ControlGroup, Validators, FormBuilder} from 'angular2/common';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'register-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/register.html',
  directives: [FORM_DIRECTIVES]
})
export class RegisterComponent {
    registerForm: ControlGroup;
    
    username: Control;
    firstname: Control;
    lastname: Control;
    password: Control;
    pw_confirm: Control;
    hinderLoop: boolean;
        
    constructor(private builder: FormBuilder){
        this.username = new Control("", Validators.compose([Validators.required]));
        this.firstname = new Control("", Validators.compose([Validators.required]));
        this.lastname = new Control("", Validators.compose([Validators.required]));
        this.password = new Control("", Validators.compose([Validators.required, 
                                                          (c: Control) => {
                                                            if(this.pw_confirm != undefined){
                                                                this.input_password = c.value;
                                                                if(!this.hinderLoop){
                                                                    this.hinderLoop = true;
                                                                    this.pw_confirm._runValidator();
                                                                }
                                                            }
                                                            if(c.value != this.input_pw_confirm){
                                                                this.hinderLoop = false;
                                                                return {"passwordNotConfirmed": true };
                                                            }
                                                            this.hinderLoop = false;
                                                            console.log("equal 1");
                                                            return null;
                                                        }]));
        this.pw_confirm = new Control("", Validators.compose([Validators.required, 
                                                          (c: Control) => {
                                                            this.input_pw_confirm = c.value;
                                                            if(!this.hinderLoop){
                                                                this.hinderLoop = true;
                                                                this.password._runValidator();
                                                            }
                                                            if(this.input_password != c.value){
                                                                this.hinderLoop = false;
                                                                return {"passwordNotConfirmed": true };
                                                            }
                                                            this.hinderLoop = false;
                                                            console.log("equal 2");
                                                            return null;
                                                        }]));
        
        this.registerForm = builder.group({
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname,
            password: this.password,
            pw_confirm: this.pw_confirm
        })
    }
    
    
    
    
    
    registerUser(){
        console.log('register');
        
        this.input_firstname = '';
        this.input_lastname = '';
        this.input_password = '';
        this.input_pw_confirm = '';
        this.input_username = '';
        
        return false;
    }
}