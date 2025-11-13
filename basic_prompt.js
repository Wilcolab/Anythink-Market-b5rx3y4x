/**
 * Convert a string to CamelCase (UpperCamelCase / PascalCase).
 * Examples:
 *   toCamelCase("wilco testing") => "WilcoTesting"
 *   toCamelCase("hello-world") => "HelloWorld"
 *   toCamelCase("alreadyCamel") => "Alreadycamel"
 *
 * @param {string} text
 * @returns {string}
 */
function toCamelCase(text) {
    if (text == null) return '';
    const s = String(text).trim();
    if (s === '') return '';

    // Split on any non-letter/number sequence (supports Unicode)
    const parts = s.split(/[^\p{L}\p{N}]+/u).filter(Boolean);

    // Capitalize each part (UpperCamelCase / PascalCase)
    return parts
        .map(p => {
            const lower = p.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

module.exports = toCamelCase;