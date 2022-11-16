import { NextRequest, NextResponse } from "next/server";
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
        console.log('hi', token)

        const test = await jwtVerify(token, new TextEncoder().encode('secret'))
        // console.log(test)
        // req.user = token
        // const decoded = jwt.verify(token, config.TOKEN_KEY);
        // req.user = decoded;
    } catch (err) {
        const url = req.nextUrl.clone()
        url.pathname = '/api/error'
        return NextResponse.redirect(url.href)

        // NextResponse.json({ message: 'Invalid Token' }, { status: 403 })
        // return res.status(401).send("Invalid Token");
    }
    return NextResponse.next();
}
