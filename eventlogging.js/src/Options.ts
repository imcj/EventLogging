import Watcher from "./Watcher";

export default interface Options {
    url?: string | null,
    watchers: Watcher[],
}