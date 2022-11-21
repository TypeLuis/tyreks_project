const stripe = require('stripe')(process.env.Stripe_Test_Key);
import { jwtVerify } from 'jose'

export default async function handler(req, res) {

    const { cart } = req.body

    const secret = process.env.TOKEN_KEY;
    const shoppingCart = await (await jwtVerify(cart, new TextEncoder().encode(secret))).payload.message

    let productList = []
    let result
    try {

        shoppingCart.map(async (item, i) => {
            const priceData = jwtVerify(item.priceToken, new TextEncoder().encode(secret)).then(r => r.payload.message)
            const promise = new Promise(async (resolve, reject) => {

                try {
                    const obj = {
                        price: await (await jwtVerify(item.priceToken, new TextEncoder().encode(secret))).payload.message,

                        'quantity': item.quantity,
                    }
                    resolve(obj)
                } catch (error) { reject(error) }

            })
            productList.push(promise)
            // const obj = {
            //     // 'price_data': {
            //     //     'currency': 'usd',
            //     //     'product_data': {
            //     //         'name': item.name,
            //     //     },
            //     //     'unit_amount': item.price * 100,
            //     // },
            //     'price': priceData,
            //     // 'price': "price_1LVHPoCqHz0TiTrq0rcHx43G",
            //     'quantity': item.quantity,
            // }

            // return obj

        })
        result = await Promise.all(productList).then(r => r).catch(error => { throw error })
    } catch (error) {
        console.log(error)
    }

    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            console.log(result)
            const session = await stripe.checkout.sessions.create({
                line_items: result,
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