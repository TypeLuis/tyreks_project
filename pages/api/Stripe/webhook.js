const stripe = require('stripe')(process.env.Stripe_Test_Key);
import { jwtVerify } from 'jose'

const endpointSecret = process.env.endpointSecret

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.succeeded
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