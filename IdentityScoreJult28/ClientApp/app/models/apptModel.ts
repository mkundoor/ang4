export class ApptModel {
    constructor(title?: string, start?: Date, end?: Date, apptDate?: Date, location?: string, sid?: number, pid?: number, reserved?: boolean, description?: string) {

        this.title = title;
        this.start = start;
        this.end = end;
        this.apptDate = apptDate;
        this.location = location;
        this.sid = sid;
        this.pid = pid;
        this.reserved = reserved;
        this.description = description;
    }


    public title: string;
    public start: Date;
    public end: Date;
    public id: number;
    public apptDate: Date;
    public location: string;
    public sid: number;
    public pid: number;
    public reserved: boolean;
    public description: string;

}


       

    
