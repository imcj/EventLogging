import TrackingEvent from "./TrackingEvent";

export default class ScrollTrackingEvent extends TrackingEvent {
  scrollX: number;

  scrollY: number;

  constructor(scrollX: number, scrollY: number) {
    super();

    this.scrollX = scrollX;
    this.scrollY = scrollY;

    this.trackingEventType = 'ScrollTrackingEvent';
  }
}
