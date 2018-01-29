export class EventModel {


    constructor(eventId?: number, title?: string, start?: string, end?: string, location?: string, sid?: number, description?: string) {
        this.eventId = eventId;
        this.title = title;
        this.start = start;
        this.end = end;
        this.location = location;
        this.sid = sid;
        this.description = description;
    }

    public eventId: number;
    public title: string;
    public start: string;
    public end: string;
    public location: string;
    public sid: number;
    public description: string;
}