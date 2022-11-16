const stripe = require('stripe')(process.env.Stripe_Test_Key);


export default async function handler(req, res) {

    const { price_data } = req.query

    const price = await stripe.prices.retrieve(
        price_data
    );
    // console.log(products)
    res.status(200).json({ price: price })
}
