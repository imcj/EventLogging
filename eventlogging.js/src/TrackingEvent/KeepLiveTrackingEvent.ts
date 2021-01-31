import TrackingEvent from "./TrackingEvent";

export default class KeepLiveTrackingEvent extends TrackingEvent {
  public constructor() {
    super();

    this.trackingEventType = 'KeepLiveTrackingEvent';
  }
}
