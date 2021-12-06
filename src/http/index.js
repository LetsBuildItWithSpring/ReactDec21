

export const createTweet = (tweet = {}) => {

    const pro = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(tweet);
        }, 3000);
    });
    return pro;
}