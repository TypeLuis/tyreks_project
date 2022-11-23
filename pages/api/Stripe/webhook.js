// https://codeytek.com/create-stripe-checkout-in-next-js-stripe-session-stripe-webhook/
const Stripe = require('stripe');
// import { buffer } from "micro"
import { jwtVerify } from 'jose'
import getRawBody from "raw-body"

const stripe = new Stripe(process.env.Stripe_Test_Key);

const endpointSecret = process.env.endpointSecret

export const config = {
    api: {
        bodyParser: false,
    },
};


async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req, res) {

    if (req.method === 'POST') {
        console.log(req.headers)
        const sig = req.headers['stripe-signature'];
        const buff = await buffer(req)
        // const buf = await buffer(req);
        // const rawBody = await getRawBody(req)

        let event;
        // console.log(buf)

        try {
            event = stripe.webhooks.constructEvent(buff, sig, endpointSecret);
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

                // console.log('res', res)
                // console.log('req', buf)
                // console.log('event', event)
                // console.log('paymentt', paymentIntent)
                // console.log('session', session)
                break;
            // ... handle other event types
            case 'checkout.session.completed':
                const sessionIntent = event.data.object;

                // Retrieve the Checkout Session with expand
                // https://stackoverflow.com/questions/70603893/how-to-get-product-and-quantity-information-from-payment-intent-succeeded-event
                const session = await stripe.checkout.sessions.retrieve(sessionIntent.id, {
                    expand: ["line_items"]
                });
                session.line_items.data.map(async (item, i) => {
                    const retrieved = await stripe.products.retrieve(
                        item.price.product,
                    );
                    const maxQuantity = Number(retrieved.metadata.maxQuantity)
                    const product = await stripe.products.update(
                        item.price.product,
                        { metadata: { maxQuantity: maxQuantity - item.quantity } }
                    );

                    // console.log('product', product)
                })
                console.log('session', session.line_items.data)
                break
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        console.log(`Unhandled event type ${event.type}`);

        // Return a 200 response to acknowledge receipt of the event
        res.status(200).json({ 'event': event.type });
    }
}

// stripe listen --forward-to localhost:3000/api/Stripe/webhook