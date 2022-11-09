export const dateFormat = (date) => {

    let newFormat, yearOfNewFormat, dateOfNewFormat, nameOfNewFormatMonth;

    if (date === null) {
        newFormat = new Date();
        yearOfNewFormat = new Date().getFullYear();
        nameOfNewFormatMonth = new Date().toLocaleString('default', {
            month: 'short',
        });
        dateOfNewFormat = new Date().getDate();

        return `${dateOfNewFormat}/${nameOfNewFormatMonth}/${yearOfNewFormat}`

    }
    else {
        newFormat = new Date(date.split("-").join(", "));
        nameOfNewFormatMonth = newFormat.toLocaleString('default', {
            month: 'short',
        });

        yearOfNewFormat = newFormat.getFullYear();

        dateOfNewFormat = newFormat.getDate();

        return `${dateOfNewFormat}/${nameOfNewFormatMonth}/${yearOfNewFormat}`
    }


}