import Track from "./Track";
import {fetch as fetchPolyfill} from 'whatwg-fetch';
import Options from "./Options";
import MouseWatcher from "./Watcher/MouseWatcher";
import ScrollWatcher from "./Watcher/ScrollWatcher";
import ExceptionWatcher from "./Watcher/ExceptionWatcher";
import KeepLiveWatcher from "./Watcher/KeepLiveWatcher";

export default async function EventLogging(options?: Options|null): Promise<void> {
  console.debug("event logging initializing");
  const track = Track.instance;

  if (options == null) {
    options = {
      url: null,
      watchers: null,
      addition: null,
    }
  }

  options.url = options.url || "/api/event";
  options.watchers = options.watchers || [
      new MouseWatcher(track),
      new ScrollWatcher(track),
      new KeepLiveWatcher(track),
      new ExceptionWatcher(track),
  ];
  track.watchers = options.watchers;

  if (options.listener) {
    options.listener(track);
  }

  while (true) {
    const events = track.removeAll(options.addition);
    if (events.length > 0) {
      const response = await fetchPolyfill(options.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(events)
      });

      if (response.status < 200 || response.status > 299) {
        track.addBack(events);
      }
    }
    await track.timeout(2);
  }
}
