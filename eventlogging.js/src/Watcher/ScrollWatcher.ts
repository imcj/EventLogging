import Track from "../Track";
import ScrollTrackingEvent from "../TrackingEvent/ScrollTrackingEvent";
import Watcher from "../Watcher";

export default class ScrollWatcher extends Watcher {

  public constructor(track: Track) {
    super();

    document.addEventListener('scroll', (e) => {
      const trackingEvent = new ScrollTrackingEvent(window.scrollX, window.scrollY);
      track.add(trackingEvent);
    });
  }
}
