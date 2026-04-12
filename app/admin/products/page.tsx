export const dynamic = "force-dynamic";
import { Suspense } from "react";
import AdminProducts from "./productUI";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

async function getProducts() {
    const products = await prisma.product.findMany();
    if (!products)
        return notFound();

    if (!products) return notFound();
    return products;
}
async function deleteProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, { method: "DELETE" });
    const products = await res.json();
    return products;
}

export default async function productService() {
    const products = await getProducts();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminProducts products={products} />
        </Suspense>
    )
}