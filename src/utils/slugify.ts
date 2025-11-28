export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
