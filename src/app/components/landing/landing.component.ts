import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ActivationService } from '../../services/activation.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';						//Ng-Bootstrap alert service for configuring alerts

@Component({
  selector: 'appLanding',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
	constructor(private route : ActivatedRoute,
				private router : Router,
				private activationService : ActivationService) { 
	}
	hideAlert() : void {
		this.activationService.fromValidation(null);
	}
	ngOnInit() {
		this.route.url.subscribe(
			(route)=>{
				if(route.length > 0) {
					if(route[0].path === 'activation') {
						this.route.params.subscribe((param)=>{
							if(param.activationResult === 'success') {
								this.activationService.fromValidation('ACTIVATION_SUCCESS');
								this.router.navigate(['']);
							}
							else if(param.activationResult === 'timeout') {
								this.activationService.fromValidation('ACTIVATION_TIMEOUT');
								this.router.navigate(['']);
							}
							else {
								this.activationService.fromValidation('ACTIVATION_ERROR');
								this.router.navigate(['']);
							}
						});		
					}
				}
			},
			(error)=>{
				console.log(error);
			});
	}
}
