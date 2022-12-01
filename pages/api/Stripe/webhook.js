// https://codeytek.com/create-stripe-checkout-in-next-js-stripe-session-stripe-webhook/
const Stripe = require('stripe');

const stripe = new Stripe(process.env.Stripe_Test_Key);

const endpointSecret = process.env.endpointSecret


// Tell Next.js to disable parsing body by default,
// as Stripe requires the raw body to validate the event
export const config = {
    api: {
        bodyParser: false,
    },
};


// https://github.com/stripe/stripe-node/issues/1294
async function requestBuffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const sig = req.headers['stripe-signature'];
        const buff = await requestBuffer(req)


        let event;

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

                    await stripe.products.update(
                        item.price.product,
                        { metadata: { maxQuantity: maxQuantity - item.quantity } }
                    );

                    // console.log('product', product)
                })
                break
            default:
            // console.log(`Unhandled event type ${event.type}`);
        }

        // console.log(`Unhandled event type ${event.type}`);

        // Return a response to acknowledge receipt of the event.
        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

// stripe listen --forward-to localhost:3000/api/Stripe/webhook