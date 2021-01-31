export default class TrackingId extends Object {
  trackingId: string;

  public constructor() {
    super();

    let trackingId = localStorage.getItem('__tracking_id');
    if (null == trackingId) {
      trackingId = Math.random().toString();
      localStorage.setItem('__tracking_id', trackingId);
    }

    this.trackingId = trackingId;
  }

  toString(): string {
    return this.trackingId;
  }
}
