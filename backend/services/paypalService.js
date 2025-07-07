import axios from "axios";

const generateAccessToken = async () => {
    const response = await axios.post(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
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
    return response.data.access_token;
};

const createOrder = async (amount) => {
    const accessToken = await generateAccessToken();
    const url = `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`;

    const response = await axios.post(url, {
        intent: "CAPTURE",
        purchase_units: [
            {
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

    return response.data;
};

const capturePayment = async (orderId) => {
    const accessToken = await generateAccessToken();
    const url = `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`;

    const response = await axios.post(url, {}, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data;
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