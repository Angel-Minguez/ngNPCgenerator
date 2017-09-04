/****************************************************************************************************************************************/
/*	Module name: register-modal.component.ts																							*/
/* 	Module description: Register modal component, displays the modal and retireves the user input then send it to server for validation	*/
/*	Author: Angel Minguez Burillo																										*/
/*	Date: 15/8/2017																														*/
/****************************************************************************************************************************************/
/* Imports */
import { Component, ViewEncapsulation } from '@angular/core';						//Component decorator and viewencapsulation metadata atribute
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';				//Modal service
import { HttpClient } from '@angular/common/http';									//Http module for comunicating with the server
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';						//Ng-Bootstrap alert service for configuring alerts
/* Component metadata */
@Component({
	selector: 'app-register-modal',													//Component selector tag
	providers: [NgbAlertConfig],
	templateUrl: './register-modal.component.html',									//Component template
	encapsulation: ViewEncapsulation.None,											//CSS encapsulation disabled to allow custom window stlye CSS class
	styleUrls: [																	//Array of CSS files for the component
		'./register-modal.component.css',											//Component CSS style file
		'../../shared-styles/forms.css'												//CSS for some shared input elements
	]
})
/* Component */
export class RegisterModalComponent  {
	private model: userRegisterFormModel;											//Model property
	private registerUrl: string;													//Server URL for registering
	private showRegisterResult: boolean;											//Flag to show the registration errors
	private showAlertUser: boolean;													//Flag to show duplicate username errors
	private showAlertMail: boolean;													//Flag to show duplicate mail errors
	private loading : boolean;														//Flag to control the loading bar
	private alertOptions : {														//Options object with options for the alert that shows login results 
		message: string;															//The message displayed by the alert
		type: string;																//The type of alert
		dismiss: boolean;															//True if the alert is dismissible, false otherwise
	};														
	/* Constructor */
	constructor(public activeModal: NgbActiveModal,									//ng-bootstrap modal service injection
				public alertConfig: NgbAlertConfig,									//Ng-Bootstrap alert service for configuring alerts
				private http : HttpClient) { 										//Injection of the http service		 		
		this.model = new userRegisterFormModel();									//Instance creation of the model object
		this.registerUrl = 'https://127.0.0.1:11982/register';						//Registration URL
		this.showRegisterResult = false;											//Initialization of register alert visibility flag
		this.showAlertUser = false;													//Initialization of user alert visibility flag
		this.showAlertMail = false;													//Initialization of mail alert visibility flag
		this.loading = false;														//Initialization of the loading bar with inactive status
		this.alertOptions = {														//Alert options object initialization
			message: '',															//Empty message
			type: 'danger',															//Alert type danger
			dismiss: false															//Alert dismissible
		};
	}
	/* Method to show and config alerts */
	showAlertMessage(alert: string, options) : void {												
		this.hideAlert('all');														//Hides the user and mail alerts
		switch(alert){																//Choice based on alert parameter
			case 'userName': { this.showAlertUser = true;    break;}				//Set to true the flag to show the invalid user alert							
			case 'userMail': { this.showAlertMail = true;    break;}				//Set to true the flag to show the invalid mail alert
			case 'register': { this.showRegisterResult=true; break;}				//Set to true the flag to show the general error alert
		}
		this.alertOptions.message = options.message;								//Assination of the desired message
		this.alertConfig.type = this.alertOptions.type = options.type || 'danger';	//Assignation of the type
		this.alertConfig.dismissible = this.alertOptions.dismiss = options.dismiss;	//Assignation of the dispmissible property	
	}
	/* Method to hide the alert div */
	hideAlert(alert: string): void {
		if(alert == 'register')this.showRegisterResult = false;										//Set to false the flag to show the general error alert
		if(alert == 'user')this.showAlertUser = false;												//Set to false the flag to show the invalid user alert
		if(alert == 'mail')this.showAlertMail = false;												//Set to false the flag to show the invalid mail alert
		if(alert == 'all')this.showAlertUser = this.showRegisterResult =this.showAlertMail = false;	//Set to false the flag to show the invalid mail and user alerts
	}
	/* Register modal close method */
	close(): void {																				
		this.activeModal.dismiss('Dismissed by user');												//Dismisses the modal with a info message
	}
	/* Register modal accept button method */
	accept(): void {
		this.loading = true;																										//Start showing the loading bar
		this.http.post<registerResult>(this.registerUrl, this.model).subscribe(														//XMLHttp post request, it returns an observable with the server response
			(response) => {																											//Response callback
				if(!isRegisterResult(response)) this.showAlertMessage('register', {message:' Bad server response!',dismiss:true});	//Type check on response, if failed it shows an alert message
				else {																												//Response check succeded
					if(response.result) this.activeModal.close({result:response, exit:'SUCCESS'});									//User creation successful, close the modal and informs parent component
					else {																											//Error in user creation process
						console.log(response.error);																				//Debug message with the error returned by the server
						if(response.error.type == 'DUPLICATE_USER') 
							this.showAlertMessage('userName',{message:'Error: User name already exists'});	//User already exists error handler
						if(response.error.type == 'DUPLICATE_MAIL') 
							this.showAlertMessage('userMail',{message:'Error: E-mail already in use'});		//Mail already used error handler
						if(response.error.type == 'REQUEST_FORMAT_ERROR') 
							this.showAlertMessage('register',{message:'Error: '+response.error.message, dismiss:true});		//Server received a bad formatted request
						if(response.error.type == 'USER_CREATION_ERROR') 
							this.showAlertMessage('register',{message:'Error while creating the new user', dismiss:true});	//Database error while creating the new user entry
						if(response.error.type == 'CONNECTION_ERROR') 
							this.showAlertMessage('register',{message:'Cannot connect with server, please try again later', dismiss:true});	//Server did not respond
						if(response.error.type == 'MAIL_TRANSPORT_ERROR') 
							this.showAlertMessage('register',{message:'A problem occurred while sending the confirmation e-mail', dismiss:true});	//Server mail module failed
					}
				}
				this.loading = false;																					//End of load, the loading bar returns to inactive state
			},
			(error) => {																								//Error in XMLHttp post request callback
				this.hideAlert('all');																					//Hide user and mail alerts
				this.showAlertMessage('register', {message:' No server response!', dismiss:true});						//Show general alert with the error message
				this.loading = false;																					//End of load, the loading bar returns to inactive state
			});
	}
}
/* Form data model */
export class userRegisterFormModel {															//Class for store register form input data
	public userName : string;																	//Username
	public userMail : string																	//E-mail
	public userPwd	: string;																	//Password
	public userRepeatPwd: string;																//Remember me checkbox
	constructor(userName?:string, userMail?:string, userPwd?:string, userRepeatPwd?: string){	//Constructor of the user form model
		this.userName = userName || '';															//Initialization of user name property
		this.userMail = userMail || '';															//Initialization of the user mail property
		this.userPwd = userPwd || '';															//Initialization of password property
		this.userRepeatPwd = userRepeatPwd || '';												//Initialization of password confirmation property
	}
}
/* Interface for the server response JSON object */
export interface registerResult {										
	result: boolean;																			//Result will hold a boolean, true if the user creation is sucessfull, false otherwise
	error: {																					//Error subobject
		type: string;																			//Type of the error
		message: string;																		//Description of the error
	};
}
/* Interface for the modal response to parent component */
export interface modalRegisterResult {																	
	result: registerResult;																		//Propagate the server JSON response to parent component
	exit: string;																				//Exit holds a string defining the exit conditions of the modal
}
/* Type guard for registerResult interface */
export function isRegisterResult(arg : Object) : arg is registerResult{							//The guard will return a boolean similar to 'instanceof' operator		
	if((arg as registerResult).result === undefined) return false;								//Check for result property
	if((arg as registerResult).error === undefined) return false;								//Check for error property
	if(	(arg as registerResult).error.type === undefined || 									//Check for error.type property
		(arg as registerResult).error.message === undefined) return false;						//Check for error.message property
	return true;																				//If all checks passed, true is returned
}