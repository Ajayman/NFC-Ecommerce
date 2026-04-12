import { Suspense } from 'react'
import ShopUI from './shopUI'
import { notFound } from 'next/navigation';

async function Shop() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { method: "GET" });
    const products = await res.json();
    if (!products)
        return notFound();
    return products;
}

export default function ShopPage() {
    const products = Shop();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopUI allProducts={products} />
        </Suspense>
    )
}