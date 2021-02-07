import TrackingEvent from "./TrackingEvent/TrackingEvent";
import KeepLiveTrackingEvent from "./TrackingEvent/KeepLiveTrackingEvent";
import Watcher from "./Watcher";
import MouseWatcher from "./Watcher/MouseWatcher";
import ScrollWatcher from "./Watcher/ScrollWatcher";
import ExceptionTrackingEvent from "./TrackingEvent/ExceptionEvent";
import LoggingTrackingEvent from "./TrackingEvent/LoggingTrackingEvent";

export default class Track {

  static _instance: Track;

  events: TrackingEvent[];

  watchers: Watcher[] = [];

  private limit: number = 100_000_000;

  private constructor() {
    this.events = [];
  }

  public add(event: TrackingEvent): void {
    this.events.push(event);
  }

  public addBack(events: TrackingEvent[]): void {
    let back = events.concat(this.events);
    if (back.length > this.limit) {
      back = back.slice(-this.limit);
    }
    this.events = back;
  }

  removeAll(addition: any): TrackingEvent[] {
    const copied = this.events;
    this.events = [];

    if (null !== addition) {
      copied.forEach(event => {
        event.addition = addition;
      });
    }

    return copied;
  }

  captureException(error: Error) {
    this.add(new ExceptionTrackingEvent(error.message, "", 0, 0, error, error.stack));
  }

  log(message: string, context: any | null = null) {
    this.add(new LoggingTrackingEvent(message, context))
  }

  async timeout(seconds: number): Promise<void> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000.0)
    });
  }

  static get instance(): Track {
    if (null == Track._instance) {
      Track._instance = new Track();
    }
    return Track._instance;
  }
}
