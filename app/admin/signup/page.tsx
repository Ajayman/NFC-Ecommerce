'use client';

import Form from "next/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { adminSignupState } from "@/app/schema";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { submitSignupAction } from "@/app/actions/signup-action";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
    const [formState, formAction, pending] = useActionState<adminSignupState, FormData>(submitSignupAction, {
        values: {
            username: "",
            email: "",
            password: "",
        },
        errors: null,
        success: false,
    });
    useEffect(() => {
        if (formState.success) {
            toast("Signup successful!")
            redirect("/admin/login");
        }
    }, [formState.success]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="bg-secondary rounded-lg shadow-lg p-8 max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <div className="bg-primary text-primary-foreground rounded-full p-3">
                        <Lock size={24} />
                    </div>
                </div>
                <div className="max-w-2xl mx-auto">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-3xl">Sign Up Form</CardTitle>
                            <CardDescription>
                                Register a new admin account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form action={formAction} id="signup-form">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="username">Username</FieldLabel>
                                        <Input
                                            id="username"
                                            name="username"
                                            disabled={pending}
                                            placeholder="Username"
                                            autoComplete="off"
                                        />
                                        <FieldError>{formState.errors?.username}</FieldError>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_email">Email</FieldLabel>
                                        <Input
                                            id="id_email"
                                            name="email"
                                            disabled={pending}
                                            placeholder="Your email address"
                                            autoComplete="off"
                                        />
                                        {formState.errors?.email && (
                                            <FieldError>{formState.errors.email}</FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_password">Password</FieldLabel>
                                        <Input
                                            id="id_password"
                                            name="password"
                                            type="password"
                                            disabled={pending}
                                            placeholder="password"
                                            autoComplete="off"
                                        />
                                        {formState.errors?.password && (
                                            <FieldError>{formState.errors.password}</FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex-col">
                            <Field orientation="horizontal">
                                <Button type="submit" disabled={pending} className="w-full" form="signup-form">
                                    {pending && <Spinner />}
                                    Submit
                                </Button>
                            </Field>
                            <div className="flex flex-row mt-2">
                                <p>Already Have an account? </p><Link href="/admin/login" className="text-teal-300 hover:underline"> Login</Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
