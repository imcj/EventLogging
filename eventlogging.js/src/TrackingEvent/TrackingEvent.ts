import TrackingId from "../TrackingId";

export default class TrackingEvent {
  // @ts-ignore
  created: Date = new Date();

  trackingEventType: string;

  orientationAngle: number;

  orientationType : string;

  screenAvailHeight: number;

  screenAvailWidth: number;

  colorDepth: number;

  screenHeight: number;

  pixelDepth: number;

  screenWidth: number;

  location: string;

  trackingId: TrackingId = new TrackingId();

  addition: any = null;

  public constructor() {
    this.orientationAngle = window.screen.orientation.angle;
    this.orientationType = window.screen.orientation.type;

    this.screenAvailWidth = window.screen.availWidth;
    this.screenAvailHeight = window.screen.availHeight;
    this.colorDepth = window.screen.colorDepth;
    this.screenHeight = window.screen.height;
    this.screenWidth = window.screen.width;
    this.pixelDepth = window.screen.pixelDepth;

    this.location = document.location.href;
  }
}
