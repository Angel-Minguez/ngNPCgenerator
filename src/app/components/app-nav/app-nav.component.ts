/****************************************************************************************/
/*	Module name: app-nav.component.ts													*/
/* 	Module description: Main menu component												*/
/*	Author: Angel Minguez Burillo														*/
/*	Date: 4/8/2017																		*/
/****************************************************************************************/
//Imports
import { Component, OnInit } from '@angular/core';						//Component decorator and OnInit lifecycle hook
//Component metadata
@Component({
	selector: 'appNav',													//Selector tag
	templateUrl: './app-nav.component.html',							//Html file containing the component template
	styleUrls: ['./app-nav.component.css']								//CSS file for the template
})
//Component class
export class AppNavComponent implements OnInit {
	constructor() { }
	ngOnInit() {}
}
