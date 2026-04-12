import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
    "/",
    "/about",
    "/contact",
    "/shop",
    "/admin/login",
    "/admin/signup",
    "/api/login",
    "/api/register",
];

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Allow public routes
    if (publicRoutes.some(route => pathname === route)) {
        return NextResponse.next();
    }

    // Only protect /admin routes
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    // Check token
    const cookieStore = await cookies();
    const token = cookieStore.get("Authorization")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
        const { payload } = await jwtVerify(token, secret);
        if (!payload?.id) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
        return NextResponse.next(); // ✅ valid token, allow through
    } catch (error) {
        return NextResponse.redirect(new URL("/admin/login", request.url)); // ✅ invalid token, redirect
    }
}

export const config = {
    matcher: ["/admin/:path*"], // only runs middleware on /admin routes
};

// import { jwtVerify } from "jose";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server"

// export async function proxy(request: NextRequest) {
//     const pathname = request.nextUrl.pathname;
//     if (pathname === "/admin" || pathname === "/api/login" || pathname === "/api/register" || pathname === "/admin/login" || pathname === "/admin/signup" || pathname === "/about" || pathname === "/contact" || pathname === "/shop" || pathname === "/") {
//         return NextResponse.next();
//     }
//     const cookieStore = await cookies();
//     const token = cookieStore.get("Authorization")?.value;
//     if (!token) {
//         return NextResponse.redirect(new URL("/admin/login", request.url));
//     }
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     try {
//         const { payload } = await jwtVerify(token, secret);
//         if (!payload?.id) {
//             return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//         }
//     } catch (error) {
//         return NextResponse.json({ message: "No proper token" }, { status: 401 });
//     }
// }

// export const config = {
//     matcher: [],
// }