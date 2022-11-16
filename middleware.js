import { NextRequest, NextResponse } from "next/server";

// Because middleware in Next.js doesn't support jsonwebtoken, Using jose is the best option
// https://github.com/vercel/next.js/discussions/38227
import { jwtVerify } from 'jose'

// Error: The edge runtime does not support Node.js 'buffer' module.
// import { verify } from "jsonwebtoken";

export const config = {
    matcher: ['/api/hello']
}

export async function middleware(req) {

    const token = req.headers.get("x-access-token");

    console.log(req.nextUrl)


    if (!token) {
        const url = req.nextUrl.clone()
        url.pathname = '/api/error'
        return NextResponse.redirect(url.href)

        // How next.js used to handle errors
        // return new Response('A token is required for authentication', {
        //     status: 401
        // })
    }
    try {
        const secret = process.env.TOKEN_KEY;

        const decoded = await jwtVerify(token, new TextEncoder().encode(secret))
        req.decoded = decoded;
    } catch (err) {
        const url = req.nextUrl.clone()
        url.pathname = '/api/error'
        return NextResponse.redirect(url.href)
    }
    return NextResponse.next();
}
