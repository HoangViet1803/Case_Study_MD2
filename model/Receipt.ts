import { threadId } from "worker_threads";
import { Service } from "./Service";

export class Receipt {
    protected timeTeceipt: Date = new Date();
    protected totalBill: number;
    constructor(totalBill: number) {
        this.totalBill = totalBill;
    }
    public getTimeReceipt() {
        return this.timeTeceipt
    }
    public setTimeReceipt(timeOff: Date) {
        this.timeTeceipt = timeOff;
    }
    public getTotalBill(): number {
        return this.totalBill
    }
}
