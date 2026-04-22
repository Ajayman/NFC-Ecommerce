"use client"
import { Heart } from "lucide-react"
import VariantButton from "./variantButton"
import QuantityButton from "./quantityButton"
import { useState } from "react"
import BuyNowButton from "./buyNowButton"
import Form from "next/form"
type Product = {
    id: string,
    name: string,
    price: number,
    images: {
        url: string,
        name: string,
        resource_type: string
    }[],
    category: string[],
    description: string,
    rating: number,
    sizes: string[],
    colors: string[],
    productType: string[],
}


export default function ProductDetail({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [imageShow, setImageShow] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [buyNowData, setBuyNowData] = useState({
        productId: "",
        name: "",
        selectedSize: "",
        selectedColor: "",
        quantity: Number("")
    });
    function handleBuyForm(formData: FormData) {
        const values = {
            productId: formData.get("productId") as string,
            name: formData.get("name") as string,
            selectedSize: formData.get("selectedSize") as string,
            selectedColor: formData.get("selectedColor") as string,
            quantity: Number(formData.get("quantity"))
        }
        console.log(values);
        setBuyNowData(values);
    }
    function handleSelectedColor(color: string) {
        setSelectedColor(color);
    }
    function handleSelectedSize(size: string) {
        setSelectedSize(size);
    }
    function handleSelectedQuantity(quantity: number) {
        setQuantity(quantity);
    }
    return (
        <>
            <main className="bg-cyan-50">
                {/* Product Details */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div>
                            <div className="bg-muted rounded-lg overflow-hidden aspect-[3/5] mb-4">
                                <img
                                    src={product.images[imageShow].url || "/placeholder.svg"}
                                    alt={product.images[imageShow].name || "Product Image"}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                {product.images.map((image, i) => (
                                    <div
                                        key={i}
                                        className="bg-muted rounded-lg aspect-[3/4] overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                                    >
                                        <input type="image" src={image.url} onClick={() => setImageShow(i)}
                                            alt={`View ${i + 1}`}
                                            className="w-full h-full object-cover" />
                                        {/* <img
                                            src={image}
                                            alt={`View ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        /> */}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <Form action={handleBuyForm}>
                                <input type="hidden" name="productId" value={product.id} />
                                <input type="hidden" name="selectedSize" value={selectedSize} />
                                <input type="hidden" name="selectedColor" value={selectedColor} />
                                <input type="hidden" name="name" value={product.name} />
                                <input type="hidden" name="quantity" value={quantity} />
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h1 className="text-4xl font-bold text-primary">{product.name}</h1>
                                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                            <Heart size={24} className="text-muted-foreground hover:text-accent" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        {[...Array(product.rating)].map((_, i) => (
                                            <span key={i} className="text-teal-400 text-lg">
                                                ★
                                            </span>
                                        ))}
                                        <span className="text-muted-foreground ml-2">({product.rating} rating)</span>
                                    </div>
                                    <p className="text-3xl font-bold text-primary">NRs. {product.price}</p>
                                </div>

                                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{product.description}</p>

                                {/* Color Selection */}
                                <VariantButton colors={product.colors} handleData={handleSelectedColor} />

                                {/* Size Selection */}
                                <VariantButton sizes={product.sizes} handleData={handleSelectedSize} />

                                {/* Quantity */}
                                <QuantityButton handleData={handleSelectedQuantity} />

                                {/* Add to Cart Button */}
                                <BuyNowButton handleData={buyNowData} />
                                {/* Additional Info */}
                            </Form>
                            <div className="mt-12 space-y-4 border-t border-border pt-8">
                                <div>
                                    <h3 className="font-semibold text-primary mb-2">Shipping</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Free shipping on orders over $100. Standard shipping 5-7 business days.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary mb-2">Returns</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Easy returns within 30 days of purchase. No questions asked.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-primary mb-2">Authenticity</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Every item is 100% authentic and carefully inspected before shipping.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
