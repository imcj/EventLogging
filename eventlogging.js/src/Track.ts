import TrackingEvent from "./TrackingEvent/TrackingEvent";
import KeepLiveTrackingEvent from "./TrackingEvent/KeepLiveTrackingEvent";
import Watcher from "./Watcher";
import MouseWatcher from "./Watcher/MouseWatcher";
import ScrollWatcher from "./Watcher/ScrollWatcher";

export default class Track {

  static _instance: Track;

  events: TrackingEvent[];

  watchers: Watcher[] = [new MouseWatcher(this), new ScrollWatcher(this)];

  private constructor() {
    this.events = [];

    setInterval(() => {
      this.events.push(new KeepLiveTrackingEvent());
    }, 500);
  }

  public add(event: TrackingEvent): void {
    this.events.push(event);
  }

  removeAll(): TrackingEvent[] {
    const copied = this.events;
    this.events = [];

    return copied;
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
