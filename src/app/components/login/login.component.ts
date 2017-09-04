/********************************************************************************************************************************/
/*	Module name: login.component.ts																								*/
/* 	Module description: Login logic component, it manages register and login modals and sets the current user and auth token	*/
/*	Author: Angel Minguez Burillo																								*/
/*	Date: 5/8/2017																												*/
/********************************************************************************************************************************/
//Imports
import { Component, OnInit } from '@angular/core';														//Component decorator and OnInit lifecycle hook
import { UserService } from '../../services/user.service';												//Service that keeps and provides the current logged user
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';													//Modal service
import { ActivationService } from '../../services/activation.service';
import { RecoveryModalComponent } from '../recovery-modal/recovery-modal.component';					//Recovery modal component
import { RegisterSuccessModalComponent } from '../register-success-modal/register-success-modal.component';					//Recovery modal component
import { LoginModalComponent, 																			//Login modal component
		loginResult, 																					//Server response to login request
		isLoginResult, 																					//Typeguard for the server response
		modalLoginResult} from '../login-modal/login-modal.component';									//Type for login modal comunication with this component
import { RegisterModalComponent, 																		//Register modal component
		registerResult, 																				//Server response to registration request
		isRegisterResult,																				//Typeguard for the server response
		modalRegisterResult } from '../register-modal/register-modal.component';						//Type for register modal comunication with this component
//Component metadata
@Component({
	selector: 'appLogin',																				//Selector tag
	templateUrl: './login.component.html',																//Html file containing the component template
	styleUrls: ['./login.component.css'],																//CSS file for the template
})
//Component class
export class LoginComponent implements OnInit {																								
	/* Constructor */
	constructor(private userService : UserService,														//Injection of user service
				private activationService : ActivationService,											//Injection of account activation status service
				private modalService: NgbModal) {}														//Injection of ng-bootstrap modal service
	/* Open the login modal dialog captures its response and log in the user */
	openLoginModal(): void {									
		const modalRef = this.modalService.open(LoginModalComponent, {windowClass:'app-modal'});		//Ng-bootstrap open method, with custom style class
		modalRef.result.then(																			//The result property contains a promise with the result of the modal
			(result : modalLoginResult)=>{																//Callback with the login modal results
				if(result.exit === 'RECOVERY') this.openRecovery(); 									//Opens the recovery modal
				if(result.exit === 'SUBMIT' && result.modalResult.success) {							//Successful login
					localStorage.setItem('authToken', result.modalResult.token);						//Stores the authentication token in the local storage
					this.userService.setUser(result.modalResult.user);									//Sets the current user with the user retrieved from the login modal
				}
			},
			(reason : string)=>{this.activationService.fromValidation(null);});							//Modal dismission callback, reset the activation status
	}
	/* Log out method */
	logOut():void {
		localStorage.removeItem('authToken');															//Delete the token in the local storage
		this.userService.setUser();																		//Sets the current user through the user service to 'guest'
	}
	/* Open registration modal and shows a registration success modal if registration succeded */
	openRegisterModal(): void{
		const modalRef = this.modalService.open(RegisterModalComponent, {windowClass:'app-modal'});		//Ng-bootstrap open method, with custom style class
		modalRef.result.then(																			//The result property contains a promise with the result of the modal
			(result : modalRegisterResult)=>{															//Callback with the registration modal results
				if(result.exit == 'SUCCESS') this.openRegisterSuccess();								//If the registration modal succeded registering the user it launchs a confirmation modal
				else console.log(result);																//If it failed, something wrong happened, it shows a debug message
			},
			(reason: string)=>{console.log(reason);});													//Registration modal dismiss handler, shows a message with the reason
	}
	/* Open a success message modal upon registration */
	openRegisterSuccess():void {
		const registerSuccessModalRef = this.modalService.open(RegisterSuccessModalComponent, {windowClass:'app-modal'});	//Ng-bootstrap open method, with custom style class
		registerSuccessModalRef.result.then(																				//The result property contains a promise with the result of the modal
			(result)=>{},																									//This modal doesnt send back any info
			(error)=>{ console.log(error);});																				//If an error is thrown
	}
	openRecovery():void {
		const recoveryModalRef = this.modalService.open(RecoveryModalComponent, {windowClass:'recovery-modal'});
		recoveryModalRef.result.then(
			(result)=>{},
			(error)=>{}
			);
	}
	ngOnInit() {
		this.activationService.isFromValidation().subscribe(
			(response)=> {if (response=='ACTIVATION_SUCCESS') setTimeout(()=>{this.openLoginModal();},0);}
		);
	}
}