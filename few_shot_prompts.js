/**
 * Convert a string to camelCase.
 * Handles spaces, underscores, hyphens and mixed case (e.g. "first name" -> "firstName").
 *
 * Examples:
 *   toCamelCase('first name') // 'firstName'
 *   toCamelCase('user_id')    // 'userId'
 *   toCamelCase('SCREEN_NAME')// 'screenName'
 *   toCamelCase('mobile-number') // 'mobileNumber'
 *
 * @param {string} input
 * @returns {string}
 */
function toCamelCase(input) {
    if (input == null) return '';
    const s = String(input);
    // Extract letter/number runs as words
    const words = s.match(/[A-Za-z0-9]+/g);
    if (!words) return '';

    return words
        .map((w, i) => {
            const lower = w.toLowerCase();
            if (i === 0) return lower;
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

module.exports = toCamelCase;

// Quick checks (uncomment to run)
// console.log(toCamelCase('first name'));       // firstName
// console.log(toCamelCase('user_id'));          // userId
// console.log(toCamelCase('SCREEN_NAME'));      // screenName
// console.log(toCamelCase('mobile-number'));    // mobileNumber
// console.log(toCamelCase('HTTP_STATUS_CODE')); // httpStatusCode


