"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, ShoppingBag, X } from "lucide-react"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-background border-b border-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-primary">LuxeAtelierCo</div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
                            Home
                        </Link>
                        <Link href="/shop" className="text-sm font-medium hover:text-accent transition-colors">
                            Shop
                        </Link>
                        <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
                            About
                        </Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Cart */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <ShoppingBag size={20} />
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <nav className="md:hidden pb-4 flex flex-col gap-3">
                        <Link
                            href="/"
                            className="text-sm font-medium hover:text-accent transition-colors block py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="text-sm font-medium hover:text-accent transition-colors block py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium hover:text-accent transition-colors block py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium hover:text-accent transition-colors block py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
}
