const stripe = require('stripe')(process.env.Stripe_Test_Key);

export default async function handler(req, res) {
    try {

        const { session_id } = req.query
        const session = await stripe.checkout.sessions.retrieve(session_id)
        // const customer = await stripe.customers.retrieve(session.customer)

        // session.metadata.sessionRetrieved = Number(session.metadata.sessionRetrieved) + 1
        // console.log(session)
        res.status(200).json({
            'session': session,
            // 'customer': customer
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            error: error
        })
    }
}
