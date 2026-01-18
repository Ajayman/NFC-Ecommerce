"use client"

import Header from "../components/headers"
import { useState } from "react"
import Link from "next/link"
import { Filter, ChevronDown } from "lucide-react"

interface Product {
    id: number
    name: string
    price: number
    image: string
    category: string
    rating: number
}

const products: Product[] = [
    { id: 1, name: "Silk Oversized Shirt", price: 280, image: "/luxury-silk-shirt.jpg", category: "tops", rating: 5 },
    {
        id: 2,
        name: "Tailored Wool Trousers",
        price: 320,
        image: "/luxury-wool-trousers.jpg",
        category: "bottoms",
        rating: 5,
    },
    {
        id: 3,
        name: "Cashmere Knit Sweater",
        price: 380,
        image: "/luxury-cashmere-sweater.png",
        category: "tops",
        rating: 5,
    },
    {
        id: 4,
        name: "Leather Midi Skirt",
        price: 450,
        image: "/luxury-leather-skirt.jpg",
        category: "bottoms",
        rating: 4,
    },
    {
        id: 5,
        name: "Linen Summer Dress",
        price: 240,
        image: "/luxury-linen-dress.jpg",
        category: "dresses",
        rating: 5,
    },
    {
        id: 6,
        name: "Structured Blazer",
        price: 420,
        image: "/luxury-structured-blazer.jpg",
        category: "outerwear",
        rating: 5,
    },
    { id: 7, name: "Satin Slip Dress", price: 310, image: "/luxury-satin-slip-dress.jpg", category: "dresses", rating: 4 },
    {
        id: 8,
        name: "Premium Denim Jacket",
        price: 380,
        image: "/luxury-denim-jacket.jpg",
        category: "outerwear",
        rating: 5,
    },
    {
        id: 9,
        name: "Wide-Leg Linen Pants",
        price: 290,
        image: "/luxury-wide-leg-linen-pants.jpg",
        category: "bottoms",
        rating: 5,
    },
]

const categories = [
    { id: "all", label: "All Products" },
    { id: "tops", label: "Tops" },
    { id: "bottoms", label: "Bottoms" },
    { id: "dresses", label: "Dresses" },
    { id: "outerwear", label: "Outerwear" },
]

const sortOptions = [
    { id: "featured", label: "Featured" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "newest", label: "Newest" },
]

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedSort, setSelectedSort] = useState("featured")
    const [showFilters, setShowFilters] = useState(false)

    const filteredProducts =
        selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (selectedSort === "price-low") return a.price - b.price
        if (selectedSort === "price-high") return b.price - a.price
        return 0
    })

    return (
        <>
            <Header />
            <main className="bg-background">
                {/* Page Header */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-5xl font-bold text-primary mb-4">Our Collections</h1>
                    <p className="text-muted-foreground text-lg">
                        Discover our carefully curated selection of premium fashion pieces
                    </p>
                </section>

                {/* Filters and Sorting */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Category Filters */}
                        <div className="md:w-48">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden flex items-center gap-2 font-semibold text-primary mb-4"
                            >
                                <Filter size={20} />
                                Filters
                            </button>

                            <div className={`${showFilters ? "block" : "hidden"} md:block space-y-3`}>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted text-foreground"
                                            }`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="flex-1">
                            {/* Sort Dropdown */}
                            <div className="flex justify-between items-center mb-8">
                                <p className="text-sm text-muted-foreground">Showing {sortedProducts.length} products</p>
                                <div className="relative">
                                    <select
                                        value={selectedSort}
                                        onChange={(e) => setSelectedSort(e.target.value)}
                                        className="appearance-none bg-background border border-border px-4 py-2 rounded-lg text-foreground cursor-pointer pr-10"
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown
                                        size={16}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
                                    />
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="grid md:grid-cols-3 gap-8">
                                {sortedProducts.map((product) => (
                                    <Link key={product.id} href={`/shop/${product.id}`} className="group">
                                        <div className="relative overflow-hidden rounded-lg mb-4 bg-muted aspect-[3/4]">
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                                                ${product.price}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(product.rating)].map((_, i) => (
                                                <span key={i} className="text-accent">
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground text-sm">Premium Collection</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
