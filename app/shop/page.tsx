import type { Metadata } from "next"
import { Suspense } from 'react'
import ShopUI from './shopUI'
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
    title: "Shop - Nina Fashion Collection",
    description: "Explore our curated collections of premium fashion, timeless elegance, and exquisite design. Shop now for the latest trends and exclusive pieces.",
}

async function Shop() {
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
    });
    if (!products)
        return notFound();
    console.log(products);
    return products;

}

export default async function ShopPage() {
    const products = await Shop();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopUI allProducts={products} />
        </Suspense>
    )
}