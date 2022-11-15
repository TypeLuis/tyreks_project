export default function handler(req, res) {
    res.status(401).json({ Message: 'A token is required for authentication' })
}