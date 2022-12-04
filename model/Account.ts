export class Account {
    protected userName: string;
    protected password: string;
    constructor (userName: string, password: string,  ) {
        this.userName = userName;
        this.password = password;
    }
    
    public getUserName(): string {
        return this.userName;
    }

    public setUserName(userName: string): void {
        this.userName = userName;
    }
    public getPassword(): string {
        return this.password;
    }
    public setPassword(password: string): void {
        this.password = password;
    }
}


