import TrackingEvent from "./TrackingEvent";

export default class ExceptionTrackingEvent extends TrackingEvent {
    message: Event | string;
    url: string;
    lineNumber: number;
    columnNumber: number;
    error: Error;
    stack: string;
    public constructor(message: Event | string,
                       url: string,
                       lineNumber: number,
                       columnNumber: number,
                       error: Error,
                       stack: string) {
        super();

        this.message = message;
        this.url = url;
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;
        this.error = error;
        this.stack = stack;
        this.trackingEventType = 'ExceptionTrackingEvent';
    }
}
