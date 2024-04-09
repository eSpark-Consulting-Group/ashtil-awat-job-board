import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Modal = ({ visible, onClose, clientSecret }) => {


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    if (!clientSecret && visible) {
        return (
            <Rodal visible={true} onClose={onClose}>
                <h2>Please try again.</h2>
            </Rodal>
        )
    }

    return (
        <div>
            <Rodal visible={visible} onClose={onClose}>
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </Rodal>
        </div>
    );
};

export default Modal;
