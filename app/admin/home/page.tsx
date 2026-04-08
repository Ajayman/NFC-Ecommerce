import { Suspense } from "react";
import HomePage from "./homeUI";

async function getHomeData() {
    const res = await fetch("http://localhost:3000/api/home", { method: "GET" });
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