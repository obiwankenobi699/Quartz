---
---
# Regular Expression Reference

## Basic Grep Commands

**Exact Match**

```bash
grep -w "Pattern" file.name
```

**Find Files Containing Pattern**

```bash
grep -l "Pattern" .
```

**Recursive Search in Directory**

```bash
grep -lr "Pattern" .
```

The -r flag performs recursive search in current directory and subdirectories.

**Extended Regex with Character Classes**

```bash
grep -E "[a-z]" file.name
```

The -E flag enables extended regex syntax.

**Word Boundary Matching**

```bash
grep -oE '\b[a-z]{2}ve\b' file.name
```

The -o flag returns only the matched portion. Word boundaries ensure precise matching without exceeding specified limits.

## Core Regex Symbols

**Positional Anchors**

Start of line: `^` matches the beginning of a line. Example `^abc` matches "abc123" and "abc" but not "xabc".

End of line: `$` matches the end of a line. Example `abc$` matches "123abc" and "abc" but not "abcx".

**Quantifiers**

Plus: `+` matches one or more occurrences. Example `a+` matches "a", "aa", "aaa" but not empty string.

Asterisk: `*` matches zero or more occurrences. Example `a*` matches empty string, "a", "aa".

**Escape Character**

Backslash: `\` treats special characters as literals. Example `\.` matches "file.txt" (literal dot) but not "filext".

## Context-Dependent Caret Behavior

The caret symbol `^` has different meanings based on position.

Outside brackets: Start of line anchor. Example `^abc` matches lines beginning with "abc".

Inside brackets: Negation operator. Example `[^abc]` matches any character that is NOT a, b, or c (such as d, e, f).

## Practical Examples

**Line Position Matching**

```bash
grep -E "^Mukul" file.txt          # Lines starting with "Mukul"
grep -E "gmail\.com$" file.txt     # Lines ending with "gmail.com"
```

**Quantifier Usage**

```bash
grep -E "a+b+" file.txt            # One or more 'a' followed by one or more 'b'
```

**Special Character Escaping**

```bash
grep -E "email\?" file.txt         # Literal question mark in "email?"
```

## Character Classes

Square brackets define character sets. `[a-z]` matches any lowercase letter. `[0-9]` matches any digit. `[^0-9]` matches any non-digit character.

## Common Patterns

Email validation: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

This pattern matches standard email format with alphanumeric characters, dots, underscores in local part, followed by @ symbol, domain name, and top-level domain of at least two characters.

IP address: `^([0-9]{1,3}\.){3}[0-9]{1,3}$`

URL path: `^/[a-zA-Z0-9/_-]+$`

## Performance Considerations

Anchored patterns (using ^ and $) execute faster than unanchored patterns because the regex engine knows exactly where to start and stop matching. Word boundaries improve precision and reduce false positives in search results.

