import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, description, productType, price, images, sizes, colors, category, rating } = body;
    if (!name || !description || !productType || !price || !images || !sizes || !colors || !category || !rating) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                productType,
                price,
                images: {
                    create: images
                },
                sizes,
                colors,
                category,
                rating
            }
        })
        return NextResponse.json({ message: "Product created successfully", product, success: true }, { status: 201 });
    } catch (e) {
        if (e) {
            return NextResponse.json({ message: e }, { status: 500 });
        }
        throw e;
    }
}

export async function PATCH(request: NextRequest) {
    const body = await request.json();
    const { id, name, description, productType, image, price, sizes, colors, category, rating } = body;
    if (!id || !name || !description || !productType || !image || !price || !sizes || !colors || !category || !rating) {
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
                productType,
                images: {
                    deleteMany: {},
                    create: image
                },
                price,
                sizes,
                colors,
                category,
                rating
            }
        })
        return NextResponse.json({ message: "Product updated successfully", product, success: true }, { status: 201 });
    } catch (e) {
        if (e) {
            return NextResponse.json({ message: e }, { status: 500 });
        }
        throw e;
    }
}

export async function GET(request: NextRequest) {
    try {
        const products = await prisma.product.findMany({
            include: {
                images: {
                    select: {
                        url: true,
                        name: true,
                        resource_type: true
                    }
                }
            }
        }
        );
        return NextResponse.json(products, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(reqeust: NextRequest) {
    try {
        const body = await reqeust.json();
        const { id } = body;
        const product = await prisma.product.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: "Product deleted successfully", product, success: true }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

