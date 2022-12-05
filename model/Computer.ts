import { Service } from "./Service";
let readlineSync = require('readline-sync');
export enum StatusComputer {
    avaiable = 'online',
    disabled = 'offline',
}
export class Computer {
    // protected comID?: number;
    protected nameCom: string;
    protected status: StatusComputer = StatusComputer.disabled;
    protected timeCom: Date = new Date();
    protected price: number;
    protected serviceList: Service[] = [];
    constructor(name: string,price: number, /* id?: number */) {
        this.nameCom = name;
        this.price = price;
        // this.comID = id;
    }
    // public getComID() {
    //     return this.comID;
    // }

    // public setComID(comID: number): void {
    //     this.comID = comID;
    // }
    public getTimeCom() {
        return this.timeCom;
    }
    public setTimeCom(time: Date) {
        this.timeCom = time;
    }
    public getNameCom(): string {
        return this.nameCom;
    }

    public setNameCom(nameCom: string): void {
        this.nameCom = nameCom;
    }

    public getStatus(): StatusComputer {
        return this.status;
    }

    public setStatus(status: StatusComputer): void {
        this.status = status;
    }
    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }
    public getServiceList() {
        return this.serviceList;
    }
    public resetServieList() {
        this.serviceList = [];
    }
    public addServiceToReceipt (service: Service) {
        for (let i = 0; i < this.serviceList.length; i++) {
            if(service.getServiceName() == this.serviceList[i].getServiceName()) {
                this.serviceList[i].addServiceAmount(service.getAmount())
                return
            }
        }
        this.serviceList.push(service);
    }
    public removeServiceFromReceipt (nameService: string, amount: number) {
        for (let i = 0; i < this.serviceList.length; i++) {
            if(this.serviceList[i].getServiceName().trim() !== nameService.trim()) {
                console.log('Không có dịch vụ này');
                return
            } else if(this.serviceList[i].getServiceName().trim() === nameService.trim()) {
                this.serviceList[i].removeServiceAmount(amount);
                if(this.serviceList[i].getAmount() <= 0) {
                    this.serviceList.splice(i,1)
                }
            }
            return
        }
    }
    
    public bill (timeOff: Date) {
        let billService: number = 0
        for (let i = 0; i < this.serviceList.length; i++) {
            billService += this.serviceList[i].calBillService()
        }
        let total = (this.price * ((timeOff.getTime() - this.timeCom.getTime())/1000)) + billService ;
        return total
    }
}