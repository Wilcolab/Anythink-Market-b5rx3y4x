/**
 * Convert a string to dot.case (lowercase words separated by dots).
 *
 * Overview
 * - Accepts an ASCII-only string containing letters (A–Z, a–z) and spaces.
 * - Trims leading/trailing whitespace, treats one-or-more internal spaces as a single word boundary.
 * - Returns a lowercase, dot-separated representation of the words.
 *   Example: "  Hello  WORLD  " -> "hello.world"
 *
 * Validation & Errors
 * - Throws a TypeError when `input` is `undefined` or `null`, or when `typeof input !== 'string'`.
 * - Throws an Error for:
 *     - empty string ("")
 *     - string containing only whitespace
 *     - strings containing numeric characters (0–9) — message: "Invalid input: numeric characters are not allowed."
 *     - strings containing special characters (hyphens, underscores, punctuation, emojis, etc.) — message: "Invalid input: special characters (such as hyphens, underscores, or punctuation) are not allowed. Use letters and spaces only."
 * - Throws a RangeError when the input length exceeds MAX_SAFE_INPUT_LENGTH to guard against out-of-memory conditions.
 *
 * Character set & internationalization
 * - The function validates using the ASCII-only pattern /^[A-Za-z\s]+$/.
 * - If you need Unicode/diacritic or non-Latin letter support, adjust the validation regex accordingly and consider normalization (NFC/NFD) before validation.
 *
 * Complexity
 * - Time: O(n) where n is the length of the trimmed input (single pass split + join).
 * - Space: O(n) for the produced output and intermediate word array.
 *
 * Security & Safety
 * - Uses MAX_SAFE_INPUT_LENGTH to mitigate extremely large inputs that can cause memory exhaustion.
 * - All error messages are descriptive and do not leak implementation details.
 *
 * Examples
 * @example
 * toDotCase("hello world");        // "hello.world"
 * @example
 * toDotCase("  LUCCA teacher ");   // "lucca.teacher"
 * @example
 * toDotCase("multiple   spaces");  // "multiple.spaces"
 *
 * @function toDotCase
 * @param {string} input - A non-empty string containing only letters and spaces. Leading/trailing whitespace is ignored.
 * @returns {string} A dot-separated, lowercase representation of the words in `input`.
 * @throws {TypeError} If `input` is undefined, null, or not a string.
 * @throws {Error} If `input` is an empty string, contains only whitespace, contains numeric characters, or contains special characters.
 * @throws {RangeError} If `input.length > MAX_SAFE_INPUT_LENGTH`.
 * @see MAX_SAFE_INPUT_LENGTH
 */

/**
 * Convert a string to PascalCase (UpperCamelCase).
 *
 * Overview
 * - Accepts an ASCII-only string containing letters (A–Z, a–z) and spaces.
 * - Trims leading/trailing whitespace and treats any run of spaces as a word delimiter.
 * - Capitalizes the first letter of each word and lowercases the remainder of each word.
 * - Joins the words without separators to produce PascalCase.
 *   Example: "  LUCCA teacher " -> "LuccaTeacher"
 *
 * Validation & Errors
 * - Throws a TypeError when `input` is `undefined` or `null`, or when `typeof input !== 'string'`.
 * - Throws an Error for:
 *     - empty string ("")
 *     - string containing only whitespace
 *     - strings containing numeric characters (0–9) — message: "Invalid input: numeric characters are not allowed."
 *     - strings containing special characters (hyphens, underscores, punctuation, emojis, etc.) — message: "Invalid input: special characters (such as hyphens, underscores, or punctuation) are not allowed. Use letters and spaces only."
 * - Throws a RangeError when the input length exceeds MAX_SAFE_INPUT_LENGTH to avoid potential out-of-memory issues.
 *
 * Behavior details
 * - Each word is transformed by uppercasing its first character and lowercasing the remainder.
 * - Empty words (possible only from pathological inputs) are skipped; contiguous spaces are treated as a single separator.
 *
 * Character set & internationalization
 * - Validation uses /^[A-Za-z\s]+$/ (ASCII letters and spaces). If Unicode letter support is required, update the regex and perform appropriate normalization.
 *
 * Complexity
 * - Time: O(n) where n is the trimmed input length (split + per-word transforms + join).
 * - Space: O(n) for the resulting PascalCase string and intermediate arrays.
 *
 * Examples
 * @example
 * toCamelCase("hello world");        // "HelloWorld"
 * @example
 * toCamelCase("  LUCCA teacher ");   // "LuccaTeacher"
 * @example
 * toCamelCase("singleword");         // "Singleword"
 *
 * @function toCamelCase
 * @param {string} input - A non-empty string containing only letters and spaces. Leading/trailing whitespace is ignored.
 * @returns {string} The PascalCase (UpperCamelCase) form of `input`.
 * @throws {TypeError} If `input` is undefined, null, or not a string.
 * @throws {Error} If `input` is an empty string, contains only whitespace, contains numeric characters, or contains special characters.
 * @throws {RangeError} If `input.length > MAX_SAFE_INPUT_LENGTH`.
 * @see MAX_SAFE_INPUT_LENGTH
 *
 * refined_prompt.js
 *
 * Exports a single function `toCamelCase` that converts a string into PascalCase (UpperCamelCase).
 *
 * Rules:
 * - Accepts only strings containing letters and spaces. Numbers or special characters (including hyphens/underscores) cause a descriptive error.
 * - Trims input and treats one-or-more spaces as word boundaries.
 * - Converts each word to Capitalized (first letter uppercase, rest lowercase) and joins them.
 * - Handles edge cases: undefined, null, empty/whitespace-only, non-string, and overly large strings (prevents OOM).
 */
/**
 * Convert input to dot.case (lowercase words separated by dots).
 *
 * Examples:
 *  toDotCase("hello world")      -> "hello.world"
 *  toDotCase("  LUCCA teacher ") -> "lucca.teacher"
 *
 * Throws informative errors for invalid inputs:
 *  - TypeError for null/undefined or non-string
 *  - Error with descriptive message for empty string, numeric or special character usage
 *  - RangeError for inputs larger than MAX_SAFE_INPUT_LENGTH
 *
 * @param {string} input
 * @returns {string}
 */
function toDotCase(input) {
    if (input === undefined) {
        throw new TypeError('Invalid input: value is undefined. Expected a non-empty string containing only letters and spaces.');
    }
    if (input === null) {
        throw new TypeError('Invalid input: value is null. Expected a non-empty string containing only letters and spaces.');
    }
    if (typeof input !== 'string') {
        throw new TypeError(`Invalid input type: expected string but received ${typeof input}.`);
    }

    if (input.length === 0) {
        throw new Error('Invalid input: empty string. Provide a non-empty string containing only letters and spaces.');
    }

    if (input.length > MAX_SAFE_INPUT_LENGTH) {
        throw new RangeError(
            `Input too large: length is ${input.length}. This exceeds the safe limit of ${MAX_SAFE_INPUT_LENGTH} characters and may cause out-of-memory errors.`
        );
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) {
        throw new Error('Invalid input: string contains only whitespace. Provide a non-empty string containing only letters and spaces.');
    }

    const validPattern = /^[A-Za-z\s]+$/;
    if (!validPattern.test(trimmed)) {
        if (/[0-9]/.test(trimmed)) {
            throw new Error('Invalid input: numeric characters are not allowed.');
        }
        throw new Error('Invalid input: special characters (such as hyphens, underscores, or punctuation) are not allowed. Use letters and spaces only.');
    }

    const words = trimmed.split(/\s+/).map((w) => w.toLowerCase());
    return words.join('.');
}

module.exports.toDotCase = toDotCase;

const MAX_SAFE_INPUT_LENGTH = 1_000_000; // guard against huge inputs that may cause OOM

/**
 * Convert input to PascalCase (UpperCamelCase).
 *
 * Examples:
 *  toCamelCase("hello world")      -> "HelloWorld"
 *  toCamelCase("  LUCCA teacher ") -> "LuccaTeacher"
 *
 * Throws informative errors for invalid inputs:
 *  - TypeError for null/undefined or non-string
 *  - Error with descriptive message for empty string, numeric or special character usage
 *  - RangeError for inputs larger than MAX_SAFE_INPUT_LENGTH
 *
 * @param {string} input
 * @returns {string}
 */
function toCamelCase(input) {
    if (input === undefined) {
        throw new TypeError('Invalid input: value is undefined. Expected a non-empty string containing only letters and spaces.');
    }
    if (input === null) {
        throw new TypeError('Invalid input: value is null. Expected a non-empty string containing only letters and spaces.');
    }
    if (typeof input !== 'string') {
        throw new TypeError(`Invalid input type: expected string but received ${typeof input}.`);
    }

    if (input.length === 0) {
        throw new Error('Invalid input: empty string. Provide a non-empty string containing only letters and spaces.');
    }

    if (input.length > MAX_SAFE_INPUT_LENGTH) {
        throw new RangeError(
            `Input too large: length is ${input.length}. This exceeds the safe limit of ${MAX_SAFE_INPUT_LENGTH} characters and may cause out-of-memory errors.`
        );
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) {
        throw new Error('Invalid input: string contains only whitespace. Provide a non-empty string containing only letters and spaces.');
    }

    // Validate characters: only allow ASCII letters and spaces.
    // Adjust the regex if Unicode letters should be supported.
    const validPattern = /^[A-Za-z\s]+$/;
    if (!validPattern.test(trimmed)) {
        // Determine if digits are present for a clearer message
        if (/[0-9]/.test(trimmed)) {
            throw new Error('Invalid input: numeric characters are not allowed.');
        }
        throw new Error('Invalid input: special characters (such as hyphens, underscores, or punctuation) are not allowed. Use letters and spaces only.');
    }

    const words = trimmed.split(/\s+/);
    const pascalWords = words.map((w) => {
        if (w.length === 0) return '';
        const first = w.charAt(0).toUpperCase();
        const rest = w.slice(1).toLowerCase();
        return first + rest;
    });

    return pascalWords.join('');
}

module.exports = { toCamelCase };

/* Example usages (uncomment to try):
console.log(toCamelCase("lucca teacher")); // "LuccaTeacher"
console.log(toCamelCase("luccateacher")); // "Luccateacher"
console.log(toCamelCase("  hello   WORLD  ")); // "HelloWorld"
console.log(toCamelCase("lucca-Teacher")); // throws Error about special characters
*/
