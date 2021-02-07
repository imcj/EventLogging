import EventLogging from "./EventLogging";


// example
//
// EventLogging({
//     addition: {
//         'user_id': 'test',
//     },
//     watchers: [],
//     listener: (track) => {
//         console.log('on listener');
//         // console.log(track);
//         // track.log("test message");
//
//         try {
//             throw new Error("test");
//         } catch(e) {
//             console.error(e);
//             track.captureException(e);
//         }
//     }
// }).then(() => {})

export default EventLogging;
