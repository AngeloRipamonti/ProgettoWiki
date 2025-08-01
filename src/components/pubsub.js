export const pubSub = () => {
    const events = {};

    return {
        subscribe: (eventName, callback) => {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            events[eventName].push(callback);
        },
        publish: (eventName,data) => {
            events[eventName].forEach(callback => callback(data));
        },
    };
};