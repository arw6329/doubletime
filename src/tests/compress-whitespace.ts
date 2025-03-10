export function compressWhitespace(string: string): string {
    return string.replaceAll(/\s+/g, ' ')
}
