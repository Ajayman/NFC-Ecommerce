"use server"
import { adminSignupSchema, adminSignupState } from "../schema"

export async function submitSignupAction(_prevState: adminSignupState, formData: FormData) {
    const values = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    }
    const result = adminSignupSchema.safeParse(values);
    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        } as adminSignupState
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: result.data.username,
            email: result.data.email,
            password: result.data.password
        }),
    }
    )
    if (!response.ok) {
        return {
            values,
            success: false,
            errors: { error: [(await response.json())] },
        } as adminSignupState

    }
    return {
        values: {
            username: "",
            email: "",
            password: "",
        },
        errors: null,
        success: true,
    } as adminSignupState
}