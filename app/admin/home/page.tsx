export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import HomePage from "./homeUI";

async function getHomeData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, { method: "GET" });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();

}

export default async function Home() {
    const homeData = await getHomeData();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomePage homeData={homeData} />
        </Suspense>
    )
}