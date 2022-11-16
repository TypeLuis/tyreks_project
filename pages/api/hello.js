// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// More info on how to parse Query Strings
// https://upmostly.com/nextjs/how-to-parse-query-string-parameters-in-next-js

export default function handler(req, res) {
  const { pid } = req.query
  res.status(200).json({ name: 'John Doe', query: pid ? pid : 'None', dick: 'chaney' })
}
