import Header from "../components/headers"
import Link from "next/link"
import { ArrowRight, Award, Globe, Heart } from "lucide-react"

export default function About() {
    return (
        <>
            <Header />
            <main className="bg-background">
                {/* Hero Section */}
                <section className="relative h-96 flex items-center justify-center bg-gradient-to-b from-secondary/20 to-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 text-balance">About Luxe Atelier</h1>
                        <p className="text-lg text-muted-foreground">Discover our story, values, and commitment to excellence</p>
                    </div>
                </section>

                {/* Main Story */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Founded in 2015, Luxe Atelier was born from a passion for curating the world's most exquisite fashion
                            pieces. We began as a small boutique with a simple mission: to bring together exceptional designs from
                            emerging and established designers in one carefully curated space.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Over the years, we've grown into a trusted destination for fashion enthusiasts who value quality,
                            craftsmanship, and timeless elegance. Each piece in our collection is handpicked by our team of fashion
                            experts to ensure it meets our rigorous standards and resonates with our community.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Today, Luxe Atelier stands as a symbol of refined taste and sustainable luxury. We believe fashion should
                            be beautiful, meaningful, and made to last. We're committed to supporting designers who share our values
                            of quality, ethics, and innovation.
                        </p>
                    </div>
                </section>

                {/* Values Section */}
                <section className="bg-muted/30 py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                                    <Award size={32} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">Quality First</h3>
                                <p className="text-muted-foreground">
                                    We are uncompromising in our pursuit of excellence. Every item is inspected and selected with
                                    meticulous attention to detail.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 p-3 bg-accent/10 rounded-lg">
                                    <Heart size={32} className="text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">Sustainability</h3>
                                <p className="text-muted-foreground">
                                    We champion sustainable fashion and work with designers who prioritize ethical production and
                                    environmental responsibility.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                                    <Globe size={32} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">Global Community</h3>
                                <p className="text-muted-foreground">
                                    We celebrate diversity and connect fashion lovers from around the world through our curated
                                    collections.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-bold text-primary mb-12 text-center">Meet Our Team</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {[
                            {
                                role: "Founder & Creative Director",
                                name: "Alessandra Romano",
                                bio: "With over 20 years in fashion, Alessandra curates every collection with an eye for timeless elegance and innovation.",
                            },
                            {
                                role: "Director of Partnerships",
                                name: "James Chen",
                                bio: "James works with emerging designers to bring unique, sustainable pieces to our collections.",
                            },
                        ].map((member, idx) => (
                            <div key={idx} className="border border-border rounded-lg p-8">
                                <div className="w-16 h-16 rounded-full bg-muted mb-4" />
                                <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                                <p className="text-accent mb-3 text-sm font-medium">{member.role}</p>
                                <p className="text-muted-foreground">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-primary text-primary-foreground py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8 text-center">
                            {[
                                { number: "500+", label: "Curated Pieces" },
                                { number: "50+", label: "Premium Designers" },
                                { number: "10k+", label: "Happy Customers" },
                                { number: "11", label: "Years of Excellence" },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                                    <p className="opacity-90">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="bg-muted/50 rounded-2xl p-12 md:p-16 text-center border border-border">
                        <h2 className="text-4xl font-bold text-primary mb-6">Ready to Explore?</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Browse our curated collections and discover pieces that celebrate your individuality
                        </p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Shop Now
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-muted/30 border-t border-border py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            <div>
                                <h3 className="font-bold text-primary mb-4">Luxe Atelier</h3>
                                <p className="text-sm text-muted-foreground">Premium fashion curated for you.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary mb-4">Shop</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>
                                        <a href="#" className="hover:text-primary transition-colors">
                                            All Products
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary transition-colors">
                                            Collections
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary transition-colors">
                                            Sale
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary mb-4">Support</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>
                                        <a href="/contact" className="hover:text-primary transition-colors">
                                            Contact
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary transition-colors">
                                            Shipping
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary transition-colors">
                                            Returns
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary mb-4">Connect</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>
                                        <a href="#" className="hover:text-primary transition-colors">
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary transition-colors">
                                            Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-primary transition-colors">
                                            Newsletter
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                            <p>&copy; 2026 Luxe Atelier. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    )
}
