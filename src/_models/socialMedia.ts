import { ServiceType } from "_enums/serviceTypes";

export class SocialMedia {
    id: number;
    service: ServiceType;
    url: string;

    constructor(service: ServiceType, url: string){
        this.service = service;
        this.url = url;
    }
}