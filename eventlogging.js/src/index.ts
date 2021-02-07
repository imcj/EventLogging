import EventLogging from "./EventLogging";
import Track from "./Track";



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

export {
    Track
};
export default EventLogging;
