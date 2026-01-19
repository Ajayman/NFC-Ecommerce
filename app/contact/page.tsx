"use client"

import Header from "../components/headers"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, you would send this to a backend
        console.log("Form submitted:", formData)
        setSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setSubmitted(false), 5000)
    }

    return (
        <>
            <main className="bg-cyan-50">
                {/* Hero Section */}
                <section className="relative h-80 flex items-center justify-center bg-gradient-to-b from-secondary/20 to-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 text-balance">Get In Touch</h1>
                        <p className="text-lg text-muted-foreground">
                            We'd love to hear from you. Reach out with any questions or feedback.
                        </p>
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="border border-border rounded-lg p-8 text-center bg-background">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Phone size={24} className="text-primary" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-2">Phone</h3>
                            <p className="text-muted-foreground">+977 9741807557</p>
                            <p className="text-sm text-muted-foreground mt-1">Every day 10am-6pm </p>
                        </div>

                        <div className="border border-border rounded-lg p-8 text-center bg-background">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-accent/10 rounded-lg">
                                    <Mail size={24} className="text-accent" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
                            <p className="text-muted-foreground">ninafscollection@gmail.com</p>
                            <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                        </div>

                        <div className="border border-border rounded-lg p-8 text-center bg-background">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <MapPin size={24} className="text-primary" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-2">Location</h3>
                            <p className="text-muted-foreground">Garud Kunda Road, Bhaktapur</p>
                            <p className="text-sm text-muted-foreground mt-1">Visit our showroom by appointment</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="max-w-2xl mx-auto bg-background">
                        <div className="border border-border rounded-lg p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-primary mb-8">Send us a Message</h2>

                            {submitted && (
                                <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-6">
                                    Thank you for your message! We'll get back to you soon.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                                        placeholder="What is this about?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none"
                                        placeholder="Tell us what's on your mind..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    Send Message
                                    <ArrowRight size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-muted/30 py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    q: "What is your return policy?",
                                    a: "We offer 30-day returns on most items in original condition. Please contact our team for details specific to your purchase.",
                                },
                                {
                                    q: "Do you ship internationally?",
                                    a: "Yes! We ship to over 50 countries. Shipping costs and times vary by location.",
                                },
                                {
                                    q: "How can I track my order?",
                                    a: "You'll receive a tracking number via email once your order ships. You can use it to monitor your package.",
                                },
                                {
                                    q: "Can I visit your showroom?",
                                    a: "We accept appointments for our New York showroom. Please contact us to schedule a visit.",
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="border border-border rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-primary mb-3">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
