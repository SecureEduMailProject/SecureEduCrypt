// Fonction de hachage (simplifiée ici)
function hashSeed(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

// Fonction de permutation améliorée
function seededShuffle(seed: number, array: string[]): string[] {
    let m = array.length;
    let t: string;
    let i: number;

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

// Génère une permutation dynamique basée sur un texte ou un mot de passe
function generateShuffledMap(text: string): string[] {
    const seed = hashSeed(text);
    return seededShuffle(seed, [...charMap]);
}

export class AdvancedSecureCrypt {
    private static mapChar(char: string, from: string[], to: string[]): string {
        const index = from.indexOf(char);
        return index !== -1 ? to[index] : char;
    }

    encrypt(text: string, password: string): string {
        const shuffledCharMap = generateShuffledMap(password);
        return text.split('').map(char => AdvancedSecureCrypt.mapChar(char, charMap, shuffledCharMap)).join('');
    }

    decrypt(encryptedText: string, password: string): string {
        const shuffledCharMap = generateShuffledMap(password);
        return encryptedText.split('').map(char => AdvancedSecureCrypt.mapChar(char, shuffledCharMap, charMap)).join('');
    }
}
