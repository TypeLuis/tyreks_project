const stripe = require('stripe')(process.env.Stripe_Test_Key);
import { jwtVerify } from 'jose'

export default async function handler(req, res) {

    const { cart } = req.body

    const secret = process.env.TOKEN_KEY;
    const shoppingCart = await (await jwtVerify(cart, new TextEncoder().encode(secret))).payload.message

    let promises = []
    let productList
    try {
        // Creates promises for each item then resolve promises from every item in array
        shoppingCart.map(async (item, i) => {
            const promise = new Promise(async (resolve, reject) => {

                try {
                    const obj = {
                        price: await (await jwtVerify(item.priceToken, new TextEncoder().encode(secret))).payload.message,

                        'quantity': item.quantity,
                    }
                    resolve(obj)
                } catch (error) { reject(error) }

            })
            promises.push(promise)
        })

        productList = await Promise.all(promises).then(r => r).catch(error => { throw error })
    } catch (error) {
        console.log(error)
    }

    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            console.log(productList)
            const session = await stripe.checkout.sessions.create({
                line_items: productList,
                mode: 'payment',


                // metadata: {
                //     'sessionRetrieved': 0
                // },


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