import Watcher from "./Watcher";
import EventLoggingListener from "./EventLoggingListener";

export default interface Options {
    url?: string | null,
    watchers?: Watcher[] | null,
    addition?: any | null,
    listener?: EventLoggingListener | null,
}