// https://codeytek.com/create-stripe-checkout-in-next-js-stripe-session-stripe-webhook/
const Stripe = require('stripe');
import { buffer } from "micro"
import { jwtVerify } from 'jose'

const stripe = new Stripe(process.env.Stripe_Test_Key, {
    apiVersion: '2020-08-27'
});

const endpointSecret = process.env.endpointSecret

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const sig = req.headers['stripe-signature'];
        const buf = await buffer(req);

        let event;
        // console.log(buf)

        try {
            event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
        } catch (err) {
            console.log('error', err)
            res.status(401).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.succeeded

                const payment = await stripe.paymentIntents.create({
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    payment_method_types: paymentIntent.payment_method_types,
                    receipt_email: paymentIntent.receipt_email,
                });


                console.log('res', res)
                console.log('req', buf)
                console.log('event', event)
                console.log('paymentt', paymentIntent)
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        console.log(`Unhandled event type ${event.type}`);

        // Return a 200 response to acknowledge receipt of the event
        res.status(200).json({ 'event': event.type });
    }
}

// stripe listen --forward-to localhost:3000/api/Stripe/webhook