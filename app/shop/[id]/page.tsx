import { Heart } from "lucide-react"
import VariantButton from "./variantButton"
import QuantityButton from "./quantityButton"
import AddToCartButton from "./addtocartButton"
interface Product {
    id: number
    name: string
    price: number
    image: string
    image_variant: string[]
    category: string
    description: string
    rating: number
    sizes: string[]
    colors: string[]
}

const products: Record<number, Product> = {
    1: {
        id: 1,
        name: "Family Set Party Dress",
        price: 280,
        image: "/party-wear.jpeg",
        image_variant: ["/party-wear.jpeg", "/product/party2.jpg"],
        category: "party",
        description:
            "Experience timeless elegance with our signature silk oversized shirt. Crafted from premium 100% mulberry silk, this versatile piece features a relaxed silhouette perfect for layering or wearing as a standalone statement. Delicate mother-of-pearl buttons and hand-finished seams elevate the everyday essential.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Pink", "Purple", "Red"],
    },
    2: {
        id: 2,
        name: "Tamang Cultural Bridal Lehenga",
        price: 320,
        image: "/tamang-cultural-dress.jpg",
        image_variant: ["/tamang-cultural-dress.jpg"],
        category: "cultural",
        description:
            "Impeccable tailoring meets modern comfort. These wool trousers are constructed from fine Italian wool with a subtle stretch for all-day wear. The high-rise waist and straight leg create a flattering silhouette while hidden pockets add practical elegance.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Red", "Brown"],
    },
    3: {
        id: 3,
        name: "Newari Haku Patasi Gown",
        price: 380,
        image: "/product/cultural.jpg",
        image_variant: ["/product/cultural.jpg"],
        category: "cultural",
        description:
            "Ultimate luxury in a sweater. Our cashmere knit is made from 100% pure cashmere sourced from the finest herds. The subtle ribbed texture and thoughtful construction ensure this piece becomes your most treasured wardrobe staple.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Black"],
    },
    4: {
        id: 4,
        name: "Baby Pasni Velvet Set",
        price: 450,
        image: "/product/baby1.jpg",
        image_variant: ["/product/baby1.jpg"],
        category: "baby",
        description:
            "Statement elegance with our buttery leather midi skirt. Crafted from the finest Italian leather, this piece features a high waist and A-line silhouette that flatters every shape. A-line skirt that transitions seamlessly from day to night.",
        rating: 4,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Red", "Brown"],
    },
    5: {
        id: 5,
        name: "Linen Summer Dress",
        price: 240,
        image: "/luxury-linen-dress.jpg",
        image_variant: ["/luxury-linen-dress.jpg"],
        category: "casual",
        description:
            "Breathable elegance for warm days. This linen summer dress is made from 100% European linen that softens with every wash. The relaxed fit and delicate straps provide comfort without sacrificing style.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Natural", "Sage", "Terracotta"],
    },
    6: {
        id: 6,
        name: "Light Blue Fendy Silk Embroidered Sari Family Set",
        price: 420,
        image: "/product/party2.jpg",
        image_variant: ["/product/party2.jpg"],
        category: "party",
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
        image_variant: ["/luxury-satin-slip-dress.jpg"],
        category: "casual",
        description:
            "Sharp tailoring defines this structured blazer. Single-breasted with notch lapels and subtle padding in the shoulders, it's designed for those who appreciate impeccable construction and timeless style. Perfect for work or evening wear.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Camel", "Charcoal"],
    },
    8: {
        id: 8,
        name: "Heavy Embroidered Lehenga",
        price: 310,
        image: "/product/party1.jpg",
        image_variant: ["/product/party1.jpg"],
        category: "party",
        description:
            "Understated luxury. This satin slip dress drapes beautifully with an elegant bias cut. Ideal for special occasions or layered with a blazer for everyday sophistication. The luxurious sheen of the satin ensures you'll turn heads.",
        rating: 4,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Champagne", "Blush", "Midnight Blue"],
    },
    9: {
        id: 9,
        name: "Wide-Leg Linen Pants",
        price: 380,
        image: "/product/party.jpg",
        image_variant: ["/product/party.jpg"],
        category: "party",
        description:
            "Elevated basics. Our premium denim jacket is crafted from organic cotton and offers a perfect balance of structure and comfort. The clean lines and quality construction make it an essential layering piece.",
        rating: 5,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Light Wash", "Medium Wash", "Dark Wash", "Black"],
    }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    console.log(await params)
    const product = await products[Number.parseInt((await params).id)]
    console.log(product)
    return (
        <>
            <main className="bg-cyan-50">
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
                                {product.image_variant.map((image, i) => (
                                    <div
                                        key={i}
                                        className="bg-muted rounded-lg aspect-square overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                                    >
                                        <img
                                            src={image}
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
