
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function handlePrismaError(e: unknown): NextResponse {
    if (e) {
        return NextResponse.json({ message: e }, { status: 500 });
    }
    throw e;
}

function missingFields(): NextResponse {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
}

export async function GET() {
    try {
        const homeData = await prisma.homeInfo.findFirst({
            select: {
                id: true,
                title: true,
                titleDescription: true,
                video: { select: { id: true, url: true } }
            }
        });
        return NextResponse.json(homeData, { status: 200 });
    } catch (e) {
        return handlePrismaError(e);
    }
}

export async function POST(request: NextRequest) {
    const { video, title, titleDescription } = await request.json();

    if (!video || !title || !titleDescription) return missingFields();

    try {
        const home = await prisma.homeInfo.create({
            data: { video: { create: video }, title, titleDescription }
        });
        return NextResponse.json(
            { message: "Home created successfully", home, success: true },
            { status: 201 }
        );
    } catch (e) {
        return handlePrismaError(e);
    }
}

export async function PATCH(request: NextRequest) {
    const { id, video, title, titleDescription } = await request.json();

    if (!video || !title || !titleDescription) return missingFields();

    try {
        const home = await prisma.homeInfo.update({
            where: { id },
            data: {
                title,
                titleDescription,
                video: {
                    upsert: {
                        update: { url: video.url },
                        create: { url: video.url, name: video.name, resource_type: video.resource_type }
                    }
                }
            }
        });
        return NextResponse.json(
            { message: "Home updated successfully", home, success: true },
            { status: 200 }
        );
    } catch (e) {
        return handlePrismaError(e);
    }
}

// import { Prisma } from "@/generated/prisma/client";
// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//     try {
//         const homeData = await prisma.homeInfo.findFirst({
//             select: {
//                 id: true,
//                 title: true,
//                 titleDescription: true,
//                 video: {
//                     select: {
//                         id: true,
//                         url: true
//                     }
//                 }
//             }
//         })
//         return NextResponse.json(homeData, { status: 200 });
//     } catch (e) {
//         if (e instanceof Prisma.PrismaClientKnownRequestError) {
//             return NextResponse.json({ message: e.message }, { status: 500 });
//         }
//         throw e;
//     }
// }

// export async function POST(request: NextRequest) {
//     const body = await request.json();
//     const { video, title, titleDescription } = body;
//     if (!video || !title || !titleDescription) {
//         return NextResponse.json({ message: "Missing fields" }, { status: 400 });
//     }
//     try {
//         const home = await prisma.homeInfo.create({
//             data: {
//                 video: {
//                     create: video
//                 },
//                 title,
//                 titleDescription
//             }
//         })
//         return NextResponse.json({ message: "Home created successfully", home, success: true }, { status: 201 });
//     } catch (e) {
//         if (e instanceof Prisma.PrismaClientKnownRequestError) {
//             return NextResponse.json({ message: e.message }, { status: 500 });
//         }
//         throw e;
//     }
// }

// export async function PATCH(request: NextRequest) {
//     const body = await request.json();
//     console.log("body", body);
//     const { id, video, title, titleDescription } = body;
//     if (!video || !title || !titleDescription) {
//         return NextResponse.json({ message: "Missing fields" }, { status: 400 });
//     }
//     try {
//         const home = await prisma.homeInfo.update({
//             where: {
//                 id
//             },
//             data: {
//                 video: {
//                     update: {
//                         where: {
//                             id: video.id
//                         },
//                         data: {
//                             url: video.url
//                         }
//                     },
//                     create: video
//                 },
//                 title,
//                 titleDescription
//             }
//         })
//         return NextResponse.json({ message: "Home updated successfully", home, success: true }, { status: 201 });
//     } catch (e) {
//         if (e instanceof Prisma.PrismaClientKnownRequestError) {
//             return NextResponse.json({ message: e.message }, { status: 500 });
//         }
//         throw e;
//     }
// }