"use server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary'
import { aboutCoreValueSchema, aboutCoreValueState, aboutTeamMemberSchema, aboutTeamMemberState, aboutTitleSchema, aboutTitleState } from "../schema";
import { refresh } from "next/cache";
import { File } from "buffer";
import streamifier from "streamifier";
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
})
export async function TeamMemberAddAction(id: string, _prevState: aboutTeamMemberState, formData: FormData) {
    const values = {
        name: formData.get("name"),
        role: formData.get("role"),
        bio: formData.get("bio"),
        image: formData.get("image"),
        aboutId: id
    }

    const result = aboutTeamMemberSchema.safeParse(values);
    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        } as aboutTeamMemberState
    }
    if (values.image instanceof File) {
        const arrayBuffer = await values.image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        let image_file = {} as { name: string, url: string };
        const stream = cloudinary.uploader.upload_stream({}, async (err, res) => {
            if (err) {
                throw new Error(err.message);
            }
            // console.log(res);
            image_file = {
                name: res?.public_id || "",
                url: res?.secure_url || ""
            };
            try {
                console.log("server action", res)
                await prisma.aboutTeamMember.create({
                    data: {
                        name: result.data.name,
                        // imageUrl: image_file.url,
                        role: result.data.role,
                        bio: result.data.bio,
                        aboutId: id
                    }
                })
                return {
                    values,
                    success: true,
                    errors: null
                } as aboutTeamMemberState
            } catch (e) {
                return {
                    values,
                    success: false,
                    errors: "Something went wrong"
                } as aboutTeamMemberState
            }
        })
        streamifier.createReadStream(buffer).pipe(stream);
    }

}
export async function TeamMemberEditAction(id: string, _prevState: aboutTeamMemberState, formData: FormData) {
    const values = {
        name: formData.get("name"),
        role: formData.get("role"),
        bio: formData.get("bio"),
        aboutId: id
    }
    console.log(values);
    const result = aboutTeamMemberSchema.safeParse(values);
    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }
    try {
        console.log("server action")
        const res = await prisma.aboutTeamMember.update({
            where: {
                id
            },
            data: {
                name: result.data.name,
                role: result.data.role,
                bio: result.data.bio
            }
        })
        return {
            values: res,
            success: true,
            errors: null
        }
    } catch (e) {
        return {
            values: {
                name: "",
                role: ""
            },
            success: false,
            message: "Something went wrong"
        }
    }
}
export async function DeleteTeamMemberAction(id: string) {
    try {
        const res = await prisma.aboutTeamMember.delete({
            where: {
                id
            }
        })
        return {
            success: true,
            message: "Team member deleted successfully"
        }
    } catch (e) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function GetTeamMemberByIdAction(id: string) {
    try {
        const res = await prisma.aboutTeamMember.findUnique({
            where: {
                id
            }
        })
        return {
            success: true,
            teamMember: res
        }
    } catch (e) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function AboutCoreValueAddAction(id: string, _prevState: aboutCoreValueState, formData: FormData) {
    const values = {
        valueTitle: formData.get("valueTitle"),
        description: formData.get("coreValueDescription"),
        aboutId: id
    }

    const result = aboutCoreValueSchema.safeParse(values);
    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }
    try {
        const res = await prisma.aboutCoreValue.create({
            data: {
                valueTitle: result.data.valueTitle,
                description: result.data.description,
                aboutId: id
            }
        })
        return {
            values,
            success: true,
            errors: null
        }
    } catch (e) {
        return {
            values: {
                valueTitle: "",
                description: ""
            },
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function DeleteCoreValueAction(id: string) {
    try {
        const res = await prisma.aboutCoreValue.delete({
            where: {
                id
            }
        })
        return {
            success: true,
            message: "Core value deleted successfully"
        }
    } catch (e) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function GetCoreValueByIdAction(id: string) {
    try {
        const res = await prisma.aboutCoreValue.findUnique({
            where: {
                id
            }
        })
        return {
            success: true,
            coreValue: res
        }
    } catch (e) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function EditCoreValueAction(id: string, _prevState: aboutCoreValueState, formData: FormData) {
    const values = {
        valueTitle: formData.get("valueTitle"),
        description: formData.get("description")
    }

    const result = aboutCoreValueSchema.safeParse(values);
    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }
    try {
        const res = await prisma.aboutCoreValue.update({
            where: {
                id
            },
            data: {
                valueTitle: result.data.valueTitle,
                description: result.data.description
            }
        })
        return {
            values,
            success: true,
            errors: null
        }
    } catch (e) {
        return {
            values: {
                valueTitle: "",
                description: ""
            },
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function AboutTitleAddAction(_prevState: aboutTitleState, formData: FormData) {
    const values = {
        title: formData.get("title"),
        description: formData.get("description")
    }

    const result = aboutTitleSchema.safeParse(values);
    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }
    try {
        const res = await prisma.about.create({
            data: {
                pageTitle: result.data.title,
                description: result.data.description
            }
        })
        return {
            values,
            success: true,
            errors: null
        }
    } catch (e) {
        return {
            values,
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function AboutTitleEditAction(id: string, _prevState: aboutTitleState, formData: FormData) {
    const values = {
        title: formData.get("title"),
        description: formData.get("description")
    }

    const result = aboutTitleSchema.safeParse(values);
    if (!result.success) {
        return {
            values,
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }
    try {
        const res = await prisma.about.update({
            data: {
                pageTitle: result.data.title,
                description: result.data.description
            },
            where: {
                id
            }
        })
        refresh(); // Refresh the cache to get the updated data
        return {
            values: { ...values },
            success: true,
            errors: null
        }
    } catch (e) {
        return {
            values: {
                title: "",
                description: ""
            },
            success: false,
            message: "Something went wrong"
        }
    }
}
