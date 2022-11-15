import { NextRequest, NextResponse } from "next/server";

// const jwt = require("jsonwebtoken");

export function middleware(req) {

    const config = process.env;
    console.log(req.nextUrl)

    const token = req.headers.get("x-access-token");

    if (!token) {
        const url = req.nextUrl.clone()
        url.pathname = '/api/error'
        return NextResponse.redirect('http://localhost:3000/api/error')
        // return NextResponse.next().json({ message: 'A token is required for authentication' })
        // NextResponse.redirect(`${req.nextUrl.origin}/api/Error`)
        // return NextResponse.json({ message: 'A token is required for authentication' }, { status: 401 })
        // return new Response('A token is required for authentication', {
        //     status: 401
        // })
        // return res.status(403).send("A token is required for authentication");
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