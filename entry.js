/**
 * Created by dam on 26/12/2016.
 */
require("./style.css");
document.write(require('./content.js'));

//dev
if (__DEV__) {
    console.warn('Extra logging');
}
// prod
if (__PROD__) {
    console.log('production');
}