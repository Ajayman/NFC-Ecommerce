export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import HomePage from "./homeUI";
import prisma from "@/lib/prisma";

async function getHomeData() {
    return await prisma.homeInfo.findFirst({
        select: {
            id: true,
            title: true,
            titleDescription: true,
            video: { select: { id: true, url: true } }
        }
    });
}

export default async function Home() {
    const homeData = await getHomeData();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomePage homeInfo={homeData} />
        </Suspense>
    )
}