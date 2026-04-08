import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { username, email, password } = body;
    if (!email || !username || !password) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const usernameExists = await prisma.user.findUnique({
        where: {
            username
        }
    })
    const existingEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (usernameExists || existingEmail) {
        return NextResponse.json({ message: "Username or email already exists" }, { status: 400 });
    }


    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: await hashedPassword
            }
        })

        return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
    }
}