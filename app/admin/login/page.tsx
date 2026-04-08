'use client';

import Form from "next/form";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { adminLoginState } from "@/app/schema";
import { useActionState } from "react";
import { SubmitLoginAction } from "@/app/actions/login-action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function AdminLogin() {
    const [formState, formAction, pending] = useActionState<adminLoginState, FormData>(SubmitLoginAction, {
        values: {
            username: "",
            password: "",
        },
        errors: null,
        success: false,
    });
    console.log(formState.errors)
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
                            <CardTitle className="text-3xl">Admin Login</CardTitle>
                            <CardDescription>
                                Enter username and password to access the admin panel
                            </CardDescription>
                            <CardAction>
                                <Link href="/admin/signup" className="text-primary hover:underline">
                                    Sign up
                                </Link>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <Form action={formAction} id="login-form">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="id_username">Username</FieldLabel>
                                        <Input
                                            id="id_username"
                                            name="username"
                                            defaultValue={formState.values?.username}
                                            disabled={pending}
                                            placeholder="Username"
                                            autoComplete="off"
                                        />
                                        {formState.errors && (
                                            <FieldError>{formState.errors.username}</FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_password">Password</FieldLabel>
                                        <Input
                                            id="id_password"
                                            name="password"
                                            disabled={pending}
                                            placeholder="Enter Password"
                                            autoComplete="off"
                                        />
                                        {formState.errors && (
                                            <FieldError>{formState.errors.password}</FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>
                            </Form>
                        </CardContent>
                        <CardFooter>
                            <Field orientation="horizontal">
                                <Button type="submit" disabled={pending} className="w-full" form="login-form">
                                    {pending && <Spinner />}
                                    Submit
                                </Button>
                            </Field>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
