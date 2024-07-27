// Fonction de permutation basée sur un seed
function seededShuffle(seed: number, array: string[]): string[] {
    let m = array.length;
    let t: string;
    let i: number;

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

export class SecureEduCryptAlgorithm {
    private static mapChar(char: string, from: string[], to: string[]): string {
        const index = from.indexOf(char);
        return index !== -1 ? to[index] : char;
    }

    encrypt(text: string): string {
        return text.split('').map(char => SecureEduCryptAlgorithm.mapChar(char, charMap, shuffledCharMap)).join('');
    }

    decrypt(encryptedText: string): string {
        return encryptedText.split('').map(char => SecureEduCryptAlgorithm.mapChar(char, shuffledCharMap, charMap)).join('');
    }
}
