import React from "react";

export const FormatDateTime = (props) => {
    var dateTimeEntree = props.doneesDateTime;
    var date = dateTimeEntree.split('T').join(' ');
    var dateFormatee = date.substring(0, 16);
    return (
        <>
            {dateFormatee}
        </>
    );
};
