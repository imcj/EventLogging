import Track from "./Track";
import {fetch as fetchPolyfill} from 'whatwg-fetch'

export default async function EventLogging() {
  // eventLaunch.emit(() => track.pop(), 2);
  const track = Track.instance;
  while (true) {
    const events = track.removeAll();
    fetchPolyfill('/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(events)
    });
    await track.timeout(2);
  }
}
