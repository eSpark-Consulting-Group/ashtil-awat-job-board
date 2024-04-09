import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import supabase from '../../services/supabaseClient';

const stripePromise = loadStripe("pk_test_51P2s0fJF3VEJngBENd9Q3TnmN6bniBHmsBH0WjxhP63Zzqkq4Lpqp16YkD9ymlWTtCnUiJG66uLEyL84YIEUZ2KQ00WBOEhyov");

const Modal = ({ visible, onClose, clientSecret }) => {

    // const [clientSecret, setClientSecret] = useState("");

    // useEffect(() => {
    //     // Create PaymentIntent as soon as the page loads
    //     fetch("/create-payment-intent", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => setClientSecret(data.clientSecret));
    // }, []);




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
