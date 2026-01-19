import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const featuredCollections = [
    {
      id: 1,
      name: "Cultural Elegance",
      description: "Timeless pieces for the modern woman",
      image: "/tamang-cultural-dress.jpg",
      href: "/shop",
    },
    {
      id: 2,
      name: "Heritage Collection",
      description: "Crafted with tradition and innovation",
      image: "/party-wear.jpeg",
      href: "/shop",
    },
    {
      id: 3,
      name: "Babies Dresses",
      description: "Less is more, perfectly refined",
      image: "/babies-dress.jpg",
      href: "/shop",
    },
  ]

  return (
    <main className="bg-cyan-50">
      {/* Full Viewport Image */}
      <section className="relative w-full h-screen overflow-hidden">
        <img
          src="/1.jpg"
          alt="Boutique Fashion Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </section>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight text-balance">
            Discover Fashion Excellence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Welcome to our boutique, offering curated styles, timeless elegance, premium quality, and unique designs that elevate your everyday fashion.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Explore Collection
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Featured Collections</h2>
          <p className="text-muted-foreground text-lg">Handpicked selections for the discerning tastes</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredCollections.map((collection) => (
            <Link key={collection.id} href={collection.href} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 bg-muted aspect-[4/6]">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                {collection.name}
              </h3>
              <p className="text-muted-foreground mb-3">{collection.description}</p>
              <div className="flex items-center gap-2 text-accent font-semibold">
                View Collection
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Our Story</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Our boutique was created for women who love style with meaning. From handpicked
            fabrics to flattering silhouettes, each design reflects passion, quality, and charm—made
            to move with you, shine with you, and become part of your everyday story.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { number: "500+", label: "Curated Pieces" },
              { number: "50+", label: "Premium Designers" },
              { number: "10k+", label: "Happy Customers" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-green-300 mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-lg mb-8 opacity-90">Browse our full collection and find your perfect piece</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-lg font-semibold hover:bg-secondary transition-colors"
          >
            Start Shopping
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  )
}
