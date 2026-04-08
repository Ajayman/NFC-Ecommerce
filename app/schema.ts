import { title } from "process";
import z from "zod";

const contactFormSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().optional()
})

type contactFormState = {
    values?: z.infer<typeof contactFormSchema>
    errors?: null | Partial<Record<keyof z.infer<typeof contactFormSchema>, string[]>>
    success: boolean
}

const adminLoginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

type adminLoginState = {
    values?: z.infer<typeof adminLoginSchema>
    errors?: null | Partial<Record<keyof z.infer<typeof adminLoginSchema>, string[]>>
    success: boolean
}

const adminSignupSchema = z.object({
    email: z.email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

type adminSignupState = {
    values?: z.infer<typeof adminSignupSchema>
    errors?: null | Partial<Record<keyof z.infer<typeof adminSignupSchema>, string[]>>
    success: boolean
}

const imageType = z.object({
    name: z.string(),
    url: z.string(),
    resource_type: z.string()
})

const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    productType: z.enum(["Featured", "Trending", "New"]).array(),
    image: imageType.array(),
    sizes: z.enum(["XS", "S", "M", "L", "XL", "XXL"]).array(),
    colors: z.string().array(),
    category: z.enum(["Party", "Cultural", "Baby", "Casual", "Formal"]).array(),
    rating: z.number(),
    price: z.number()
})
// const productEditSchema = z.object({
//     id: z.string().optional(),
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     description: z.string().min(10, "Description must be at least 10 characters"),
//     productType: z.enum(["Featured", "Trending", "New"]).array(),
//     sizes: z.enum(["XS", "S", "M", "L", "XL", "XXL"]).array(),
//     colors: z.string().array(),
//     category: z.enum(["Party", "Cultural", "Baby", "Casual", "Formal"]).array(),
//     rating: z.number(),
//     price: z.number()
// })

type productState = {
    values?: z.infer<typeof productSchema>
    errors?: null | Partial<Record<keyof z.infer<typeof productSchema>, string[]>>
    success: boolean
}
const aboutTitleSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters")
})

type aboutTitleState = {
    values?: z.infer<typeof aboutTitleSchema>
    errors?: null | Partial<Record<keyof z.infer<typeof aboutTitleSchema>, string[]>>
    success: boolean
}

const aboutTeamMemberSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    role: z.string().min(2, "Role must be at least 2 characters"),
    image: z.file().max(1_000_000, "Image must be less than 1MB"),
    bio: z.string().min(10, "Bio must be at least 10 characters")
})

type aboutTeamMemberState = {
    values?: z.infer<typeof aboutTeamMemberSchema>
    errors?: null | Partial<Record<keyof z.infer<typeof aboutTeamMemberSchema>, string[]>>
    success: boolean
}

const aboutCoreValueSchema = z.object({
    valueTitle: z.string().min(2, "Value title must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters")
})

type aboutCoreValueState = {
    values?: z.infer<typeof aboutCoreValueSchema>
    errors?: null | Partial<Record<keyof z.infer<typeof aboutCoreValueSchema>, string[]>>
    success: boolean
}

const contactSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    subTitle: z.string().min(10, "Subtitle must be at least 10 characters"),
    email: z.string().email("Invalid email address"),
    emailSubText: z.string().min(10, "Email subtitle must be at least 10 characters"),
    phone: z.string().min(6, "Phone number must be at least 10 characters"),
    openingHours: z.enum(["Everyday 10am - 6pm", "24 hours whole week", "All day 10am - 6pm Saturday Closed"]),
    location: z.string().min(5, "Location must be at least 5 characters"),
    locationSubText: z.string().min(10, "Location subtitle must be at least 10 characters")
})

type contactInfoState = {
    values?: z.infer<typeof contactSchema>
    errors?: null | Partial<Record<keyof z.infer<typeof contactSchema>, string[]>>
    success: boolean
}

const videoType = z.object({
    name: z.string(),
    url: z.string(),
    resource_type: z.string()
})

const homeSchema = z.object({
    video: videoType,
    title: z.string().min(5, "Title must be at least 5 characters"),
    titleDescription: z.string().min(10, "Title description must be at least 10 characters")
})

type homeInfoState = {
    values?: z.infer<typeof homeSchema>
    errors?: null | Partial<Record<keyof z.infer<typeof homeSchema>, string[]>>
    success: boolean
}

const buyNowSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    phoneNumber: z.string().min(6, "Phone number must be at least 6 characters"),
    fullAddress: z.string().min(2, "Full address must be at least 2 characters"),
})

type buyNowState = {
    values?: z.infer<typeof buyNowSchema>
    errors?: null | Partial<Record<keyof z.infer<typeof buyNowSchema>, string[]>>
    success: boolean
}

export { contactFormSchema, type contactFormState, adminLoginSchema, type adminLoginState, adminSignupSchema, type adminSignupState, productSchema, type productState, aboutTitleSchema, type aboutTitleState, aboutTeamMemberSchema, type aboutTeamMemberState, aboutCoreValueSchema, type aboutCoreValueState, contactSchema, type contactInfoState, homeSchema, type homeInfoState, buyNowSchema, type buyNowState };