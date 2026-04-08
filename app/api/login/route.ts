import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose"
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
        return NextResponse.json({ values: { username, password }, errors: "All Fields are required", success: false });
        // return NextResponse.json({ message: "All Fields are required" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
        where: {
            username
        },
    });

    if (!user) {
        return NextResponse.json({ values: { username, password }, errors: { username: "Invalid user or password" }, success: false });
    }

    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
        return NextResponse.json({ values: { username, password }, errors: { password: "Incorrect Password" }, success: false });
    }

    const jwtPayload = {
        id: user.id,
        username: user.username,
        password: user.password,
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT(jwtPayload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(secret);
    return NextResponse.json({ ...user, token, success: true });
}