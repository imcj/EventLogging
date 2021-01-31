import TrackingEvent from "./TrackingEvent";

export default class MouseTrackingEvent extends TrackingEvent {
  x: number;

  y: number;

  mouseTrackingEventType: string;

  public constructor(x: number, y: number, type: string) {
    super();

    this.x = x;
    this.y = y;
    this.mouseTrackingEventType = type;
    this.trackingEventType = 'MouseTrackingEvent';
  }
}
