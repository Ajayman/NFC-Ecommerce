import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const product = await prisma.product.findUnique({
            where: {
                id
            },
            include: {
                images: {
                    select: {
                        url: true,
                        name: true,
                        resource_type: true
                    }
                }
            }
        })
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const { name, description, price, sizes, colors, category, rating } = body;
    if (!name || !description || !price || !sizes || !colors || !category || !rating) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    try {
        const product = await prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                description,
                price,
                sizes,
                colors,
                category,
                rating
            }
        })
        return NextResponse.json({ message: "Product Updated Successfully", product, success: true }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}