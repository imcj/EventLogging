import Track from "../Track";
import MouseTrackingEvent from "../TrackingEvent/MouseTrackingEvent";
import Watcher from "../Watcher";
import ExceptionTrackingEvent from "../TrackingEvent/ExceptionEvent";
import KeepLiveTrackingEvent from "../TrackingEvent/KeepLiveTrackingEvent";

export default class KeepLiveWatcher extends Watcher {
    public constructor(track: Track) {
        super();

        setInterval(() => {
            track.add(new KeepLiveTrackingEvent());
        }, 500);
    }
}
