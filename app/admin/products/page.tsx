export const dynamic = "force-dynamic";
import { Suspense } from "react";
import AdminProducts from "./productUI";

async function getProducts() {
    const res = await fetch("http://localhost:3000/api/product", { method: "GET" });
    const products = await res.json();
    return products;
}
async function deleteProducts() {
    const res = await fetch("http://localhost:3000/api/product", { method: "DELETE" });
    const products = await res.json();
    return products;
}

export default function productService() {
    const products = getProducts();
    console.log(products);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminProducts products={products} />
        </Suspense>
    )
}