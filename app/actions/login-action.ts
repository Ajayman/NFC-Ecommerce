"use server"

import { redirect } from "next/navigation";
import { adminLoginSchema, type adminLoginState } from "../schema"
import { cookies } from "next/headers";

export async function SubmitLoginAction(_prevState: adminLoginState, formData: FormData) {
    const cookieStore = await cookies()
    const values = {
        username: formData.get("username"),
        password: formData.get("password"),
    }
    const result = adminLoginSchema.safeParse(values)

    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        } as adminLoginState
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: result.data.username,
                password: result.data.password
            }),
        })
        const res = await response.json();
        console.log("login action", res)
        if (res.success) {
            cookieStore.set("Authorization", res.token, {
                expires: Date.now() + 60 * 60 * 1000,
            });
        }
    } catch (error) {
        console.error("Error during fetch:", error);
    }
    redirect('/admin')
}