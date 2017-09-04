/****************************************************************************************************************/
/*	Module name: user.service.ts																				*/
/* 	Module description: Service that keeps and provides the current logged user									*/
/*	Author: Angel Minguez Burillo																				*/
/*	Date: 5/8/2017																								*/
/****************************************************************************************************************/
//Imports
import { Injectable } from '@angular/core';						//Injectable decorator
//Injectable metadata
@Injectable()
//UserService class
export class UserService {										//The service wont use asynchronous access, just simple syncrhornous access through methods
	private user : User;										//User object instance
	//Constructor
	constructor() { 										
		this.user = new User();									//Creation of the new object
	}
	setUser(user?: User): void {								//Setter with an user object or empty argument list
		if (user) this.user = user;								//If an user object is provided that object is assigned to the current user 
		else this.user = new User(); 							//If no argument is provided guest user is assigned
	}
	getUser() : User {											//User getter 
		return this.user;										//Returns an User object 	
	}
}
//Current logged user object, it will hold the info of the current user
export class User implements userJSON{								
	public userName: string;								//Name of the user
	public userCreationTime: Date;							//User creation time
	public userLastLogin: Date;								//Last time the user logged in
	public userMail: string;								//Mail of the user
	private userId: string;									//DatabaseId of the user
	private userPwd: string;								//Hash of the user password
	constructor();											//Empty constructor declaration
	constructor(userName : string);							//Constructor with string parameter
	constructor(arg : userJSON);							//Constructor with a userJSON object
	constructor(arg? : any){								//Constructor implementation
		if (!arg) {											//In case of empty constructor
			this.userName = 'guest';						//Load default values for the rest 
			this.userCreationTime = null;
			this.userLastLogin = null;
			this.userMail = null;
			this.userPwd = null;
			this.userId = null;
		}
		if(typeof arg === 'string') {						//In case of string constructor
			this.userName = arg;							//Use the string as username
			this.userCreationTime = null;					//Load default values
			this.userLastLogin = null;
			this.userMail = null;
			this.userPwd = null;
			this.userId = null;
		}
		if(typeof arg === 'object') {									//In case of JSON constructor
			this.userName = arg.userName;								//Load JSON properties into the User object
			this.userCreationTime = new Date(arg.userCreationTime);
			this.userLastLogin = new Date(arg.userLastLogin);
			this.userMail = arg.userMail;
			this.userId = arg.userId;
			this.userPwd = arg.userPwd;
		}
	}
	getUserName():string{									//User name getter
		return this.userName;
	}
	getUserCreationTime():Date {							//Creation time getter
		return this.userCreationTime;
	}
	getUserLastLogin():Date {								//Last login getter
		return this.userLastLogin;
	}
	getUserMail(): string {									//User e-mail getter
		return this.userMail;
	}
	getUserId ():string {									//User database ID
		return this.userId;
	}
	getUserPwd(): string {									//User password hash
		return this.userPwd;
	}
};
//UserJSON interface, makes the user object compatible with the JSON server response
interface userJSON {
	getUserId() : string;
	getUserPwd() : string;
	userName: string;
	userCreationTime: Date;
	userLastLogin: Date;
	userMail: string;
};
