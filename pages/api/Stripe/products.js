const stripe = require('stripe')(process.env.Stripe_Test_Key);


export default async function handler(req, res) {
    const products = await stripe.products.list({});
    // console.log(products)
    res.status(200).json({ products: products })
}
