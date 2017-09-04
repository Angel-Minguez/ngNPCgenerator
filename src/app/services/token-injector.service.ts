/****************************************************************************************************************************************/
/*	Module name: token-injector.service.ts																								*/
/* 	Module description: Service for inserting the authentication token in each http request												*/
/*	Author: Angel Minguez Burillo																										*/
/*	Date: 31/8/2017																														*/
/****************************************************************************************************************************************/
/* Imports */
import { Injectable } from '@angular/core';																	//Injectable decorator
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';	//Import Interceptor interface, function HttpHandler, event HttpEvent and response class
import { Observable } from 'rxjs';																			//Observable module 
/* Injectable metadata */
@Injectable()																			
/* Service */
export class TokenInjectorService implements HttpInterceptor {												//Service class implements Iterceptor interface
	constructor() { }
	intercept (req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
		let token = localStorage.getItem('authToken');
		if(token) var authReq = req.clone({ headers: req.headers.set('Authorization', token)});
		else return next.handle(req);
		return next.handle(authReq);
	}
}
