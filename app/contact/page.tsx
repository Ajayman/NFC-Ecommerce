"use client"
import { toast } from "sonner"
import { Mail, MapPin, Phone } from "lucide-react"
import Form from "next/form"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "../actions/contact-actions"
import { useActionState, useEffect } from "react"
import { type contactFormState } from "../schema"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

export default function Contact() {
    const [formState, formAction, pending] = useActionState<contactFormState, FormData>(submitContactForm, {
        values: {
            fullName: "",
            email: "",
            subject: "",
            message: "",
        },
        errors: null,
        success: false
    })
    useEffect(() => {
        if (formState.success) {
            toast("Your message has been sent successfully!")
        }
    }, [formState.success])

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
                            <p className="text-muted-foreground tracking-wide">+977 9741807557</p>
                            <p className="text-sm text-muted-foreground mt-1 tracking-wide">Every day 10am-6pm </p>
                        </div>

                        <div className="border border-border rounded-lg p-8 text-center bg-background">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Mail size={24} className="text-primary" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
                            <p className="text-muted-foreground tracking-wide">ninafscollection@gmail.com</p>
                            <p className="text-sm text-muted-foreground mt-1 tracking-wide">We'll respond within 24 hours</p>
                        </div>

                        <div className="border border-border rounded-lg p-8 text-center bg-background">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <MapPin size={24} className="text-primary" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-2">Location</h3>
                            <p className="text-muted-foreground tracking-wide">Garud Kunda Road, Bhaktapur</p>
                            <p className="text-sm text-muted-foreground mt-1 tracking-wide">Visit our showroom by appointment</p>
                        </div>
                    </div>
                </section>
                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-3xl">Contact Form</CardTitle>
                            <CardDescription>
                                We will reponse back to you within 24 hours.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form action={formAction} id="contact-form">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            defaultValue={formState.values?.fullName}
                                            disabled={pending}
                                            placeholder="Full Name"
                                            autoComplete="off"
                                        />
                                        <FieldError>{formState.errors?.fullName}</FieldError>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_email">Email</FieldLabel>
                                        <Input
                                            id="id_email"
                                            name="email"
                                            defaultValue={formState.values?.email}
                                            disabled={pending}
                                            placeholder="Your email address"
                                            autoComplete="off"
                                        />
                                        {formState.errors?.email && (
                                            <FieldError>{formState.errors.email}</FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_subject">Subject</FieldLabel>
                                        <Input
                                            id="id_subject"
                                            name="subject"
                                            defaultValue={formState.values?.fullName}
                                            disabled={pending}
                                            placeholder="Topic of your message"
                                            autoComplete="off"
                                        />
                                        {formState.errors?.subject && (
                                            <FieldError>{formState.errors.subject}</FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_message">Message</FieldLabel>
                                        <InputGroup>
                                            <InputGroupTextarea
                                                id="id_message"
                                                name="message"
                                                defaultValue={formState.values?.message}
                                                placeholder="Type Some message here"
                                                rows={6}
                                                className="min-h-24 resize-none"
                                                disabled={pending}
                                            />
                                        </InputGroup>
                                        {formState.errors?.message && (
                                            <FieldError>{formState.errors.message}</FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>
                            </Form>
                        </CardContent>
                        <CardFooter>
                            <Field orientation="horizontal">
                                <Button type="submit" disabled={pending} className="w-full" form="contact-form">
                                    {pending && <Spinner />}
                                    Submit
                                </Button>
                            </Field>
                        </CardFooter>
                    </Card>
                </div>

                {/* FAQ Section */}
                < section className="bg-muted/30 py-16" >
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
                </section >
            </main >
        </>
    )
}
