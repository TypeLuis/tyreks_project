const stripe = require('stripe')(process.env.Stripe_Test_Key);
import { jwtVerify } from 'jose'

export default async function handler(req, res) {

    const { cart } = req.body

    const secret = process.env.TOKEN_KEY;
    const shoppingCart = await (await jwtVerify(cart, new TextEncoder().encode(secret))).payload.message

    const productList = shoppingCart.map((item, i) => {

        const obj = {
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': item.name,
                },
                'unit_amount': item.price * 100,
            },
            'quantity': item.quantity,
        }

        return obj

    })

    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: productList,
                mode: 'payment',

                // {CHECKOUT_SESSION_ID} will return session id once completed to recieve information after completion

                success_url: `${req.headers.origin}/Cart/Success/?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/Cart/Cancel/?session_id={CHECKOUT_SESSION_ID}`,
            });
            res.json({ 'url': session.url })

        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}