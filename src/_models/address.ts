export class Address {
    town: string;
    postCode: string;
    street?: string;
    country: string;
    houseNo?: string;

    constructor(town: string, postCode: string, street: string, country: string, houseNo: string){
        this.town = town;
        this.postCode = postCode;
        this.street = street;
        this.country = country;
        this.houseNo = houseNo;
    }
}
