import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ['/api/hello']
}

export function middleware(req) {

    const config = process.env;
    console.log(req.nextUrl)

    const token = req.headers.get("x-access-token");

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
        console.log('hi', token)
        // req.user = token
        // const decoded = jwt.verify(token, config.TOKEN_KEY);
        // req.user = decoded;
    } catch (err) {
        // NextResponse.json({ message: 'Invalid Token' }, { status: 403 })
        // return res.status(401).send("Invalid Token");
    }
    return NextResponse.next();
}
