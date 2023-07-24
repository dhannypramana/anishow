export const useHelpers = () => {
    const slugify = (str) => {
        return str.toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
    }

    const trimify = (str, length, end = "") => {
        str = str.slice(0,length)
        str += end
        return str
    }

    return {
        slugify,
        trimify
    }
}