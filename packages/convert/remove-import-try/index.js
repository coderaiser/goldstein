export const report = () => `Remove import of 'tryCatch/tryToCatch'`;
export const replace = () => ({
    'import tryCatch from "try-catch"': '',
    'import tryToCatch from "try-to-catch"': '',
    'const tryCatch = require("try-catch")': '',
    'const tryToCatch = require("try-to-catch")': '',
});
