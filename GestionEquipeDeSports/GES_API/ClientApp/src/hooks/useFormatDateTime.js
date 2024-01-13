export function useFormatDateTime() {
    const FormatDateTime = ({ dateTime }) => {
        const dateTimeEntree = dateTime;
        const date = dateTimeEntree.split('T')[0];
        const time = dateTimeEntree.split('T')[1].split(':');
        const dateTimeSortie = date + ' ' + time[0] + ':' + time[1];

        return dateTimeSortie;
    };

    return { FormatDateTime };
}
