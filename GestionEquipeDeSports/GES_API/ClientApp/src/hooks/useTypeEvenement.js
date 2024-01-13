export function useTypeEvenement() {
    const TypeEvenement = ({ typeEvenement }) => {
        if (typeEvenement === 0) return "Entrainement";
        else if (typeEvenement === 1) return "Partie";
        else if (typeEvenement === 2) return "Autre";
        else return "MissingType";
    };

    return { TypeEvenement };
}
