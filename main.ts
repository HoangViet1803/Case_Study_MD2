import { Account } from "./model/Account";
import { Computer, StatusComputer } from "./model/Computer";
import { Receipt } from "./model/Receipt";
import { Service } from "./model/Service";
import { AccountManager } from "./service/AccountManager";
import { ComputerManager } from "./service/ComputerManager";
import { ReceiptManager } from "./service/ReceiptManager";
import { ServiceManager } from "./service/ServiceManager";

let readlineSync = require('readline-sync');
let accountList = new AccountManager;
accountList.addNewAccount(new Account('admin', 'admin123'));
let comManager = new ComputerManager;
let receiptManager = new ReceiptManager;
let receiptList = receiptManager.getListReceipts()
let comList = comManager.getComputerList()
let listServices = new ServiceManager;
listServices.addService(new Service('sting', 10));
listServices.addService(new Service('banhmy', 15));
listServices.addService(new Service('redbull', 15));
function showListServices(list: Service[]) {
    console.log("-----------------------------------------------------------------------");
    console.log(`Index          Tên               Giá/1sp`);
    for (let i = 0; i < list.length; i++) {
    console.log(`${i}.          ${list[i].getServiceName()}               ${list[i].getServicePrice()} `);
    }
    console.log("-----------------------------------------------------------------------");
}

function showMainMenu() {
    console.log(`
    1. Hiển thị danh sách máy có trong quán
    2. Thêm 1 máy mới vào danh sách
    3. Sửa đổi thông tin của máy
    4. Xóa 1 máy khỏi danh sách
    5. Thêm dịch vụ vào máy
    6. Xóa dịch vụ khỏi máy
    7. Bật máy
    8. Tắt máy và tính tiền
    9. Quản lý tài khoản đăng nhập
    10. Quản lý doanh thu
    11. Xem danh sách dịch vụ
    0. Thoát
    `);
}
function validateUserName (newUserName: string) {
    if (newUserName.trim() === ""){
        console.log("Username không được để trống");
        return false
    }
    for (let i = 0; i < accountList.getAccounts().length; i++) {
        if(newUserName.trim() === accountList.getAccounts()[i].getUserName().trim()){
            console.log('Username đã được sử dụng. Vui lòng thao tác lại');
            return false
        }
    }
    return true
}
function validatePassword(newPassword: string, index: number) {
    if (newPassword.trim() === accountList.getAccounts()[index].getPassword()) {
        console.log('New Password mới không được trùng với Password cũ.');
        return false;
    } else if (newPassword.trim() === ""){
        console.log('New Password không được để trống!');
        return false;
    }
    return true
}
function editInfoAccount () {
    let flag = true;
    do {
        let index = +readlineSync.question('Chon index tai khoan muon sua: ');
        if (index < 0 || index >= accountList.getAccounts().length || isNaN(index) === true) {
            console.log('Chỉ chọn index có trong bảng. Vui lòng thao tác lại');
            break;
        }
        console.log(`
        Thông tin tài khoản cũ:
        username: ${accountList.getAccounts()[index].getUserName()}
        password: ${accountList.getAccounts()[index].getPassword()}
        `);
        let newUserName = readlineSync.question("New username: ");
        if (validateUserName(newUserName) === false) {
            break;
        }
        let newPassword = readlineSync.question('New password: ')
        if (validatePassword(newPassword, index) === false) {
            break;
        }
        accountList.getAccounts()[index].setUserName(newUserName);
        accountList.getAccounts()[index].setPassword(newPassword);
        flag = false;
    } while (flag);
}
function coltrolAccountManager () {
    let flag = true;
    do {
        console.log(`
        1. Thêm tài khoản mới
        2. Xóa tài khoản
        3. Sửa tài khoản
        4. Hiện danh sách tài khoản
        0. Thoát
        `);
        let choice = +readlineSync.question('Enter >> ');
        if(isNaN(choice) === true) {
            console.log('Chỉ chọn số có trong menu. Vui lòng thao tác lại');
            break;
        }
        switch(choice) {
            case 0:
                flag = false;
                break;
            case 1:
                let userName = readlineSync.question('Username: ');
                if (validateUserName(userName) === false) {
                    break;
                }
                let password = readlineSync.question('Password: ');
                let newAccount = new Account(userName, password);
                accountList.addNewAccount(newAccount);
                console.table(accountList.getAccounts())
                break;
            case 2:
                if (accountList.getAccounts().length === 0) {
                    console.log('Chưa có tài khoản nào');
                    break;
                }
                console.table(accountList.getAccounts())
                let id = +readlineSync.question('Chon index tai khoan muon xoa: ');
                if (id < 0 || id >= accountList.getAccounts().length || isNaN(id) === true) {
                    console.log('Chỉ chọn index có trong bảng. Vui lòng thao tác lại');
                    break;
                }
                accountList.removeAccount(id);
                if (accountList.getAccounts().length === 0) {
                    console.log('Không có tài khoản nào trong danh sách');
                    break;
                }
                console.table(accountList.getAccounts())
                break;
            case 3:
                if (accountList.getAccounts().length === 0) {
                    console.log('Chưa có tài khoản nào');
                    break;
                }
                console.table(accountList.getAccounts())
                editInfoAccount ();
                console.table(accountList.getAccounts())
                break;
            case 4: 
                if (accountList.getAccounts().length === 0) {
                    console.log('Chưa có tài khoản nào');
                    break;
                }
                console.table(accountList.getAccounts())
                break;
        }
    } while (flag)
}
function turnoverManager() {
    let flag = true;
    do {
        console.log(`
        1. Tổng doanh thu ngày
        2. Tổng doanh thu tháng
        3. Tổng doanh thu năm
        0. Thoát
        `);
        let index = +readlineSync.question('Enter >>');
        if(isNaN(index) === true) {
            console.log('Vui lòng chỉ chọn số có trong menu');
            break;
        }
        switch (index) {
            case 0: 
                flag = false
                break;
            case 1:
                let currentDate = new Date().getDate()
                console.log(`Doanh thu ngày hôm nay: ${receiptManager.totalTurnoverDay(currentDate)}`);
                break;
            case 2:
                let currentMonth = new Date().getMonth()
                console.log(`Doanh thu tháng ${currentMonth + 1} này: ${receiptManager.totalTurnoverMonth(currentMonth)}`);
                break;
            case 3:
                let currentYear = new Date().getFullYear();
                console.log(`Doanh thu năm ${currentYear} này: ${receiptManager.totalTurnoverYear(currentYear)}`);
                break;
            default:
                console.log('Vui lòng chỉ chọn số có trong menu');
        }
    } while (flag)
}
function turnOffAndBill() {
    console.table(listComputerOnline())
    let flag = true;
    do {
        let indexCom = +readlineSync.question('Chon index may muon thanh toan: ');
        if(indexCom < 0 || indexCom >= listComputerOnline().length || isNaN(indexCom) === true){
            console.log('Chỉ chọn index có trong bản. Vui lòng thao tác lại');
            break;
        }
        let serviceList = listComputerOnline()[indexCom].getServiceList();
        let timeOff = new Date()
        let bill = listComputerOnline()[indexCom].bill(timeOff);
        let newReceipt = new Receipt(bill);
        newReceipt.setTimeReceipt(timeOff);
        receiptList.push(newReceipt);
        console.log(`
        --------------------------------------------*** Hóa đơn ***---------------------------------------------------------
        ${timeOff.getDate()} / ${timeOff.getMonth() + 1} / ${timeOff.getFullYear()}
        Tên máy: ${listComputerOnline()[indexCom].getNameCom()}
        Thời gian chơi: ${(timeOff.getTime() - listComputerOnline()[indexCom].getTimeCom().getTime())/1000}`);
        if (serviceList.length > 0) {
            for (let i = 0; i < serviceList.length; i++) {
                console.log(`
        Tên: ${serviceList[i].getServiceName()} - Số lượng: ${serviceList[i].getAmount()} - Đơn giá: ${serviceList[i].getServicePrice()}`)
            }
        }
        console.log(`
        Tổng tiền: ${bill.toFixed(2)}
        --------------------------------------------------------------------------------------------------------------------`);
        listComputerOnline()[indexCom].resetServieList()
        listComputerOnline()[indexCom].setStatus(StatusComputer.disabled);
        flag = false;
        
    } while (flag)
    
}
function controlServiceList(){
    let flag = true;
    do {
        console.log(`
1. Thêm dịch vụ
2. Xóa dịch vụ
0. Thoát
        `);
        let choice = +readlineSync.question("Enter >> ");
        if (isNaN(choice) === true) {
            console.log('Vui lòng chỉ chọn trong menu');
            break;
        }
        switch (choice) {
            case 0:
                flag = false;
                break;
            case 1:
                let nameService = readlineSync.question("Ten dich vu moi: ");
                let priceService = readlineSync.question("Gia 1 sp: ");
                let newService = new Service(nameService, priceService);
                listServices.addService(newService)
                showListServices(listServices.getListServices());
                break;
            case 2:
                let nameServiceRemove = readlineSync.question("Ten dich vu muon xoa: ");
                    listServices.removeServie(nameServiceRemove)
                    showListServices(listServices.getListServices());
                break;
            default:
                console.log("Vui lòng chỉ chọn trong menu");
        }
    } while(flag)
}
function addComputer () {
    let flag = true;
    let name = readlineSync.question("Ten may: ");
    let price: number
    do {
        price = +readlineSync.question("Gia choi 1h: ");
        if (price < 0 || isNaN(price) === true) {
            console.log("Giá chơi 1 giờ phải là số! Vui lòng thao tác lại");
            return
        }
        flag = false
    } while (flag)
    let newComputer = new Computer(name, price)
    comManager.addNewComputer(newComputer)
    console.table(comList);
}
function showComputerInfo() {
    let flagFirst = true;
    do {
        console.log(`
1. Xem thông tin chi tiết máy 
0. Thoát
            `);
            let choice = +readlineSync.question('Enter >> ');
            switch(choice){
                case 1: 
                    let index = +readlineSync.question('Chon index: ');
                    if(index < 0 || index >= comList.length) {
                        console.log('<<<<< Vui lòng chọn index có trong bảng >>>>>');
                        break;
                    }
                    if(comList[index].getStatus() === StatusComputer.disabled) {
                        console.log(`
******************************************************
Tên máy: ${comList[index].getNameCom()}
Trạng thái: ${comList[index].getStatus()}
******************************************************
                        `);
                    } else {
                        let timeCur = new Date();
                        let totalTime = (timeCur.getTime() - comList[index].getTimeCom().getTime())/1000
                        console.log(`
****************************************************************************************
Tên máy: ${comList[index].getNameCom()}
Trạng thái: ${comList[index].getStatus()}
Thời gian chơi: ${totalTime}
                        `)
                        let billService = 0;
                        console.log('Danh sách dịch vụ:');
                        let serviceList = comList[index].getServiceList();
                        for (let i = 0 ; i < serviceList.length ; i++) {
                            console.log(`
Tên: ${serviceList[i].getServiceName()} - Số lượng: ${serviceList[i].getAmount()} - Đơn giá: ${serviceList[i].getServicePrice()}
                            `);
                            billService += serviceList[i].calBillService()
                        }
                        console.log(`
Tổng tiền: ${(comList[index].getPrice() * totalTime  + billService).toFixed(2)}
****************************************************************************************
                        `)}
                    break;
                case 0:
                    flagFirst = false;
                    break;
                default:
                    console.log('Vui lòng chỉ chọn số trong menu');     
            }
    } while (flagFirst)
}
function listComputerOffline () {
    let arr: Computer[] = [];
    comList.forEach(com => {
        if(com.getStatus() === "offline") {
            arr.push(com);
        }
    })
    return arr
}
function listComputerOnline() {
    let arr: Computer[] = [];
    comList.forEach(com => {
        if(com.getStatus() === "online") {
            arr.push(com);
        }
    })
    return arr
}
function openComputer (listOff: Computer[]) {
    let flag = true;
    do {
    let index = +readlineSync.question('Chon index may ban muon bat: ');
    if(index < 0 || index >= listOff.length) {
        console.log('<<<<< Vui lòng chỉ chọn index có trong bảng >>>>>');
    } else {
        listOff[index].setStatus(StatusComputer.avaiable);
        console.log(`*** Bật máy ${listOff[index].getNameCom()} thành công! ***`);
        console.table(comList);
        
        break;
    }
    } while(flag)
    
    // comList[index].setStatus(StatusComputer.avaiable);
    // comList[index].setTimeCom(new Date())
}
function editComputerInfo() {
    let flag = true;
    do {
        console.table(comList)
        console.log(`
1. Sửa tên máy
2. Sửa giá giờ chơi
0. Thoát        
        `);
        let choice = +readlineSync.question('Enter >> ');
        switch (choice) {
            case 1:
                let indexName = +readlineSync.question('Chon index may ban muon sua ten: ');
                if(indexName < 0 || indexName >= comList.length || isNaN(indexName) == true) {
                    console.log('<<<<< Vui lòng chỉ chọn index có trong bảng >>>>>');
                    break;
                } else {
                    let newName = readlineSync.question('Ten moi: ');
                    comList[indexName].setNameCom(newName)
                }
                break;
            case 2: 
                let indexPrice = +readlineSync.question('Chon index may ban muon sua gia: ');
                if(indexPrice < 0 || indexPrice >= comList.length || isNaN(indexPrice) == true) {
                    console.log('<<<<< Vui lòng chỉ chọn index có trong bảng >>>>>');
                    break;
                } else {
                    let newPrice = +readlineSync.question('Gia moi: ');
                    comList[indexPrice].setPrice(newPrice)
                }
                break;
            case 0:
                flag = false;
                break;
            default:
                console.log('<<<<< Vui lòng chỉ chọn số có trong menu >>>>>');
        }
    } while (flag)
}
function removeServiceFromCom(){
    let flag = true;
    do{
        let indexCom = +readlineSync.question('Chon index may ban muon xoa dich vu >>');
        if(indexCom < 0 || indexCom >= comList.length || isNaN(indexCom) === true) {
            console.log("Vui lòng chỉ chọn index có trong bảng. Hãy thao tác lại!");
            break;
        }
        if (comList[indexCom].getServiceList().length === 0) {
            console.log("Máy này chưa có dịch vụ nào!");
            break;
        }
        console.log(`
****************************************************************************************
Tên máy: ${comList[indexCom].getNameCom()}
Trạng thái: ${comList[indexCom].getStatus()}
                        `)
        console.log('Danh sách dịch vụ:');
        let serviceList = comList[indexCom].getServiceList();
        for (let i = 0 ; i < serviceList.length ; i++) {
        console.log(`
Tên: ${serviceList[i].getServiceName()} - Số lượng: ${serviceList[i].getAmount()} - Đơn giá: ${serviceList[i].getServicePrice()}
        `);
        }
        console.log(`
****************************************************************************************`);
        let nameServiceRemove = readlineSync.question('Ten dich vu muon xoa: ');
        let amount = +readlineSync.question("So luong muon xoa: ");
        if(amount < 0 || isNaN(amount) === true) {
            console.log('Số lượng phải là số. Vui lòng thao tác lại');
            break;
        }
        comList[indexCom].removeServiceFromReceipt(nameServiceRemove, amount);
        flag = false;
    } while(flag)
}
function addServiceToCom () {
    let flag = true;
    do {
        let indexCom = +readlineSync.question('Chon index may ban muon them dich vu >>');
        if(indexCom < 0 || indexCom >= comList.length || isNaN(indexCom) === true) {
            console.log("Vui lòng chỉ chọn index có trong bảng. Hãy thao tác lại!");
            break;
        }
        showListServices(listServices.getListServices());
        let indexService = +readlineSync.question('Chon index dich vu ban muon them vao may:');
        if(indexService < 0 || indexService >= listServices.getListServices().length || isNaN(indexService) === true) {
            console.log("Vui lòng chỉ chọn index có trong bảng. Hãy thao tác lại!");
            break;
        }
        let amount = +readlineSync.question('So luong: ');
        if( amount < 0 || isNaN(amount) === true) {
            console.log('<<<<< Số lượng phải là số! >>>>>');
            console.log("Vui lòng thao tác lại!");
            break
        }
        let nameService = listServices.getListServices()[indexService].getServiceName();
        let priceService = listServices.getListServices()[indexService].getServicePrice()
        let newService = new Service(nameService, priceService);
        newService.setAmount(amount)
        comList[indexCom].addServiceToReceipt(newService);
        console.table(comList)
        flag = false
    } while (flag)
}
function main () {
    console.log('Login:');
    let userName = readlineSync.question("Username: ")
    let password = readlineSync.question("Password: ")
    if (userName.trim() === accountList.getAccounts()[0].getUserName() && password.trim() === accountList.getAccounts()[0].getPassword()) {
        let flag = true;
        do {
        showMainMenu();
        let choice = +readlineSync.question('Enter >> ');
        switch(choice) {
            case 1:
                if(comList.length === 0) {
                    console.log('<<<<< Chưa có máy nào trong danh sách! >>>>>');
                    break;
                }
                console.table(comList)
                showComputerInfo()
                break;
            case 2:
                addComputer();
                break;
            case 3:
                editComputerInfo();
                console.table(comList);
                break;
            case 4:
                if(comList.length === 0) {
                    console.log('<<<<< Chưa có máy nào trong danh sách! >>>>>');
                    break;
                }
                console.table(comList);
                let index = +readlineSync.question('Enter index >> ')
                if(index < 0 || index >= comList.length || isNaN(index) === true) {
                    console.log('<<<<< Vui lòng chỉ chọn index có trong bảng >>>>>');
                    break;
                }
                comManager.removeComputer(index)
                console.table(comList)
                break;
            case 5:
                if(listComputerOnline().length === 0) {
                    console.log('Chưa có máy nào được bật. Hãy bật máy trước khi thêm các dịch vụ!');
                    break;
                } else {
                    console.table(listComputerOnline());
                    addServiceToCom ();
                }
                break;
            case 6:
                if(listComputerOnline().length === 0) {
                    console.log('Chưa có máy nào được bật!');
                    break;
                } else {
                    console.table(listComputerOnline());
                    removeServiceFromCom()
                }
                break;
            case 7:
                let listOff = listComputerOffline();
                if(listOff.length === 0) {
                    console.log('Tất cả các máy đã được bật');
                    break;
                }
                console.table(listOff);
                openComputer(listOff);
                break;
            case 8:
                turnOffAndBill()
                break;
            case 9:
                coltrolAccountManager ()
                break;
            case 10:
                turnoverManager()
                break;
            case 11:
                showListServices(listServices.getListServices());
                controlServiceList()
                break;
            case 0:
                    console.log('>>>>>>>>>>>>>>>>>>> Đã thoát chương trình <<<<<<<<<<<<<<<<<<<<<<<<');
                    flag = false
                    break;
                default:
                    console.log('Vui lòng chỉ chọn số trong memu');                
        }
        } while (flag)
    } else {
        console.log('Tên tài khoản hoặc mật khẩu sai!');
        main()
    }
}
main()