import React, { useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";

const PaypalCheckoutButton = ({ amount, appointmentId, onPaymentSuccess }) => {
    const { backendUrl, token } = useContext(AppContext);

    const initialOptions = {
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        intent: "capture",
        currency: "USD",
        disableFunding: "card",
    };

    const createOrder = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/v1/payment/create-order`, {
                amount: amount,
                appointmentId
            }, {
                headers: {
                    token
                }
            });
            return data.orderId;
        } catch (error) {
            console.error("Error creating order:", error);
            return null;
        }
    };
    const captureOrder = async ({orderID}) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/v1/payment/capture-payment`, {
                orderId: orderID,
            }, {
                headers: {
                    token
                }
            });

            if (data.success) {
                onPaymentSuccess(appointmentId);
            }

        } catch (error) {
            console.error("Error capturing order:", error);
            return null;
        }
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={captureOrder} />
        </PayPalScriptProvider>
    );
};

export default PaypalCheckoutButton;
