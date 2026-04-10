
"use server"

import { homeInfoState, homeSchema } from "../schema"
function extractHomeValues(formData: FormData) {
    return {
        video: JSON.parse(formData.get("video") as string),
        title: formData.get("title"),
        titleDescription: formData.get("titleDescription")
    }
}

async function submitToApi(
    method: "POST" | "PATCH",
    body: Record<string, unknown>
): Promise<boolean> {
    const response = await fetch("http://localhost:3000/api/home", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
    const res = await response.json();
    console.log("home action", res)
    return res.success
}

async function handleHomeAction(formData: FormData, method: "POST" | "PATCH", extraBody: Record<string, unknown> = {}) {
    const values = extractHomeValues(formData)

    const result = homeSchema.safeParse(values);
    if (!result.success) {
        return { values, success: false, errors: result.error.flatten().fieldErrors } as homeInfoState
    }

    const success = await submitToApi(method, { ...values, ...extraBody })
    return { values, success, errors: null } as homeInfoState
}

export async function SubmitHomeAction(_prevState: homeInfoState, formData: FormData) {
    return handleHomeAction(formData, "POST")
}

export async function SubmitEditHomeAction(
    id: string,
    _prevState: homeInfoState,
    formData: FormData
) {
    return handleHomeAction(formData, "PATCH", { id })
}



// "use server"

// import { homeInfoState, homeSchema } from "../schema"

// export async function SubmitHomeAction(_prevState: homeInfoState, formData: FormData) {
//     const values = {
//         video: JSON.parse(formData.get("video") as string),
//         title: formData.get("title"),
//         titleDescription: formData.get("titleDescription")
//     }
//     console.log(values);
//     const result = homeSchema.safeParse(values);
//     if (!result.success) {
//         return {
//             values,
//             success: false,
//             errors: result.error.flatten().fieldErrors
//         }
//     }
//     const response = await fetch("http://localhost:3000/api/home", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             video: values.video,
//             title: values.title,
//             titleDescription: values.titleDescription
//         }),
//     })
//     const res = await response.json();
//     console.log("home action", res)
//     if (res.success) {
//         return {
//             values,
//             success: true,
//             errors: null
//         }
//     }
//     return {
//         values,
//         success: false,
//         errors: null
//     }
// }

// export async function SubmitEditHomeAction(id: string, _prevState: homeInfoState, formData: FormData) {
//     const values = {
//         video: JSON.parse(formData.get("video") as string),
//         title: formData.get("title"),
//         titleDescription: formData.get("titleDescription")
//     }
//     console.log(values);
//     const result = homeSchema.safeParse(values);
//     if (!result.success) {
//         return {
//             values,
//             success: false,
//             errors: result.error.flatten().fieldErrors
//         }
//     }
//     const response = await fetch("http://localhost:3000/api/home", {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             id: id,
//             video: values.video,
//             title: values.title,
//             titleDescription: values.titleDescription
//         }),
//     })
//     const res = await response.json();
//     console.log("home action", res)
//     if (res.success) {
//         return {
//             values,
//             success: true,
//             errors: null
//         }
//     }
//     return {
//         values,
//         success: false,
//         errors: null
//     }
// }   