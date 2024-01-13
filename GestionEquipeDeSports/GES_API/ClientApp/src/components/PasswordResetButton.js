import React from 'react';
import { Button } from "react-bootstrap";
import { useNotificationToast } from '../hooks/useNotificationToast.js';

const PasswordResetButton = ({ email }) => {
    const { setNotification, ToastContainer } = useNotificationToast();

    const sendPasswordResetEmail = async () => {
        // Check if the email is empty
        if (!email) {
            setNotification('Please enter your email address.', "error");
            return;
        }

        // Send a POST request to trigger the password reset email
        const apiUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/dbconnections/change_password`;
        const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
        const connection = 'Username-Password-Authentication'; // Replace with your Auth0 database connection

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: clientId,
                    email: email,
                    connection: connection,
                }),
            });

            if (response.ok) {
                // Password reset email sent successfully
                setNotification('Email de réinitialisation du mot de passe envoyé avec succès. Veuillez vérifier votre boîte de réception.');
            } else {
                // Handle the error response here
                const errorData = await response.json();
                setNotification(`Erreur en envoyant le email à l'adresse: ${errorData.error_description}`, "error");
            }
        } catch (error) {
            setNotification("Erreur lors de l'envoi du email de réinitialisation du mot de passe. Veuillez réessayer plus tard.", "error");
        }
    };

    return (
        <div>
            <Button style={{ color: "white" }} variant="warning" type="button" onClick={sendPasswordResetEmail} className="w-100" >Changer Mot de Passe</Button>
            <ToastContainer />
        </div>
    );
};

export default PasswordResetButton;
