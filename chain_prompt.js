const assert = require("assert");

/**
 * Convert a string to kebab-case.
 *
 * The function performs the following steps:
 *  - Validates the input (null/undefined, empty/whitespace-only, digits not allowed).
 *  - Trims leading and trailing whitespace.
 *  - Inserts hyphens between camelCase boundaries (e.g. "helloWorld" -> "hello-World").
 *  - Replaces all whitespace sequences with single hyphens.
 *  - Converts the whole string to lowercase.
 *  - Removes any remaining special characters (only a-z and hyphens remain).
 *  - Collapses multiple hyphens and trims leading/trailing hyphens.
 *
 * Errors:
 *  - Throws "Invalid input: value is null or undefined." if input is null or undefined.
 *  - Throws "Empty input: string is empty or contains only whitespace." if input is empty or whitespace-only (or results in empty after cleaning).
 *  - Throws "Invalid input: string contains numbers." if the input contains any numeric characters.
 *
 * Examples:
 *  - toKebabCase("Lucca Teacher") => "lucca-teacher"
 *  - toKebabCase("luccaTeacher") => "lucca-teacher"
 *  - toKebabCase("lucca12Teacher") => throws Error("Invalid input: string contains numbers.")
 *
 * @param {string} input - The input string to convert to kebab-case.
 * @returns {string} The kebab-case version of the input string.
 * @throws {Error} If input is null/undefined, empty/whitespace-only, or contains numbers.
 */
function toKebabCase(input) {
    // Input null/undefined validation
    if (input === null || input === undefined) {
        throw new Error("Invalid input: value is null or undefined.");
    }

    // Ensure input is a string
    if (typeof input !== "string") {
        // Coerce non-string values? Spec expects a single input as string, so treat non-string as invalid.
        throw new Error("Invalid input: value is not a string.");
    }

    // Trim whitespace
    const trimmed = input.trim();

    // Empty or whitespace-only validation
    if (trimmed.length === 0) {
        throw new Error("Empty input: string is empty or contains only whitespace.");
    }

    // Numbers validation
    if (/\d/.test(trimmed)) {
        throw new Error("Invalid input: string contains numbers.");
    }

    // Insert hyphen between camelCase boundaries: aB -> a-B
    let s = trimmed.replace(/([a-z])([A-Z])/g, "$1-$2");

    // Replace any whitespace sequence with a single hyphen
    s = s.replace(/\s+/g, "-");

    // Convert to lowercase
    s = s.toLowerCase();

    // Remove any character that is not a lowercase letter or hyphen
    s = s.replace(/[^a-z-]/g, "");

    // Collapse multiple hyphens into one
    s = s.replace(/-+/g, "-");

    // Trim leading/trailing hyphens
    s = s.replace(/^-+|-+$/g, "");

    // If result is empty after cleaning, consider it empty input
    if (s.length === 0) {
        throw new Error("Empty input: string is empty or contains only whitespace.");
    }

    return s;
}

module.exports = toKebabCase;

/* ---------------------------
     Self-test runner when executed with `node chain_prompt.js`
     Also usable via `npm test` if package.json test script runs this file.
     --------------------------- */
if (require.main === module) {

    function shouldThrow(fn, expectedMessage, label) {
        let thrown = false;
        try {
            fn();
        } catch (err) {
            thrown = true;
            assert.strictEqual(err && err.message, expectedMessage, `${label} -> unexpected error message`);
        }
        if (!thrown) {
            assert.fail(`${label} -> expected function to throw`);
        }
    }

    try {
        // Valid cases
        assert.strictEqual(toKebabCase("Lucca Teacher"), "lucca-teacher", "Space separated words");
        assert.strictEqual(toKebabCase("  multiple   spaces here  "), "multiple-spaces-here", "Multiple spaces");
        assert.strictEqual(toKebabCase("luccaTeacher"), "lucca-teacher", "camelCase split");
        assert.strictEqual(toKebabCase("HelloWorldExample"), "hello-world-example", "Pascal/camelCase splitting");
        assert.strictEqual(toKebabCase("special@chars!are#removed"), "specialcharsareremoved", "Special characters removed");
        assert.strictEqual(toKebabCase("already-kebab-case"), "already-kebab-case", "Already kebab-case preserved");
        assert.strictEqual(toKebabCase("MiXeD Case-Example"), "mixed-case-example", "Mixed case and hyphen");

        // Edge cases: Null or undefined
        shouldThrow(
            () => toKebabCase(null),
            "Invalid input: value is null or undefined.",
            "Null input"
        );
        shouldThrow(
            () => toKebabCase(undefined),
            "Invalid input: value is null or undefined.",
            "Undefined input"
        );

        // Empty or whitespace
        shouldThrow(
            () => toKebabCase(""),
            "Empty input: string is empty or contains only whitespace.",
            "Empty string"
        );
        shouldThrow(
            () => toKebabCase("    "),
            "Empty input: string is empty or contains only whitespace.",
            "Whitespace-only string"
        );

        // Special characters only (after cleaning becomes empty)
        shouldThrow(
            () => toKebabCase("@#$%^&*()"),
            "Empty input: string is empty or contains only whitespace.",
            "Special characters only"
        );

        // Alphanumeric with letters and punctuation (no digits) should work
        assert.strictEqual(toKebabCase("abc-Def_ghi!"), "abc-def-ghi", "Alphanumeric-like with punctuation");

        // Numbers should throw
        shouldThrow(
            () => toKebabCase("hello123"),
            "Invalid input: string contains numbers.",
            "Contains numbers"
        );
        shouldThrow(
            () => toKebabCase("1startWithNumber"),
            "Invalid input: string contains numbers.",
            "Starts with number"
        );
        shouldThrow(
            () => toKebabCase("lucca12Teacher"),
            "Invalid input: string contains numbers.",
            "Example with numbers in middle"
        );

        console.log("All tests passed.");
        process.exit(0);
    } catch (err) {
        console.error("Test failure:", err && err.message ? err.message : err);
        process.exit(1);
    }
}