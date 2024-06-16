export const textShortener = (text = '', maxSize = 8, offsetSize = 3) => {
    if (text.length <= maxSize || text.length < offsetSize) return text;

    return `${text.slice(0, maxSize - offsetSize)}...${offsetSize === 0 ? '' : text.slice(-offsetSize)}`;
};
