import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const res = await prisma.aboutTeamMember.findMany(
            {
                where: {
                    aboutId: id
                }
            }
        );
        return NextResponse.json({ res }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}