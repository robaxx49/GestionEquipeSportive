import React, { useEffect, useState } from "react";

export const AfficherChangerPresence = (props) => {
    const [message, setMessage] = useState("Absent");

    useEffect(() => {
        setMessage(props.presence[0] ? "Présent" : "Absent");
    }, [setMessage, props]);

    const messageStyle = { color: message === "Présent" ? 'green' : "red", };

    return (
        <>
            <span style={messageStyle}>{message}</span>
        </>
    );
};
