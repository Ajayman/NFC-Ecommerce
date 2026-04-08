"use server"
import { buyNowSchema, buyNowState, productSchema, type productState } from "../schema";
import { v2 as cloudinary } from 'cloudinary'
import prisma from "@/lib/prisma";
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});

export async function SubmitBuyAction(data: any, _prevState: any, formData: FormData) {
    const values = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phoneNumber: formData.get("phoneNumber"),
        fullAddress: formData.get("fullAddress")
    }
    console.log("Action Values", values);
    const result = buyNowSchema.safeParse(values);
    if (!result.success) {
        console.log(result.error)
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        } as buyNowState
    }
    try {
        const res = await prisma.buyNow.create({
            data: {
                productId: data.productId,
                productName: data.name,
                quantity: data.quantity,
                color: data.selectedColor,
                size: data.selectedSize,
                fullname: result.data.fullName,
                email: result.data.email,
                phoneNumber: result.data.phoneNumber,
                fullAddress: result.data.fullAddress
            }
        })
        if (res) {
            return {
                values: {
                    fullName: res.fullname,
                    email: res.email,
                    phoneNumber: res.phoneNumber,
                    fullAddress: res.fullAddress
                },
                success: true,
                errors: null
            } as buyNowState
        } return {
            values,
            success: false,
            errors: { general: ["Something went wrong"] }
        }
    } catch (e) {
        return {
            values,
            success: false,
            errors: { general: ["Something went wrong"] }
        } as buyNowState
    }
}
export async function SubmitProductAction(_prevState: productState, formData: FormData) {
    const values = {
        name: formData.get("name"),
        description: formData.get("description"),
        productType: formData.getAll("productType"),
        image: formData.getAll("image").flatMap((item) => {
            try {
                return JSON.parse(item as string);
            } catch {
                return item;
            }
        }),
        sizes: formData.getAll("sizes") as string[],
        colors: formData.getAll("colors") as string[],
        category: formData.getAll("category") as string[],
        rating: Number(formData.get("rating")),
        price: Number(formData.get("price"))
    }
    console.log(values.image);
    const result = productSchema.safeParse(values);
    if (!result.success) {
        console.log(result.error)
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        } as productState
    }
    // const image_info: {}[] = []
    // values.image.map(async (image) => {
    //     image_info.push({ name: image.public_id, url: image.secure_url })
    // })
    // const image_url: {}[] = []
    // values.image.map(async (image) => {
    //     if (image instanceof File) {
    //         const arrayBuffer = await image.arrayBuffer();
    //         const buffer = Buffer.from(arrayBuffer);
    //         const stream = cloudinary.uploader.upload_stream({}, async (err, res) => {
    //             if (err) {
    //                 throw new Error(err.message)
    //             }
    //             console.log({ res });
    //             image_url.push({
    //                 name: res?.public_id,
    //                 url: res?.secure_url
    //             })
    //         })
    //         streamifier.createReadStream(buffer).pipe(stream);
    //     }
    // })
    const response = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: values.name,
            description: values.description,
            productType: values.productType,
            images: values.image,
            sizes: values.sizes,
            colors: values.colors,
            category: values.category,
            rating: values.rating,
            price: values.price
        })
    })
    const res1 = await response.json();
    if (res1.success) {
        return {
            values: {
                name: "",
                description: "",
                productType: [],
                image: [],
                sizes: [],
                colors: [],
                category: [],
                rating: 0,
                price: 0
            },
            success: true,
            errors: null
        } as productState
    }
    return {
        values,
        success: false,
        errors: res1.errors
    } as productState

}


export async function GetEditProductAction(id: string, _prevState: productState, formData: FormData) {
    const values = {
        name: formData.get("name"),
        description: formData.get("description"),
        productType: formData.getAll("productType"),
        image: formData.getAll("image").flatMap((item) => {
            try {
                return JSON.parse(item as string);
            } catch {
                return item;
            }
        }),
        sizes: formData.getAll("sizes") as string[],
        colors: formData.getAll("colors") as string[],
        category: formData.getAll("category") as string[],
        rating: Number(formData.get("rating")),
        price: Number(formData.get("price"))
    }
    const result = productSchema.safeParse(values);
    if (!result.success) {
        console.log(result.error)
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        } as productState
    }
    const response = await fetch("http://localhost:3000/api/product", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            name: values.name,
            description: values.description,
            productType: values.productType,
            image: values.image,
            sizes: values.sizes,
            colors: values.colors,
            category: values.category,
            rating: values.rating,
            price: values.price
        })
    })
    const res1 = await response.json();
    if (res1.success) {
        return {
            values: {
                name: "",
                description: "",
                productType: [],
                image: [],
                sizes: [],
                colors: [],
                category: [],
                rating: 0,
                price: 0
            },
            success: true,
            errors: null
        } as productState
    }
    return {
        values,
        success: false,
        errors: res1.errors
    } as productState
}

export async function DeleteProductAction(id: string) {
    try {
        const response = await prisma.product.delete({
            where: {
                id
            }
        })
        return {
            success: true,
            message: "Product deleted successfully"
        };
    } catch (e) {
        return {
            success: false, message: "Something went wrong"
        }
    }

}

export async function EditProductAction(id: string) {
    try {
        const response = await prisma.product.findUnique({
            relationLoadStrategy: "join",
            where: {
                id
            },
            include: {
                images: true
            }
        })
        return {
            success: true,
            product: response
        }
    } catch (e) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}