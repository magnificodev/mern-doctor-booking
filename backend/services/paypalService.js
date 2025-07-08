import axios from "axios";

const generateAccessToken = async () => {
    const { data } = await axios.post(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_CLIENT_SECRET
            }
        }
    );
    return data.access_token;
};

const createOrder = async (amount, appointmentId) => {
    const accessToken = await generateAccessToken();
    const url = `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`;

    const { data } = await axios.post(url, {
        intent: "CAPTURE",
        purchase_units: [
            {
                reference_id: appointmentId,
                description: "Appointment Payment",
                amount: {
                    currency_code: "USD",
                    value: amount
                }
            }
        ]
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });

    return data;
};

const capturePayment = async (orderId) => {
    const accessToken = await generateAccessToken();
    const url = `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`;

    const { data } = await axios.post(url, {}, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });

    return data;
};

const getOrderDetails = async (orderId) => {
    const accessToken = await generateAccessToken();
    const url = `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}`;

    const response = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data;
};

export {
    generateAccessToken,
    createOrder,
    capturePayment,
    getOrderDetails
};