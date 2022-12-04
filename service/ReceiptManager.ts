import { Receipt } from "../model/Receipt";

export class ReceiptManager {
    protected listReceipts: Receipt[] = []
    constructor() {}
    public getListReceipts() {
        return this.listReceipts
    }
    public addReceiptToList(receipt: Receipt) {
        this.listReceipts.push(receipt);
    }
    public totalTurnover(){
        let sum = 0;
        this.listReceipts.forEach(receipt => {
            sum += receipt.getTotalBill()
        })
        return sum

    }
    public totalTurnoverDay(date: number) {
        let sum = 0;
        this.listReceipts.forEach(receipt =>{
            if(receipt.getTimeReceipt().getDate() === date) {
                sum += receipt.getTotalBill()
            }
        })
        return sum
    }
    public totalTurnoverMonth( month: number) {
        let sum = 0;
        this.listReceipts.forEach(receipt => {
            if (receipt.getTimeReceipt().getMonth() === month) {
                sum += receipt.getTotalBill()
            }

        })
        return sum
    }
    public totalTurnoverYear( year: number) {
        let sum = 0;
        this.listReceipts.forEach(receipt => {
            if (receipt.getTimeReceipt().getFullYear() === year) {
                sum += receipt.getTotalBill()
            }
        })
        return sum
    }
}
