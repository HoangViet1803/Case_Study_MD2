import { Computer } from "../model/Computer";

export class ComputerManager {
    protected computerList: Computer[] = [];
    constructor() {}
    public getComputerList(): Computer[] {
        return this.computerList;
    }
    public addNewComputer(newComputer: Computer) {
        let flag = true;
        for (let i = 0; i < this.computerList.length; i++) {
            if(this.computerList[i].getNameCom() === newComputer.getNameCom()) {
                console.log("<<<<< Tên máy đã tồn tại, vui lòng đổi tên khác >>>>>");
                flag = false;0
                break;
            } 
        }
        if(flag) {
            this.computerList.push(newComputer);
            console.log('*** Thêm máy mới thành công ***');
            // for(let i = 0; i < this.computerList.length; ++i) {
            //     this.computerList[i].setComID(i)
            // }
        }
        
    }
    public removeComputer (index: number) {
            this.computerList.splice(index, 1)
    }
}