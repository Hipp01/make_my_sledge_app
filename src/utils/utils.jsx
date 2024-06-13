export const hexToBase64 = (hex) => {
    const binaryString = hex.match(/\w{2}/g).map(char => {
        return String.fromCharCode(parseInt(char, 16));
    }).join('');
    return btoa(binaryString);
};