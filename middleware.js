import { NextRequest, NextResponse } from "next/server";

// Because middleware in Next.js doesn't support jsonwebtoken, Using jose is the best option
// https://github.com/vercel/next.js/discussions/38227
import { jwtVerify } from 'jose'

// Error: The edge runtime does not support Node.js 'buffer' module.
// import { verify } from "jsonwebtoken";



export const config = {
    matcher: ['/api/hello', '/api/Stripe/products', '/api/Stripe/price'] // defines which api routes uses the middleware
}

export async function middleware(req, ev) {

    const token = req.headers.get("x-access-token");

    // console.log(req.nextUrl)

    // function that gets message and status through parameter and creates link with both a queries
    const errorFunction = (msg, sts) => {
        const message = msg
        const status = sts
        const url = req.nextUrl.clone()
        const link = `${url.origin}/api/error?message=${message}&status=${status}`
        return link
    }


    if (!token) {
        // creates error link then redirects to the error response link
        const errorLink = errorFunction('A token is required for authentication', 401)
        return NextResponse.redirect(errorLink)
    }
    try {
        const secret = process.env.TOKEN_KEY;

        await jwtVerify(token, new TextEncoder().encode(secret))

    } catch (err) {
        console.log(err)
        const errorLink = errorFunction('Invalid Token', 403)
        return NextResponse.redirect(errorLink)

        // NextResponse.json({ message: 'Invalid Token' }, { status: 403 })
    }
    return NextResponse.next();
}

