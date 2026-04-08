"use server"

import prisma from "@/lib/prisma"
import { contactFormSchema, contactInfoState, contactSchema, type contactFormState } from "../schema"

export async function submitContactForm(_prevState: contactFormState, formData: FormData) {
    const values = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
    }
    const result = contactFormSchema.safeParse(values)
    console.log(result, result)
    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        } as contactFormState
    }

    const res = await prisma.contact.create({
        data: {
            fullName: result.data.fullName,
            email: result.data.email,
            subject: result.data.subject,
            message: result.data.message || ""
        }
    })
    console.log("Saved contact form:", res)
    return {
        values: {
            fullName: "",
            email: "",
            subject: "",
            message: "",
        },
        errors: null,
        success: true,
    }
}

export async function SubmitContactAction(_prevState: contactInfoState, formData: FormData) {
    const values = {
        title: formData.get("title"),
        subTitle: formData.get("subTitle"),
        phone: formData.get("phone"),
        openingHours: formData.get("openingHours"),
        email: formData.get("email"),
        emailSubText: formData.get("emailSubText"),
        location: formData.get("location"),
        locationSubText: formData.get("locationSubText")
    }
    const result = contactSchema.safeParse(values);
    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        } as contactInfoState
    }
    try {
        await prisma.contactInfo.create({
            data: {
                title: result.data.title,
                subTitle: result.data.subTitle,
                phone: result.data.phone,
                openingHours: result.data.openingHours,
                email: result.data.email,
                emailSubText: result.data.emailSubText,
                location: result.data.location,
                locationSubText: result.data.locationSubText
            }
        })
        return {
            values,
            success: true,
            errors: null
        } as contactInfoState
    } catch (e) {
        console.error("Error saving contact info:", e)
        return {
            values,
            success: false,
            errors: "Something went wrong while saving contact information"
        } as contactInfoState
    }
}

export async function SubmitContactEditAction(id: string, _prevState: contactInfoState, formData: FormData) {
    const values = {
        title: formData.get("title"),
        subTitle: formData.get("subTitle"),
        phone: formData.get("phone"),
        openingHours: formData.get("openingHours"),
        email: formData.get("email"),
        emailSubText: formData.get("emailSubText"),
        location: formData.get("location"),
        locationSubText: formData.get("locationSubText")
    }
    const result = contactSchema.safeParse(values);
    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        } as contactInfoState
    }
    try {
        await prisma.contactInfo.update({
            where: {
                id
            },
            data: {
                title: result.data.title,
                subTitle: result.data.subTitle,
                phone: result.data.phone,
                openingHours: result.data.openingHours,
                email: result.data.email,
                emailSubText: result.data.emailSubText,
                location: result.data.location,
                locationSubText: result.data.locationSubText
            }
        })
        return {
            values,
            success: true,
            errors: null
        } as contactInfoState
    } catch (e) {
        console.error("Error saving contact info:", e)
        return {
            values,
            success: false,
            errors: "Something went wrong while saving contact information"
        } as contactInfoState
    }
}   