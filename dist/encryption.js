"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureEduCryptAlgorithm = void 0;
// Fonction de permutation basée sur un seed
function seededShuffle(seed, array) {
    let m = array.length;
    let t;
    let i;
    // Initialise le générateur de nombres pseudo-aléatoires
    function random() {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    while (m) {
        i = Math.floor(random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
// Ensemble des caractères à utiliser
const charMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
// Génère une permutation fixe en utilisant un seed
const seed = 42; // Vous pouvez changer le seed pour obtenir une permutation différente
const shuffledCharMap = seededShuffle(seed, [...charMap]);
class SecureEduCryptAlgorithm {
    static mapChar(char, from, to) {
        const index = from.indexOf(char);
        return index !== -1 ? to[index] : char;
    }
    encrypt(text) {
        return text.split('').map(char => SecureEduCryptAlgorithm.mapChar(char, charMap, shuffledCharMap)).join('');
    }
    decrypt(encryptedText) {
        return encryptedText.split('').map(char => SecureEduCryptAlgorithm.mapChar(char, shuffledCharMap, charMap)).join('');
    }
}
exports.SecureEduCryptAlgorithm = SecureEduCryptAlgorithm;
