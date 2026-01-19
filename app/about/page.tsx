import Header from "../../components/headers"
import Link from "next/link"
import { ArrowRight, Award, Globe, Heart } from "lucide-react"
import { url } from "inspector"

export default function About() {
    return (
        <>
            <main className="bg-cyan-50">
                {/* Hero Section */}
                <section className="relative h-96 flex items-center justify-center bg-gradient-to-b from-secondary/20 to-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 text-balance">About Nina Fashion Collection</h1>
                        <p className="text-lg text-muted-foreground">Discover our story, values, and commitment to excellence</p>
                    </div>
                </section>

                {/* Main Story */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Every morning in Bhaktapur, the first light slips through the wooden window and touches
                            the fabrics inside our boutique. Maya opens the door, just like her mother did years ago,
                            and the scent of incense mixes with fresh air from the square.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Each scarf, each handmade
                            piece carries a story—from the looms of nearby villages to the careful hands that shaped
                            them. Tourists pass, locals smile, and the city slowly wakes.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            When a customer chooses something,
                            Maya knows they are not just buying an item—they are carrying a small piece of Bhaktapur’s morning,
                            its warmth, and its quiet beauty.
                        </p>
                    </div>
                </section>

                {/* Values Section */}
                <section className="bg-muted/30 py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center bg-background py-10 border">
                                <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                                    <Award size={32} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">Quality First</h3>
                                <p className="text-muted-foreground">
                                    We are uncompromising in our pursuit of excellence. Every item is inspected and selected with
                                    meticulous attention to detail.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center bg-background py-10 border">
                                <div className="mb-4 p-3 bg-accent/10 rounded-lg">
                                    <Heart size={32} className="text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">Sustainability</h3>
                                <p className="text-muted-foreground">
                                    We champion sustainable fashion and work with designers who prioritize ethical production and
                                    environmental responsibility.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center bg-background py-10 border">
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
                                role: "Founder & Designer",
                                name: "Nina Prajapati",
                                bio: "With over 10 years in fashion design, Nina curates every collection with an eye for timeless elegance and innovation.",
                                url: "/team/nina.jpg"
                            },
                            {
                                role: "Head Master",
                                name: "Taj Alam",
                                bio: "Taj Alam works with emerging designers to bring unique, sustainable pieces to our collections.",
                                url: "/team/taj.webp"
                            },
                        ].map((member, idx) => (
                            <div key={idx} className="border border-border rounded-lg p-8 bg-background">
                                <img className="w-16 h-16 rounded-full bg-muted mb-4" src={member.url} />
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
                                { number: "1k+", label: "Happy Customers" },
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
            </main>
        </>
    )
}
