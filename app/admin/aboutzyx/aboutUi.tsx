'use client';

import { useActionState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form";
import Image from "next/image";
import { AboutCoreValueAddAction, AboutTitleAddAction, AboutTitleEditAction, DeleteCoreValueAction, DeleteTeamMemberAction, EditCoreValueAction, GetCoreValueByIdAction, GetTeamMemberByIdAction, TeamMemberAddAction, TeamMemberEditAction } from "@/app/actions/aboutTitleAddEditAction";
import { aboutCoreValueState, aboutTeamMemberState, aboutTitleState } from "@/app/schema";
import { use } from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useSwr from "swr";
type About = {
    pageTitle: string,
    description: string,
}

type PageTitle = {
    title: string,
    description: string
}

type CoreValue = {
    id: string,
    valueTitle: string,
    description: string
}

type TeamMember = {
    name: string,
    role: string,
    bio: string,
    image: string
}
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AboutAdminUI({ aboutData }: { aboutData: Promise<any> }) {
    const [open, setOpen] = useState(false);
    const [openCoreEdit, setOpenCoreEdit] = useState(false);
    const router = useRouter();
    const getAboutData = use(aboutData);
    const { data, error, isLoading } = useSwr(`http://localhost:3000/api/about/coreValues/${getAboutData[0]?.id}`, fetcher);
    if (error) {
        toast.error("Failed to load core values");
    }
    const { data: teamMembers, error: teamError, isLoading: teamLoading } = useSwr(`http://localhost:3000/api/about/teamMembers/${getAboutData[0]?.id}`, fetcher);
    if (teamError) {
        toast.error("Failed to load team members");
    }
    const [aboutDataFetch, setAboutDataFetch] = useState<About>(getAboutData[0]);
    const [coreState, setCoreState] = useState<CoreValue>();
    const [formState, formAction, pending] = useActionState<aboutTitleState, FormData>(AboutTitleAddAction, {
        values: {
            title: aboutDataFetch?.pageTitle || "",
            description: aboutDataFetch?.description || ""
        },
        success: false,
        message: ""
    });
    const [openTeamEdit, setOpenTeamEdit] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageEditFile, setImageEditFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [previewEditUrl, setPreviewEditUrl] = useState<string | null>(null);
    const [teamMemberState, setTeamMemberState] = useState<TeamMember>();
    const [formTeamMemberState, formTeamAction, pendingTeamMember] = useActionState<aboutTeamMemberState, FormData>(TeamMemberAddAction.bind(null, getAboutData[0]?.id), {
        values: {
            name: "",
            role: "",
            bio: "",
            image: File || "",
            aboutId: getAboutData[0]?.id || ""
        },
        errors: null,
        success: false
    })

    const handleTeamEdit = async (id: string) => {
        const response = await GetTeamMemberByIdAction(id);
        if (response.success && response.teamMember) {
            setTeamMemberState({ name: response.teamMember.name, role: response.teamMember.role, bio: response.teamMember.bio, image: response.teamMember.imageUrl });
            setPreviewEditUrl(response.teamMember.imageUrl);
            setOpenTeamEdit(true);
        }
        else {
            toast("Something went wrong");
        }
    }
    const handleTeamDelete = async (id: string) => {
        console.log("Team Id", id);
        const response = DeleteTeamMemberAction(id);
        if ((await response).success) {
            toast(`${(await response).message}` + id);
            router.refresh();
        }
    }
    const initialTeamMemberEditState = {
        values: {
            name: teamMemberState?.name || "",
            role: teamMemberState?.role || "",
            bio: teamMemberState?.bio || "",
            image: imageEditFile,
            aboutId: getAboutData[0]?.id || ""
        },
        errors: null,
        success: false
    }

    const [formTeamMemberEditState, formTeamEditAction, pendingEditTeamMember] = useActionState<aboutTeamMemberState, FormData>(TeamMemberEditAction.bind(null, getAboutData[0]?.id),
        initialTeamMemberEditState)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setImageFile(file)
    }
    const handleEditImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setImageEditFile(file)
    }
    useEffect(() => {
        if (formTeamMemberState.success) {
            toast("Team Member Created Successfully");
            router.refresh();
        }
    }, [formTeamMemberState.success])

    useEffect(() => {
        if (imageFile) {
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);
        }
    }, [imageFile])
    useEffect(() => {
        if (imageEditFile) {
            const url = URL.createObjectURL(imageEditFile);
            setPreviewEditUrl(url);
        }
    }, [imageEditFile])
    const removeImage = () => {
        setImageFile(null)
        setPreviewUrl(null)
        if (formTeamMemberState.values?.image) {
            // formTeamMemberState.values.image = 
        }
    }
    const removeEditImage = () => {
        setImageEditFile(null)
        setPreviewEditUrl(null)
    }
    const [formEditState, formEditAction, pendingEdit] = useActionState<aboutTitleState, FormData>(AboutTitleEditAction.bind(null, getAboutData[0]?.id), {
        values: {
            title: getAboutData[0]?.pageTitle || "",
            description: getAboutData[0]?.description || ""
        },
        success: false,
        message: ""
    })

    function handleEditAbout(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setOpen(true);
    }

    const handleCoreEdit = async (id: string) => {
        const response = await GetCoreValueByIdAction(id);
        if (response.success && response.coreValue) {
            console.log(response.coreValue);
            setCoreState(response.coreValue);
            setOpenCoreEdit(true);
        }
        else {
            toast("Something went wrong");
        }
    }
    const initialCoreState = {
        values: {
            valueTitle: coreState?.valueTitle || "",
            description: coreState?.description || "",
        },
        errors: null,
        success: false
    }

    const [formEditCoreState, formEditCoreAction, pendingEditCore] = useActionState<aboutCoreValueState, FormData>(EditCoreValueAction.bind(null, getAboutData[0]?.id), initialCoreState)

    const handleCoreDelete = async (id: string) => {
        const response = DeleteCoreValueAction(id);
        if ((await response).success) {
            toast(`${(await response).message}` + id);
            router.refresh();
        }
    }
    const [formCoreValueState, coreFormAction, pendingCoreValue] = useActionState<aboutCoreValueState, FormData>(AboutCoreValueAddAction.bind(null, getAboutData[0]?.id), {
        values: {
            valueTitle: "",
            description: "",
            aboutId: getAboutData[0]?.id || ""
        },
        errors: null,
        success: false
    })

    useEffect(() => {
        if (formEditState.success) {
            toast("Changes saved successfully!");
            setOpen(false);
            setAboutDataFetch({
                pageTitle: formEditState.values?.title || "",
                description: formEditState.values?.description || ""
            });
            router.refresh();
        }
    }, [formEditState.success]);

    useEffect(() => {
        if (formCoreValueState.success) {
            toast("Core value added successfully!");
            router.refresh();
        }
    }, [formCoreValueState.success]);

    useEffect(() => {
        if (formEditCoreState.success) {
            toast("Core value updated successfully!");
            setOpenCoreEdit(false);
            router.refresh();
        }
    }, [formEditCoreState.success]);
    return (
        <div className="flex bg-background min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-primary mb-2">About Page</h1>
                        <p className="text-muted-foreground">Manage your boutique story and team</p>
                    </div>
                </div>


                {/* <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
            Changes saved successfully!
          </div> */}

                <Card className="mb-6 bg-secondary text-2xl">
                    {/* Title and Description */}
                    <CardHeader>
                        <CardTitle>Main Section<button
                            className="p-2 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                            title="Edit"
                            onClick={(event) => handleEditAbout(event)}
                        >
                            <Edit2 size={18} />
                        </button></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form action={formAction}>
                            <Field className="mb-4">
                                <FieldLabel className="block text-sm font-medium mb-2">Page Title</FieldLabel>
                                <Input
                                    id="id_page_title"
                                    name="title"
                                    disabled={formState.values ? true : false}
                                    placeholder="Product Title"
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    defaultValue={formState.values?.title}
                                />
                                {formState?.errors?.title && <span className="text-red-600 text-sm">{formState.errors.title}</span>}
                            </Field>

                            <Field>
                                <FieldLabel className="block text-sm font-medium mb-2">Description</FieldLabel>
                                <Textarea
                                    name="description"
                                    disabled={formState.values ? true : false}
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none min-h-[180px] focus:ring-2 focus:ring-primary"
                                    defaultValue={formState.values?.description}
                                />
                                {formState?.errors?.description && (
                                    <span className="text-red-600 text-sm">{formState.errors.description}</span>
                                )}
                            </Field>
                            <CardAction className="mt-4">
                                <Button disabled={formState.values ? true : false} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                                    Save
                                </Button>
                            </CardAction>
                        </Form>
                    </CardContent>
                </Card>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[825px]">
                        <Form action={formEditAction}>
                            <DialogHeader>
                                <DialogTitle>Fill Form To Add Product</DialogTitle>
                            </DialogHeader>
                            <Card className="h-[400px] overflow-y-scroll">
                                <CardContent>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="id_name">Product Name</FieldLabel>
                                            <Input
                                                id="id_name"
                                                name="title"
                                                disabled={pendingEdit}
                                                placeholder="Product name"
                                                autoComplete="off"
                                                defaultValue={formEditState.values?.title}
                                            />
                                            {formEditState?.errors?.title && <span className="text-red-600 text-sm">{formEditState.errors.title}</span>}
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="id_description">Description</FieldLabel>
                                            <InputGroupTextarea
                                                id="id_description"
                                                name="description"
                                                disabled={pendingEdit}
                                                placeholder="Product Description"
                                                autoComplete="off"
                                                className="border min-h-[150px]"
                                                defaultValue={formEditState.values?.description}
                                            />
                                            {formEditState?.errors?.description && (
                                                <span className="text-red-600 text-sm">{formEditState.errors.description}</span>
                                            )}
                                        </Field>

                                    </FieldGroup>
                                </CardContent>
                            </Card>
                            <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">{pending ? 'Submitting...' : 'Update About'}</Button>
                            </DialogFooter>
                        </Form>
                    </DialogContent>
                </Dialog>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <Card className="col-span-2 bg-secondary text-2xl">
                        {/* Title and Description */}
                        <CardHeader>
                            <CardTitle>Core Values</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form action={coreFormAction}>
                                <Field className="mb-4">
                                    <FieldLabel htmlFor="id_value_title" className="block text-sm font-medium">Value Title</FieldLabel>
                                    <Input
                                        id="id_value_title"
                                        name="valueTitle"
                                        disabled={pendingCoreValue}
                                        placeholder="Value Title"
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    {formCoreValueState?.errors?.valueTitle && <span className="text-red-600 text-sm">{formCoreValueState.errors.valueTitle}</span>}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="id_core_value_description" className="block text-sm font-medium mb-2">Description</FieldLabel>
                                    <Textarea
                                        id="id_core_value_description"
                                        rows={6}
                                        name="coreValueDescription"
                                        disabled={pendingCoreValue}
                                        placeholder="Value Description"
                                        className="w-full px-4 py-2 border border-border min-h-[180px] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    {formCoreValueState?.errors?.description && (
                                        <span className="text-red-600 text-sm">{formCoreValueState.errors.description}</span>
                                    )}
                                </Field>
                                <CardAction className="mt-4">
                                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                                        Save
                                    </button>
                                </CardAction>
                            </Form>
                        </CardContent>
                    </Card>
                    <div className="bg-secondary rounded-lg border border-border">
                        <table className="w-full">
                            <thead className="bg-primary/10 border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Core Value</th>
                                    {/* <th className="px-6 py-4 text-left text-sm font-semibold">Description</th> */}
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center">
                                            Loading core values...
                                        </td>
                                    </tr>
                                ) : data.res.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center">
                                            No core values found.
                                        </td>
                                    </tr>
                                ) : (
                                    data.res.map((core: any) => (
                                        <tr key={core.id} className="border-b border-border hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-4 font-medium">{core.valueTitle}</td>
                                            {/* <td className="px-6 py-4 capitalize text-muted-foreground">{core.description}</td> */}
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        className="p-2 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                                                        title="Edit"
                                                        onClick={() => handleCoreEdit(core.id)}
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        className="p-2 hover:bg-red-100 rounded text-red-600 transition-colors"
                                                        title="Delete"
                                                        onClick={() => handleCoreDelete(core.id)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Dialog open={openCoreEdit} onOpenChange={setOpenCoreEdit}>
                        <DialogContent className="sm:max-w-[825px]">
                            <Form action={formEditCoreAction}>
                                <DialogHeader>
                                    <DialogTitle>Fill Form To Edit Core Value</DialogTitle>
                                </DialogHeader>
                                <Card className="h-[400px] overflow-y-scroll">
                                    <CardContent>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="id_name">Core Value Name</FieldLabel>
                                                <Input
                                                    id="id_name"
                                                    name="valueTitle"
                                                    disabled={pendingEditCore}
                                                    placeholder="Core Value name"
                                                    autoComplete="off"
                                                    defaultValue={formEditCoreState.values?.valueTitle}
                                                />
                                                {formEditCoreState?.errors?.valueTitle && <span className="text-red-600 text-sm">{formEditCoreState.errors.valueTitle}</span>}
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="id_description">Description</FieldLabel>
                                                <InputGroupTextarea
                                                    id="id_description"
                                                    name="description"
                                                    disabled={pendingEditCore}
                                                    placeholder="Product Description"
                                                    autoComplete="off"
                                                    className="border min-h-[150px]"
                                                    defaultValue={formEditCoreState.values?.description}
                                                />
                                                {formEditCoreState?.errors?.description && (
                                                    <span className="text-red-600 text-sm">{formEditCoreState.errors.description}</span>
                                                )}
                                            </Field>

                                        </FieldGroup>
                                    </CardContent>
                                </Card>
                                <DialogFooter className="mt-4">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">{pending ? 'Submitting...' : 'Update'}</Button>
                                </DialogFooter>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
                {/* <TeamMember aboutData={getAboutData[0]} /> */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <Card className="col-span-2 bg-secondary text-2xl">
                        <CardHeader>
                            <CardTitle>Team Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form action={formTeamAction}>
                                <Field className="mb-4">
                                    <FieldLabel className="block text-sm font-medium">Name</FieldLabel>
                                    <Input
                                        id="id_team_member_name"
                                        name="name"
                                        disabled={false}
                                        placeholder="Team Member Name"
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    {formTeamMemberState?.errors?.name && <span className="text-red-600 text-sm">{formTeamMemberState.errors.name}</span>}
                                </Field>

                                <Field className="mb-4">
                                    <FieldLabel className="block text-sm font-medium">Role</FieldLabel>
                                    <Input
                                        id="id_team_member_role"
                                        name="role"
                                        disabled={false}
                                        placeholder="Team Member Role"
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    {formTeamMemberState?.errors?.role && <span className="text-red-600 text-sm">{formTeamMemberState.errors.role}</span>}
                                </Field>
                                <Field className="mb-4">
                                    <FieldLabel className="block text-sm font-medium">Bio</FieldLabel>
                                    <Textarea
                                        id="id_team_member_bio"
                                        name="bio"
                                        disabled={false}
                                        placeholder="Team Member Name"
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    {formTeamMemberState?.errors?.bio && <span className="text-red-600 text-sm">{formTeamMemberState.errors.bio}</span>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="id_image">Image Upload</FieldLabel>
                                    <Input id="id_image" name="image" type="file" onChange={handleImageChange} accept=".jpg, .jpeg, png, webp" />
                                    <FieldDescription>Select a image to upload.</FieldDescription>
                                    {formTeamMemberState?.errors?.image && <span className="text-red-600 text-sm">{formTeamMemberState.errors.image}</span>}
                                </Field>
                                {previewUrl && (
                                    <div className="flex flex-row">
                                        <div>
                                            <Image
                                                src={previewUrl}
                                                alt="Preview"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                )}
                                <Button onClick={removeImage} className={`mt-4 ${!imageFile ? 'invisible' : 'visible'}`}>Remove Image</Button>
                                <CardAction>
                                    <Button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                                        Save
                                    </Button>
                                </CardAction>
                            </Form>
                        </CardContent>
                    </Card>
                    <div className="col-span-1 bg-secondary rounded-lg overflow-hidden border border-border">
                        <table className="w-full">
                            <thead className="bg-primary/10 border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Member Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamLoading ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center">
                                            Loading Team Members...
                                        </td>
                                    </tr>
                                ) : teamMembers.res.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center">
                                            No Team Member found.
                                        </td>
                                    </tr>
                                ) : (
                                    teamMembers.res.map((member: any) => (
                                        <tr key={member.id} className="border-b border-border hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-4 font-medium">{member.name}</td>
                                            <td className="px-6 py-4 capitalize text-muted-foreground">{member.role}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        className="p-2 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                                                        title="Edit"
                                                        onClick={() => handleTeamEdit(member.id)}
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        className="p-2 hover:bg-red-100 rounded text-red-600 transition-colors"
                                                        title="Delete"
                                                        onClick={() => handleTeamDelete(member.id)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Dialog open={openTeamEdit} onOpenChange={setOpenTeamEdit}>
                        <DialogContent className="sm:max-w-[825px]">
                            <Form action={formTeamEditAction}>
                                <DialogHeader>
                                    <DialogTitle>Fill Form To Edit Core Value</DialogTitle>
                                </DialogHeader>
                                <Card className="h-[400px] overflow-y-scroll">
                                    <CardContent>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="id_name">Name</FieldLabel>
                                                <Input
                                                    id="id_name"
                                                    name="name"
                                                    disabled={pendingTeamMember}
                                                    placeholder="Team Member Name"
                                                    autoComplete="off"
                                                    defaultValue={teamMemberState?.name}
                                                />
                                                {formTeamMemberEditState?.errors?.name && <span className="text-red-600 text-sm">{formTeamMemberEditState?.errors.name}</span>}
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="id_role">Role</FieldLabel>
                                                <InputGroupTextarea
                                                    id="id_role"
                                                    name="role"
                                                    disabled={pendingTeamMember}
                                                    placeholder="Role"
                                                    autoComplete="off"
                                                    className="border min-h-[150px]"
                                                    defaultValue={teamMemberState?.role}
                                                />
                                                {formTeamMemberEditState?.errors?.role && (
                                                    <span className="text-red-600 text-sm">{formTeamMemberEditState.errors?.role}</span>
                                                )}
                                            </Field>
                                            {/* <Field>
                                        <FieldLabel htmlFor="id_image">Description</FieldLabel>
                                        <InputGroupTextarea
                                            id="id_description"
                                            name="description"
                                            disabled={pendingTeamMember}
                                            placeholder="Product Description"
                                            autoComplete="off"
                                            className="border min-h-[150px]"
                                            defaultValue={formTeamMemberState.values?.role}
                                        />
                                        {formTeamMemberState?.errors?.role && (
                                            <span className="text-red-600 text-sm">{formTeamMemberState.errors.role}</span>
                                        )}
                                    </Field> */}
                                            <Field>
                                                <FieldLabel htmlFor="id_bio">Description</FieldLabel>
                                                <InputGroupTextarea
                                                    id="id_bio"
                                                    name="bio"
                                                    disabled={pendingTeamMember}
                                                    placeholder="Team Member Bio"
                                                    autoComplete="off"
                                                    className="border min-h-[150px]"
                                                    defaultValue={teamMemberState?.bio}
                                                />
                                                {formTeamMemberEditState?.errors?.bio && (
                                                    <span className="text-red-600 text-sm">{formTeamMemberEditState.errors.bio}</span>
                                                )}
                                            </Field>
                                            {/* <Field>
                                                <FieldLabel htmlFor="id_image">Image</FieldLabel>
                                                {teamMemberState?.image && (
                                                    <div className="flex flex-row">
                                                        <div>
                                                            <Image
                                                                src={previewEditUrl}
                                                                alt="Preview"
                                                                width={50}
                                                                height={50}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {/* <Input id="id_image" name="image" type="file" onChange={handleEditImageChange} accept=".jpg, .jpeg, png, webp" /> */}
                                            {/* <Button onClick={removeEditImage} className={`mt-4 ${!imageFile ? 'invisible' : 'visible'}`}>Remove Image</Button> */}
                                            {/* {formTeamMemberEditState?.errors?.image && (
                                                    <span className="text-red-600 text-sm">{formTeamMemberEditState.errors.image}</span>
                                                )} */}
                                            {/* </Field> */}

                                        </FieldGroup>
                                    </CardContent>
                                </Card>
                                <DialogFooter className="mt-4">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">{pendingTeamMember ? 'Submitting...' : 'Update'}</Button>
                                </DialogFooter>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </main>
        </div >
    );
}