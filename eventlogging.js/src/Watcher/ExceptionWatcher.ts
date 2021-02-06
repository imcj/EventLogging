import Track from "../Track";
import MouseTrackingEvent from "../TrackingEvent/MouseTrackingEvent";
import Watcher from "../Watcher";
import ExceptionTrackingEvent from "../TrackingEvent/ExceptionEvent";

export default class ExceptionWatcher extends Watcher {
    public constructor(track: Track) {
        super();

        window.onload = function() {
            window.onerror = function (msg, url, lineNo, columnNo, error) {
                if (null == error) {
                    return false;
                }
                track.add(new ExceptionTrackingEvent(msg, url, lineNo, columnNo, error, error.stack));
                return false;
            }
        }
    }
}
