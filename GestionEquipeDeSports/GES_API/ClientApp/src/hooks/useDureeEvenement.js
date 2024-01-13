export function useDureeEvenement() {
    function getDureeEvenement(dateDebut, dateFin) {
        const dateDebutParsed = Date.parse(dateDebut);
        const dateFinParsed = Date.parse(dateFin);
        const result = (dateFinParsed - dateDebutParsed) / 60000;

        if (result > 59) {
            const dureeM = result % 60;
            const dureeH = Math.floor(result / 60);

            return (`${dureeH}h ${dureeM}min`);
        }
        else { return (`${result}min`); }
    }

    return { getDureeEvenement };
}
