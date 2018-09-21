import { Address } from "../address";
export class Registration {
    email: string;
    password: string;
    name: string;
    address: Address;


    constructor(email: string, password: string, name: string, address: Address){
        this.email = email;
        this.password = password;
        this.name = name;
        this.address = address;
    }


}