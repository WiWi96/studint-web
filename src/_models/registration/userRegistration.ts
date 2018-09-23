import { Address } from "../address";
export class UserRegistration {
    name: string;
    surname: string;
    email: string;
    password: string;


    constructor(name: string, surname: string, email: string, password: string){
        this.email = email;
        this.surname = surname;
        this.name = name;
        this.password = password;
    }


}