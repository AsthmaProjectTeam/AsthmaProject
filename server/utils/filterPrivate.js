/**
 * Created by tengzhongwei on 6/2/17.
 */
function filterPrivateInformation(data) {
    const secret= ['hash', 'salt'];
    const filtered = Object.keys(data)
        .filter(key => !secret.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
    return filtered;
}

module.exports = filterPrivateInformation;