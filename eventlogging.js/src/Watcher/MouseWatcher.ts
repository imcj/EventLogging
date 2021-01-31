import Track from "../Track";
import MouseTrackingEvent from "../TrackingEvent/MouseTrackingEvent";
import Watcher from "../Watcher";

export default class MouseWatcher extends Watcher {
  public constructor(track: Track) {
    super();

    document.addEventListener('mousemove', function(e: MouseEvent) {
      const trackingEvent = new MouseTrackingEvent(e.x, e.y, "move");
      track.add(trackingEvent);
    });

    document.addEventListener('mouseup', function(e: MouseEvent) {
      track.add(new MouseTrackingEvent(e.x, e.y, "up"));
    });

    document.addEventListener('mouseup', function(e: MouseEvent) {
      track.add(new MouseTrackingEvent(e.x, e.y, "down"));
    });
  }
}
