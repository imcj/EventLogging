import TrackingEvent from "./TrackingEvent";

export default class LoggingTrackingEvent extends TrackingEvent {
    message: string;

    context: any|null;

    public constructor(message: string, context: any|null) {
        super();

        this.message = message;
        this.context = context;
        this.trackingEventType = 'LoggingTrackingEvent';
    }
}
