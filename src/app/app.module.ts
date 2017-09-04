/****************************************************************************************/
/*	Module name: app.module.ts															*/
/* 	Moduke description: Angular application root module									*/
/*	Author: Angel Minguez Burillo														*/
/*	Date: 4/8/2017																		*/
/****************************************************************************************/
const appRoutes:Routes = [
	{path:'', component: LandingComponent},
	{path:'activation/:activationResult',component: LandingComponent }
];
//Imports
import { BrowserModule } from '@angular/platform-browser';							//The ng module for the browser
import { NgModule } from '@angular/core';											//Ng module decorator and metadata
import { FormsModule } from '@angular/forms';										//Ng module for form manipulation
import { HttpClientModule } from '@angular/common/http';							//Ng module for http protocol comunication
import { RouterModule, Routes } from '@angular/router';								//Router module for navigation inside the application
import { AppComponent } from './app.component';										//Application root component
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';								//ng-bootstrap module
import { AppNavComponent } from './components/app-nav/app-nav.component';			//Navigation component
import { LandingComponent } from './components/landing/landing.component';			//Landing component
import { LoginComponent } from './components/login/login.component';				//Component for login interface
import { RegisterModalComponent } from './components/register-modal/register-modal.component';							//Modal dialog component for registering users
import { LoginModalComponent } from './components/login-modal/login-modal.component'									//Modal dialog component for login								
import { RecoveryModalComponent } from './components/recovery-modal/recovery-modal.component';							//Modal dialog component for password recovery
import { RegisterSuccessModalComponent } from './components/register-success-modal/register-success-modal.component'; 	//Modal dialog component with sucessfull registration message
import { UserService } from './services/user.service';																	//Service to keep track of the current logged user
import { ActivationService } from './services/activation.service';														//Service that triggers login component login modal	upon account activation
import { HTTP_INTERCEPTORS } from '@angular/common/http';																//Array of interceptor services to wich JWT interceptor will be added
import { TokenInjectorService } from './services/token-injector.service';												//Token injection interceptor 								
//Module metadata
@NgModule({													//Module decorator
	declarations: [											//Declarations: components declared into the module
		AppComponent, 										//Root component
		AppNavComponent, 									//Navigation component
		LandingComponent, 									//Landing component
		LoginComponent, 									//Component for login interface
		LoginModalComponent, 								//Modal dialog component for login
		RecoveryModalComponent, 							//Modal dialog component for password recovery
		RegisterModalComponent, 							//Modal dialog component for registering users
		RegisterSuccessModalComponent 						//Modal dialog component with sucessfull registration message
	],
	entryComponents:[										//Modules loaded dynamically
		LoginModalComponent,								//Login modal component
		RecoveryModalComponent,								//Recovery modal component
		RegisterModalComponent	,							//Register modal component
		RegisterSuccessModalComponent						//Modal dialog component with sucessfull registration message
	],
	imports: [												//Imports of dependencies and other modules
		BrowserModule,										//The ng module for the browser
		FormsModule,										//Ng module for form manipulation
		HttpClientModule,									//Ng module for http protocol comunication
		RouterModule.forRoot(appRoutes),					//Router module for navigation inside the application
		NgbModule.forRoot()									//ng-bootstrap module, forRoot function deploys all bootstrap modules
	],
	providers: [											//Services provided
		UserService,										//Service to keep track of the current logged user
		ActivationService,									//Service that triggers login component login modal	upon account activation
		{ 	provide:HTTP_INTERCEPTORS,						//Array of interceptors used by the http module
			useClass: TokenInjectorService,					//Add the token injection interceptor
			multi: true										//Flag indicating this is an array of services instead a single one
		}
	],										
	bootstrap: [AppComponent]								//Link this component to the launch of the app 
})
export class AppModule { }
