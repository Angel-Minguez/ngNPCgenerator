/****************************************************************************************************************************************/
/*	Module name: register-success-modal.component.ts																					*/
/* 	Module description: Register modal success component, displays the modal with a completion message									*/
/*	Author: Angel Minguez Burillo																										*/
/*	Date: 25/8/2017																														*/
/****************************************************************************************************************************************/
/* Imports */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';				//Component decorator and viewencapsulation metadata atribute
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';				//Modal service
/* Component metadata */
@Component({
	selector: 'app-register-success-modal',											//Html selector tag
	templateUrl: './register-success-modal.component.html',							//Template html file
	encapsulation: ViewEncapsulation.None,											//No css encapsulation
	styleUrls: ['./register-success-modal.component.css']							//CSS file for the component
})
/* Component */
export class RegisterSuccessModalComponent implements OnInit {					
	constructor(public activeModal: NgbActiveModal) { }								//Injection of the ng bootstrap modal service
	/* Close modal method */
	closeModal():void {																
		this.activeModal.close();													//Close method of the ngBootstrap modal service
	}
	ngOnInit() {}																	//OnInit component lifecycle hook
}
