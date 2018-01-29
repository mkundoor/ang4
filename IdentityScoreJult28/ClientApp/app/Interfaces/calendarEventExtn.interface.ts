import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';

export interface CalendarEventExtension extends CalendarEvent
{
     eventId : number;
     startTime: string;
     endTime: string;
     location: string;
     sid: number;
     description: string;
 
}

export interface CalendarEventTimesChangedEventExtn extends CalendarEventTimesChangedEvent
{
    event: CalendarEventExtension;
}