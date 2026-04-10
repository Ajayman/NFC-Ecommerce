export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import HomePage from "./homeUI";

async function getHomeData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, { method: "GET" });
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
        throw new Error(`Expected JSON but got: ${contentType}`);
    }
    const homeData = await res.json();
    return homeData;
}

export default function Home() {
    const homeData = getHomeData();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomePage homeData={homeData} />
        </Suspense>
    )
}