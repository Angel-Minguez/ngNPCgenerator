/****************************************************************************************************************************************/
/*	Module name: login-modal.component.ts																								*/
/* 	Module description: Login modal component, displays the modal and retireves the user input then send it to server for validation	*/
/*	Author: Angel Minguez Burillo																										*/
/*	Date: 5/8/2017																														*/
/****************************************************************************************************************************************/
/* Imports */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';				//Component decorator and viewencapsulation metadata atribute
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';				//Modal service
import { HttpClient } from '@angular/common/http';									//Http module for comunicating with the server
import { ActivationService } from '../../services/activation.service';
import { UserService, User } from '../../services/user.service';
/* Component metadata */
@Component({
	selector: 'ngbd-modal-content',													//Component selector tag
	templateUrl: './login-modal.component.html', 									//Component template
	encapsulation: ViewEncapsulation.None,											//CSS encapsulation disabled to allow custom window stlye CSS class
	styleUrls:[																		//Array of CSS files for the component
		'./login-modal.component.css',												//Component CSS style file
		'./custom-checkbox.css',													//CSS for the custom checkbox
		'../../shared-styles/forms.css'												//CSS for some shared input elements
	]										
})
/* Component class */
export class LoginModalComponent implements OnInit {
	private loginUrl: string;														//String that holds the url for the login request
	private model : userLoginFormModel;												//ng-model of the data on the form
	private showLoginResult: boolean;												//Flag to render or not the result alert
	private showActivationMessage : boolean;										//Activation message visibility flag
	private loading : boolean;														//Flag to represent the loading status
	private alertOptions : {														//Options object with options for the alert that shows login results
		message: string;															//The message displayed by the alert
		type: string;																//The type of alert
		dismiss: boolean;															//True if the alert is dismissible, false otherwise
	};
	/* Contructor */
	constructor(public activeModal: NgbActiveModal,									//ng-bootstrap modal service injection
				private activationService : ActivationService,
				private http : HttpClient) {										//Injection of the http service		 																		
		this.model = new userLoginFormModel();										//Instance creation of the model object
		this.loginUrl = 'https://127.0.0.1:11982/login';							//Initialization of login server url
		this.showLoginResult = false;												//Flag for alert visibility
		this.showActivationMessage = false;											//Initialization of the activation message to hidden
		this.loading = false;														//Initialization of the loading flag to inactive status
		this.alertOptions = {														//Alert options object initialization
			message: '',															//Empty message
			type: 'danger',															//Alert type danger
			dismiss: true															//Alert dismissible
		};
	}								
	/* Method to display the alert with the login results */
	showAlertMessage(options) : void {												
		this.alertOptions.message = options.message;								//Assination of the desired message
		this.alertOptions.type = options.type || 'danger';							//Assignation of the type
		this.alertOptions.dismiss = options.dismiss || true;						//Assignation of the dispmissible property
		this.showLoginResult=true;													//Set to true the flag to show the alert
	}
	/* Method to hide the alert div */
	hideAlert(): void {
		this.showLoginResult = false;												//Set to false the flag to show the alert	
	}
	/* Password recovery modal launch method */
	recoveryModal(){
		this.activeModal.close({result:{result:false,error:'N/A'},exit:'RECOVERY'});//Close the login modal and send a signal to parent component to open recovery modal
	}
	/* Method for closing the modal, cancelling it */
	close(): void {	
		this.activeModal.dismiss('Dismissed by user');								//Dismisses the modal with a info message
	}
	/* Submit login info method */
	accept() :void {																					//Accept modal info method
		this.loading = true;																			//Set the load flag to true to show the active load bar
		this.http.post<loginResult>(this.loginUrl, this.model).subscribe(								//XMLHttp post request, it returns an observable with the server response
			(response) => {																				//Response callback
				if(isLoginResult(response)){															//Check for validity of the response
					if(response.success)this.activeModal.close({modalResult:response, exit:'SUBMIT'});	//User found: modal is closed and response passed as promise to parent component
					else this.showAlertMessage({message:' Username or password are incorrect.'});		//User not found: alert message launched
				}
				else this.showAlertMessage({message:' Error, server bad response.'});				//Server response is invalid, a proper alert message is displayed
				this.loading = false;																//Set the load flag to false to return the load bar to inactive status
			},
			(error) => {
				this.showAlertMessage({message:' Error, no server response.'});						//If an error in the comunication with server happens an alert is shown
				this.loading = false;																//Set the load flag to false to return the load bar to inactive status
			}			
		);
	}
	ngOnInit() {																					//OnInit life cycle hook
		if(this.activationService.activationStatus=='ACTIVATION_SUCCESS') {
			this.showActivationMessage = true;										//Capture the status of the flag indicating request came from /activation
		}
	}	
}
/* Form data model */
export class userLoginFormModel {													//Class for store form input data
	public	userName : string;														//Username
	public	userPwd	: string;														//Password
	public	rememberFlag: boolean;													//Remember me checkbox
	constructor(userName?:string, userPwd?:string, rememberFlag?:boolean){			//Constructor of the user form model
		this.userName = userName || '';												//Initialization of user name property
		this.userPwd = userPwd || '';												//Initialization of password property
		this.rememberFlag = rememberFlag || false;									//Initialization of remember me flag property
	}
}
/* Definition of the interface that represents the server response */
export interface loginResult {														//Info returned from server upon login submission
	success : boolean;																//Result will be true if the user is found, false otherwise
	user: User;																		//User object, sent by the server if login is correct
	token: string;																	//Authentication jwt token
	error: string;																	//If result is false error will hold a description of the problem
}
/* Definition of the interface that represents the modal close info */
export interface modalLoginResult {													//Info returned from login modal
	modalResult : loginResult;														//Server response
	exit: string;																	//String for exit mode description				
}
/* Custom type guard for the server response */
export function isLoginResult(arg: Object): arg is loginResult {					//Exported aswell to provide other components with it
   if ((arg as loginResult).success === undefined || 								//Checks that the argument has the error and result properties
		(arg as loginResult).error === undefined ||
		(arg as loginResult).user === undefined) return false;						
   else return true;																//The guard returns a boolean is the type is correct
}