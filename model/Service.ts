export class Service {
    protected serviceName: string;
    protected servicePrice: number;
    protected amount: number = 0;
    constructor (name: string, price: number) {
        this.serviceName = name;
        this.servicePrice = price;
    }
    public getServiceName(): string {
        return this.serviceName;
    }

    public setServiceName(serviceName: string): void {
        this.serviceName = serviceName;
    }

    public getServicePrice(): number {
        return this.servicePrice;
    }

    public setServicePrice(servicePrice: number): void {
        this.servicePrice = servicePrice;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }
    addServiceAmount(amount: number) {
        this.amount += amount;
    }
    removeServiceAmount(amount: number) {
        this.amount -= amount;
        if(this.amount < 0) {
            this.amount = 0
        }
    }
    public calBillService(): number {
        return this.amount * this.servicePrice
    }
}