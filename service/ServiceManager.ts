import { Service } from "../model/Service";

export class ServiceManager {
    listServices: Service[] = [];
    constructor(){}
    public getListServices() {
        return this.listServices;
    }
    public addService (newService: Service) {
        for (let i = 0; i < this.listServices.length; i++) {
            if(this.listServices[i].getServiceName().trim() === newService.getServiceName().trim()) {
                this.listServices[i].setServicePrice(newService.getServicePrice())
                return
            }
        }
        this.listServices.push(newService)
    }
    public removeServie (nameService: string) {
        for (let i = 0; i < this.listServices.length; i++) {
            if(this.listServices[i].getServiceName().trim() === nameService) {
                this.listServices.splice(i, 1);
                return
            }
        }
        console.log('Không có dịch vụ này');
        
    }
}
