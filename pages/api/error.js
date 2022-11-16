export default function handler(req, res) {
    const { message, status } = req.query

    console.log(message)
    res.status(status).json({ Message: message ? message : 'A token is required for authentication' })
}