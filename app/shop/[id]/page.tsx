import { Suspense } from 'react'
import ProductDetail from './productDetailUI'
import { notFound } from 'next/navigation';

async function getProduct({ params }: { params: Promise<{ id: string }> }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${(await params).id}`, { method: "GET" });
    const product = await res.json();
    if (!product) return notFound();
    return product;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const product = getProduct({ params });
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductDetail product={product} />
        </Suspense>
    )
}   