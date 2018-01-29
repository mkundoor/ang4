// ======================================


// ======================================

export class User {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(id?: string, userName?: string, fullName?: string, email?: string, Title?: string, phoneNumber?: string, roles?: string[]) {

        this.id = id;
        this.userName = userName;
        this.fullName = fullName;
        this.email = email;
        this.Title = Title;
        this.phoneNumber = phoneNumber;
        this.roles = roles;
    }


    get friendlyName(): string {
        let name = this.fullName || this.userName;

        if (this.Title)
            name = this.Title + " " + name;

        return name;
    }


    public id: string;
    public userName: string;
    public fullName: string;
    public email: string;
    public Title: string;
    public phoneNumber: string;
    public isEnabled: boolean;
    public isLockedOut: boolean;
    public roles: string[];
}