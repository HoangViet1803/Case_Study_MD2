import { Account } from "../model/Account";

export class AccountManager {
    protected accList: Account[] = [];
    constructor() {}
    public getAccounts(): Account[] {
        return this.accList;
    }
    public addNewAccount(newAccount: Account) {
        let flag = true;
        for (let i = 0; i < this.accList.length; i++) {
            if(this.accList[i].getUserName() === newAccount.getUserName()) {
                console.log('User đã tồn tại, vui lòng chọn tên khác!');
                flag = false;
                break;
            } 
        }
        if(flag) {
            this.accList.push(newAccount);
        }    
    }
    public removeAccount (index: number) {
            this.accList.splice(index, 1)
    }
    
}