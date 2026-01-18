import Header from "@/app/components/headers"
import { Heart } from "lucide-react"
import VariantButton from "./variantButton"
import QuantityButton from "./quantityButton"
import AddToCartButton from "./addtocartButton"
interface Product {
    id: number
    name: string
    price: number
    image: string
    category: string
    description: string
    rating: number
    sizes: string[]
    colors: string[]
}

const products: Record<number, Product> = {
    1: {
        id: 1,
        name: "Silk Oversized Shirt",
        price: 280,
        image: "/luxury-silk-shirt.jpg",
        category: "tops",
        description:
            "Experience timeless elegance with our signature silk oversized shirt. Crafted from premium 100% mulberry silk, this versatile piece features a relaxed silhouette perfect for layering or wearing as a standalone statement. Delicate mother-of-pearl buttons and hand-finished seams elevate the everyday essential.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Ivory", "Sage", "Charcoal", "Blush"],
    },
    2: {
        id: 2,
        name: "Tailored Wool Trousers",
        price: 320,
        image: "/luxury-wool-trousers.jpg",
        category: "bottoms",
        description:
            "Impeccable tailoring meets modern comfort. These wool trousers are constructed from fine Italian wool with a subtle stretch for all-day wear. The high-rise waist and straight leg create a flattering silhouette while hidden pockets add practical elegance.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Camel", "Gray"],
    },
    3: {
        id: 3,
        name: "Cashmere Knit Sweater",
        price: 380,
        image: "/luxury-cashmere-sweater.png",
        category: "tops",
        description:
            "Ultimate luxury in a sweater. Our cashmere knit is made from 100% pure cashmere sourced from the finest herds. The subtle ribbed texture and thoughtful construction ensure this piece becomes your most treasured wardrobe staple.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Cream", "Black", "Camel", "Burgundy", "Olive"],
    },
    4: {
        id: 4,
        name: "Leather Midi Skirt",
        price: 450,
        image: "/luxury-leather-skirt.jpg",
        category: "bottoms",
        description:
            "Statement elegance with our buttery leather midi skirt. Crafted from the finest Italian leather, this piece features a high waist and A-line silhouette that flatters every shape. A-line skirt that transitions seamlessly from day to night.",
        rating: 4,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Chocolate", "Burgundy"],
    },
    5: {
        id: 5,
        name: "Linen Summer Dress",
        price: 240,
        image: "/luxury-linen-dress.jpg",
        category: "dresses",
        description:
            "Breathable elegance for warm days. This linen summer dress is made from 100% European linen that softens with every wash. The relaxed fit and delicate straps provide comfort without sacrificing style.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Natural", "Sage", "Terracotta"],
    },
    6: {
        id: 6,
        name: "Structured Blazer",
        price: 420,
        image: "/luxury-structured-blazer.jpg",
        category: "outerwear",
        description:
            "Sharp tailoring defines this structured blazer. Single-breasted with notch lapels and subtle padding in the shoulders, it's designed for those who appreciate impeccable construction and timeless style. Perfect for work or evening wear.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Camel", "Charcoal"],
    },
    7: {
        id: 7,
        name: "Satin Slip Dress",
        price: 310,
        image: "/luxury-satin-slip-dress.jpg",
        category: "dresses",
        description:
            "Understated luxury. This satin slip dress drapes beautifully with an elegant bias cut. Ideal for special occasions or layered with a blazer for everyday sophistication. The luxurious sheen of the satin ensures you'll turn heads.",
        rating: 4,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Champagne", "Blush", "Midnight Blue"],
    },
    8: {
        id: 8,
        name: "Premium Denim Jacket",
        price: 380,
        image: "/luxury-denim-jacket.jpg",
        category: "outerwear",
        description:
            "Elevated basics. Our premium denim jacket is crafted from organic cotton and offers a perfect balance of structure and comfort. The clean lines and quality construction make it an essential layering piece.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Light Wash", "Medium Wash", "Dark Wash", "Black"],
    },
    9: {
        id: 9,
        name: "Wide-Leg Linen Pants",
        price: 290,
        image: "/luxury-wide-leg-linen-pants.jpg",
        category: "bottoms",
        description:
            "Effortless ease meets sophisticated style. These wide-leg linen pants feature a high waist and flowing silhouette. Perfect for weekend getaways or relaxed office days, they pair beautifully with everything in your wardrobe.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Natural", "Khaki", "Navy"],
    },
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
    const product = await products[Number.parseInt(params.id)] || products[1]

    return (
        <>
            <Header />
            <main className="bg-background">
                {/* Product Details */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div>
                            <div className="bg-muted rounded-lg overflow-hidden aspect-[3/4] mb-4">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-muted rounded-lg aspect-square overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                                    >
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={`View ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <h1 className="text-4xl font-bold text-primary">{product.name}</h1>
                                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                        <Heart size={24} className="text-muted-foreground hover:text-accent" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    {[...Array(product.rating)].map((_, i) => (
                                        <span key={i} className="text-accent text-lg">
                                            ★
                                        </span>
                                    ))}
                                    <span className="text-muted-foreground ml-2">({product.rating} reviews)</span>
                                </div>
                                <p className="text-3xl font-bold text-primary">${product.price}</p>
                            </div>

                            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{product.description}</p>

                            {/* Color Selection */}
                            <VariantButton colors={product.colors} />

                            {/* Size Selection */}
                            <VariantButton sizes={product.sizes} />

                            {/* Quantity */}
                            <QuantityButton />

                            {/* Add to Cart Button */}
                            <AddToCartButton />
                            {/* Additional Info */}
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
