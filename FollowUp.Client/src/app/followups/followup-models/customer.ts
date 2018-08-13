export class Customer{
    ContactId : string;
    CustomerName: string;
    CustomerSourceAddress: string;
    CustomerDestAddress: string = "abc@gmail.com";
    CustomerNumber: string;

    constructor(contactId: string, customerName: string, customerAddress: string, customerNumber: string, customerDestAddress:string){
            this.ContactId = contactId;
            this.CustomerName = customerName;
            this.CustomerSourceAddress = customerAddress;
            this.CustomerNumber = customerNumber;
            this.CustomerDestAddress = customerDestAddress;
    }
}