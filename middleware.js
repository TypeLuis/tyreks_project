import { NextRequest, NextResponse } from "next/server";

// Because middleware in Next.js doesn't support jsonwebtoken, Using jose is the best option
// https://github.com/vercel/next.js/discussions/38227
import { jwtVerify } from 'jose'

// Error: The edge runtime does not support Node.js 'buffer' module.
// import { verify } from "jsonwebtoken";



export const config = {
    matcher: ['/api/hello'] // defines which api routes uses the middleware
}

export async function middleware(req, ev) {

    const token = req.headers.get("x-access-toke");

    console.log(req.nextUrl)

    const errorFunction = (msg, sts) => {
        const message = msg
        const status = sts
        const url = req.nextUrl.clone()
        const link = `${url.origin}/api/error?message=${message}&status=${status}`
        return link
    }


    if (!token) {
        const error = errorFunction('A token is required for authentication', 401)
        return NextResponse.redirect(error)
    }
    try {
        const secret = process.env.TOKEN_KEY;

        const decoded = await jwtVerify(token, new TextEncoder().encode(secret))

        // req.headers.append(decoded.payload.message)
        // req.body = { ...req.body, payload: decoded.payload }
        // req.headers.set('payload', decoded.payload.message);
        NextRequest.set('payload', decoded.payload)
        req.payload = decoded.payload;
    } catch (err) {
        console.log(err)
        const error = errorFunction('Invalid Token', 403)
        return NextResponse.redirect(error)

        // NextResponse.json({ message: 'Invalid Token' }, { status: 403 })
    }
    return NextResponse.next();
}

