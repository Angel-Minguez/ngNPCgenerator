import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[takenName]',
  providers:[{provide:NG_VALIDATORS, useExisting:TakenNameDirective, multi:true}]
})
export class TakenNameDirective implements Validator {
	@Input('takenName')  takenName : string;
	constructor() { }
	validate(control: AbstractControl): {[key: string]: any} {
		console.log(this.takenName);
		console.log(control.value);
		if(control.value === this.takenName) return {error:'NAME_TAKEN'};
		else return null;
	}
}
