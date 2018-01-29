
export class SurveyUser {
    constructor(email?: string, password?: string, firstname?: string, lastname?: string, username?: string, confirmPassword?: string) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.confirmPassword = confirmPassword;
    }

    email: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname: string;
    username: string;
}