import Track from "./Track";

export default interface EventLoggingListener {
    (track: Track): void;
}