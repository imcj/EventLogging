let _sessionId = (Math.round(Math.random() * 100_100_100)).toString();

export default class SessionId {
    sessionId = _sessionId;
}