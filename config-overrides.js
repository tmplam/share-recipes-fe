// Override webpack, needn't eject (customize-cra | react-app-rewired)
// By defauly, webpack can't load .babelrc => have to config
// When npm start, running react-app-rewired => load this file to receive webpack config
const { override, useBabelRc } = require('customize-cra');

// override export default config and newly add config
module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
);
