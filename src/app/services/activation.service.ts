/****************************************************************************************************************************************/
/*	Module name: activation.service.ts																									*/
/* 	Module description: Service to comunicate through components that an account has been activated										*/
/*	Author: Angel Minguez Burillo																										*/
/*	Date: 23/8/2017																														*/
/****************************************************************************************************************************************/
/* Imports */
import { Injectable } from '@angular/core';								//Injectable decorator
import { Observable } from 'rxjs';										//Observable module 
import { Subject } from 'rxjs/Subject';  								//Subject module
/* Injectable metadata */
@Injectable()
/* Service */
export class ActivationService {
	private subject : Subject<string>;									//Subject object, it will emit booleans
	public activationStatus : string;									//Status string: Indicates the state to access the app through the confirmation e-mail link
	/* Constructor */
	constructor() {
		this.subject = new Subject<string>();							//Instanciason of the subject
		this.activationStatus = null;									//Initialization of the status string
	}
	fromValidation(status: string) {									//Method to force the Subject to emit a string value
		this.subject.next(status);										//Subject will emit the parameter passed
		this.activationStatus = status;									//Actualization of the status string
	}
	isFromValidation(): Observable<string> {							//Method to obtain the Observable
		return this.subject.asObservable();								//The subject observable is returned
	}
}
