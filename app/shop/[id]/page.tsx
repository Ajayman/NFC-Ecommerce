import { Suspense } from 'react'
import ProductDetail from './productDetailUI'
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

async function getProduct({ params }: { params: Promise<{ id: string }> }) {
    const product = await prisma.product.findUnique({
        where: {
            id: (await params).id
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
    });
    if (!product) return notFound();
    console.log("Yeta xa hai product", product);
    return product;
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const product = await getProduct({ params });
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductDetail product={product} />
        </Suspense>
    )
}   