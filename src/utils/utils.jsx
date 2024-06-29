export function hexToBase64 (hex) {
    const binaryString = hex.match(/\w{2}/g).map(char => {
        return String.fromCharCode(parseInt(char, 16));
    }).join('');
    return btoa(binaryString);
}

export function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    const dayDifference = today.getDate() - birth.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
}