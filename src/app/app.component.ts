/****************************************************************************************/
/*	Module name: app.component.ts														*/
/* 	Module description: Angular application root component								*/
/*	Author: Angel Minguez Burillo														*/
/*	Date: 4/8/2017																		*/
/****************************************************************************************/
//Imports
import { Component } from '@angular/core';									//Main component for root module
import { RouterOutlet } from '@angular/router';								//Router outlet component
//Component metadata
@Component({
	selector: 'app',														//Selector tag
	templateUrl: './app.component.html',									//Html file containing the component template
	styleUrls: ['./app.component.css']										//CSS file for the template
})
//Component class
export class AppComponent {										
}
