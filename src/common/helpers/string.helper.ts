export class StringHelper {
    static capitalize(
        texto: string | null | undefined,
        preserveConnectors: boolean = false
    ): string {
        if (!texto || typeof texto !== 'string') return '';

        const textoLimpio = texto.trim()
        if (!textoLimpio) return ''

        const connectors = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'e']);

        return textoLimpio
            .toLowerCase()
            .split(/\s+/)
            .map((word, index) => {
                if (!word) return '';

                if (preserveConnectors && index > 0 && connectors.has(word)) {
                    return word
                }

                return word.charAt(0).toUpperCase() + word.slice(1)
            })
            .join(' ');
    }

    /**
     * Limpia texto removiendo tíldes, eñes y caracteres especiales
     */
    static cleanText(text: string): string {
        if (!text) return '';

        return text
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ñ/g, 'n')
            .replace(/[^a-z0-9]/g, '');
    }

    /**
     * Rellena una cadena con un carácter hasta alcanzar la longitud
     */
    static padString(
        length: number,
        value: number | string,
        direction: 'left' | 'right',
        char: string = '0'
    ): string {
        const strValue = String(value)

        if (direction === 'left') {
            return strValue.padStart(length, char)
        } else if (direction === 'right') {
            return strValue.padEnd(length, char)
        } else {
            console.error(`Dirección inválida: ${direction}. Debe ser 'left' o 'right'`);
            return strValue;
        }
    }
}