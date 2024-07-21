import natural from 'natural';

export class TextAnalysisService {
    private offensiveWords: Set<string>;

    constructor() {
        this.offensiveWords = new Set([
            "puto", "pendejo", "cabron", "chinga", "chingada", "chingado", "chingón", 
            "chingadera", "chingar", "pinche", "jodido", "joder", "culero", "culera", 
            "verga", "mierda", "pito", "madrear", "madre", "puta", "puto", "malparido", 
            "maricón", "panocha", "pendejada", "hijo de puta", "cagada", "cagar", 
            "culito", "chambón", "canijo", "chilango", "chole", "boludo", "pelotudo", 
            "forro", "concha", "conchudo", "garcha", "gilipollas", "coño", "mamon", 
            "polla", "naco", "indio", "chino", "negro", "sudaca", "mojado"
        ]);
    }

    public isTextClean(text: string): boolean {
        const tokenizer = new natural.WordTokenizer();
        const words = tokenizer.tokenize(text.toLowerCase());

        for (const word of words) {
            if (this.offensiveWords.has(word)) {
                return false; // Si se encuentra una palabra ofensiva, retornar falso
            }
        }
        return true; // Si no se encuentran palabras ofensivas, retornar verdadero
    }
}
