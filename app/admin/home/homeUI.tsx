'use client';

import { SubmitHomeAction, SubmitEditHomeAction } from '@/app/actions/home-action';
import { homeInfoState, homeSchema } from '@/app/schema';
import { AdminSidebar } from '@/components/admin/sidebar';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CloudUpload, Edit2 } from 'lucide-react';
import { CldImage, CldUploadButton, CldVideoPlayer } from 'next-cloudinary';
import Form from 'next/form';
import { use, useActionState, useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { InputGroupTextarea } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import 'next-cloudinary/dist/cld-video-player.css';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { z } from 'zod';

// ---- Types ----

type VideoUpload = {
    name: string;
    url: string;
    resource_type: 'image' | 'video';
};

type HomeData = z.infer<typeof homeSchema> & {
    id: string;
    title: string;
    titleDescription: string;
    video: { id: string; url: string };
};

const INITIAL_FORM_STATE: homeInfoState = {
    values: {
        video: {
            name: '',
            url: '',
            resource_type: ''
        }, title: '', titleDescription: ''
    },
    errors: null,
    success: false,
};

// ---- VideoUploadField ----

type VideoUploadFieldProps = {
    video: VideoUpload | undefined;
    onSuccess: (result: unknown) => void;
    onError: (error: unknown) => void;
    uploadError: string | undefined;
};

function VideoUploadField({ video, onSuccess, onError, uploadError }: VideoUploadFieldProps) {
    return (
        <div>
            <CldUploadButton
                uploadPreset="Cloudinary_upload"
                className="me-2 inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                onError={onError}
                onSuccess={onSuccess}
            >
                <CloudUpload className="mr-2" />
                Upload
            </CldUploadButton>

            {uploadError && (
                <p className="mt-2 text-xs text-red-600">{uploadError}</p>
            )}

            <div className="flex">
                {video?.resource_type === 'image' && (
                    <CldImage width="50" height="50" src={video.name} alt="Uploaded image" />
                )}
                {video?.resource_type === 'video' && (
                    <CldVideoPlayer width="720" height="720" src={video.name} />
                )}
            </div>

            <Field>
                <Input name="video" value={JSON.stringify(video)} readOnly hidden />
            </Field>
        </div>
    );
}

// ---- FormErrors ----

function FormErrors({ errors }: { errors: homeInfoState['errors'] }) {
    if (!errors) return null;
    return (
        <p className="text-red-600">
            {errors.title && `Title: ${errors.title} `}
            {errors.titleDescription && `Description: ${errors.titleDescription} `}
            {errors.video && `Video: ${errors.video}`}
        </p>
    );
}

// ---- HomePage ----

const HomePage = ({ homeData }: { homeData: Promise<HomeData> }) => {
    const homeInfo = use(homeData);
    const router = useRouter();

    const [formState, formAction, pending] = useActionState<homeInfoState, FormData>(
        SubmitHomeAction,
        INITIAL_FORM_STATE
    );
    const [formEditState, editFormAction, editPending] = useActionState(
        SubmitEditHomeAction.bind(null, homeInfo.id),
        INITIAL_FORM_STATE
    );

const [editOpen, setEditOpen] = useState(false);
const [createVideo, setCreateVideo] = useState<VideoUpload | undefined>();
const [editVideo, setEditVideo] = useState<VideoUpload | undefined>();
const [uploadError, setUploadError] = useState<string | undefined>();

function parseUploadResult(result: unknown): VideoUpload {
    const { public_id: name, secure_url: url, resource_type } = (result as { info: Record<string, string> }).info;
    return { name, url, resource_type: resource_type as VideoUpload['resource_type'] };
}

function handleUpload(result: unknown) {
    setCreateVideo(parseUploadResult(result));
    setUploadError(undefined);
}

function handleEditUpload(result: unknown) {
    setEditVideo(parseUploadResult(result));
    setUploadError(undefined);
}

function handleUploadError(error: unknown) {
    setUploadError((error as { statusText: string }).statusText);
}

useEffect(() => {
    if (formState.success) {
        toast("Home Page Created Successfully");
        router.refresh();
    }
}, [formState.success, router]);

useEffect(() => {
    if (formEditState.success) {
        toast("Home Page Updated Successfully");
        setEditOpen(false);
        router.refresh();
    }
}, [formEditState.success, router]);

return (
    <div className='flex bg-background min-h-screen'>
        <AdminSidebar />
        <main className="flex-1 p-8">
            <div className="max-w-6xl">
                <div className="mb-4">
                    <h1 className="text-4xl font-bold text-primary mb-2">Home</h1>
                    <button
                        className="p-2 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                        title="Edit"
                        onClick={() => setEditOpen(true)}
                    >
                        <Edit2 size={20} />
                    </button>
                    <p className="text-muted-foreground">Manage Your Home Page</p>
                </div>

                <FormErrors errors={formState.errors} />

                <Card>
                    <CardContent>
                        <Form action={formAction}>
                            <FieldGroup>
                                <VideoUploadField
                                    video={createVideo}
                                    onSuccess={handleUpload}
                                    onError={handleUploadError}
                                    uploadError={uploadError}
                                />
                                <Field>
                                    <FieldLabel htmlFor="id_title">Home Main Title</FieldLabel>
                                    <Input
                                        id="id_title"
                                        name="title"
                                        disabled={pending}
                                        placeholder="Home Main Title"
                                        autoComplete="off"
                                    />
                                    {formState.errors?.title && (
                                        <span className="text-red-600 text-sm">{formState.errors.title}</span>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="id_titleDescription">Title Description</FieldLabel>
                                    <InputGroupTextarea
                                        id="id_titleDescription"
                                        name="titleDescription"
                                        disabled={pending}
                                        defaultValue={formState.values?.titleDescription}
                                        placeholder="Title Description"
                                        autoComplete="off"
                                        className="border min-h-[150px]"
                                    />
                                    {formState.errors?.titleDescription && (
                                        <span className="text-red-600 text-sm">{formState.errors.titleDescription}</span>
                                    )}
                                </Field>
                            </FieldGroup>
                            <CardFooter>
                                <Button type="submit" className="mt-4" disabled={pending}>
                                    {pending ? 'Saving...' : 'Save'}
                                </Button>
                            </CardFooter>
                        </Form>
                    </CardContent>
                </Card>

                <Dialog open={editOpen} onOpenChange={setEditOpen} modal={false}>
                    <DialogContent
                        onInteractOutside={(e) => e.preventDefault()}
                        className="sm:max-w-[825px]"
                    >
                        <Form action={editFormAction}>
                            <DialogHeader>
                                <DialogTitle>Fill Form To Update Home</DialogTitle>
                            </DialogHeader>
                            <Card className="h-[400px] overflow-y-scroll">
                                <CardContent>
                                    <FieldGroup>
                                        <VideoUploadField
                                            video={editVideo}
                                            onSuccess={handleEditUpload}
                                            onError={handleUploadError}
                                            uploadError={uploadError}
                                        />
                                        <Field>
                                            <FieldLabel htmlFor="edit_title">Home Main Title</FieldLabel>
                                            <Input
                                                id="edit_title"
                                                name="title"
                                                disabled={editPending}
                                                placeholder="Home Main Title"
                                                autoComplete="off"
                                                defaultValue={homeInfo?.title}
                                            />
                                            {formEditState.errors?.title && (
                                                <span className="text-red-600 text-sm">{formEditState.errors.title}</span>
                                            )}
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="edit_titleDescription">Title Description</FieldLabel>
                                            <InputGroupTextarea
                                                id="edit_titleDescription"
                                                name="titleDescription"
                                                disabled={editPending}
                                                defaultValue={homeInfo?.titleDescription}
                                                placeholder="Title Description"
                                                autoComplete="off"
                                                className="border min-h-[150px]"
                                            />
                                            {formEditState.errors?.titleDescription && (
                                                <span className="text-red-600 text-sm">{formEditState.errors.titleDescription}</span>
                                            )}
                                        </Field>
                                    </FieldGroup>
                                </CardContent>
                            </Card>
                            <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={editPending}>
                                    {editPending ? 'Submitting...' : 'Update Home'}
                                </Button>
                            </DialogFooter>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </main>
    </div>
);
};

export default HomePage;

// 'use client';

// import { SubmitHomeAction, SubmitEditHomeAction } from '@/app/actions/home-action';
// import { homeInfoState } from '@/app/schema';
// import { AdminSidebar } from '@/components/admin/sidebar';
// import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
// import { Input } from '@/components/ui/input';
// import { CloudUpload, Edit2 } from 'lucide-react';
// import { CldImage, CldUploadButton, CldVideoPlayer } from 'next-cloudinary';
// import Form from 'next/form';
// import React from 'react';
// import { useActionState } from 'react';
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { InputGroupTextarea } from '@/components/ui/input-group';
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import 'next-cloudinary/dist/cld-video-player.css';
// import { useEffect } from 'react';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
// import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { homeSchema } from '@/app/schema';
// import { use } from 'react';
// const HomePage = ({ homeData }: { homeData: Promise<typeof homeSchema> }) => {
//     const [formState, formAction, pending] = useActionState<homeInfoState, FormData>(SubmitHomeAction, {
//         values: {
//             video: {},
//             title: '',
//             titleDescription: ''
//         },
//         errors: null,
//         success: false,
//     });
//     const [formEditState, editFormAction, editPending] = useActionState<homeInfoState, FormData>(SubmitEditHomeAction.bind(null, homeData.id), {
//         values: {
//             video: {},
//             title: '',
//             titleDescription: ''
//         },
//         errors: null,
//         success: false,
//     });
//     const homeInfo = use(homeData);
//     console.log("home info", homeInfo)
//     const [editOpen, setEditOpen] = useState(false);
//     const [info, setInfo] = useState();
//     const [error, setError] = useState();
//     const [video, setVideo] = useState<{ name: string, url: string, resource_type: string } | undefined>();
//     function handleEditHome(event: React.MouseEvent<HTMLButtonElement>) {
//         event.preventDefault();
//         setEditOpen(true);
//     }
//     function handleUpload(result) {
//         const { public_id: name, secure_url: url, resource_type: resource_type } = result.info;
//         setVideo({ name, url, resource_type });
//         setError(null);
//     }
//     function handleError(error) {
//         setInfo(null);
//         setError(error);
//     }
//     function handleEditUpload(result) {
//         const { public_id: name, secure_url: url, resource_type: resource_type } = result.info;
//         setVideo({ name, url, resource_type });
//         setError(null);
//     }
//     function handleEditError(error) {
//         setInfo(null);
//         setError(error);
//     }
//     const router = useRouter();
//     useEffect(() => {
//         if (formState.success) {
//             toast("Home Page Created Successfully")
//             router.refresh();
//         }
//     }, [formState.success])
//     useEffect(() => {
//         if (formEditState.success) {
//             toast("Home Page Updated Successfully")
//             router.refresh();
//         }
//     }, [formEditState.success])
//     return (
//         <div>
//             <div className='flex bg-background min-h-screen'>
//                 <AdminSidebar />
//                 <main className="flex-1 p-8">
//                     <div className="max-w-6xl">
//                         <div>
//                             <h1 className="text-4xl font-bold text-primary mb-2">Home</h1>
//                             <button
//                                 className="p-2 hover:bg-blue-100 rounded text-blue-600 transition-colors"
//                                 title="Edit"
//                                 onClick={(event) => handleEditHome(event)}
//                             >
//                                 <Edit2 size={20} />
//                             </button>
//                             <p className="text-muted-foreground">Manage Your Home Page</p>
//                         </div>
//                         {formState.errors && <p className="text-red-600">{`Title:${formState.errors.title}`} {`Description:${formState.errors.titleDescription}`} {`Video:${formState.errors.video}`}</p>}
//                         <Card>
//                             <CardContent>
//                                 <Form action={formAction}>
//                                     <FieldGroup>
//                                         {/* <Field>
//                                             <FieldLabel htmlFor='id_logo'>Home Logo</FieldLabel>
//                                             <Input></Input>
//                                         </Field> */}
//                                         <div>
//                                             <CldUploadButton
//                                                 uploadPreset="Cloudinary_upload"
//                                                 className="me-2 inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300"
//                                                 onError={handleError}
//                                                 onSuccess={handleUpload}
//                                             >
//                                                 <CloudUpload className="mr-2" />
//                                                 Upload
//                                             </CldUploadButton>
//                                             {error && <p className="mt-2 text-xs text-red-600">{error.statusText}</p>}


//                                             <div className="flex">
//                                                 <>
//                                                     {video?.resource_type === 'image' && (
//                                                         <CldImage
//                                                             width="50"
//                                                             height="50"
//                                                             src={video.name}
//                                                             alt="Up image"
//                                                         />
//                                                     )}
//                                                     {video?.resource_type === 'video' && (
//                                                         <CldVideoPlayer
//                                                             width="720"
//                                                             height="720"
//                                                             src={video.name}
//                                                         />
//                                                     )}
//                                                 </>
//                                             </div>
//                                             <Field>
//                                                 <Input name="video" value={JSON.stringify(video)} readOnly hidden />
//                                             </Field>
//                                         </div>
//                                         <Field>
//                                             <FieldLabel htmlFor="id_title">Home Main Title</FieldLabel>
//                                             <Input
//                                                 id="id_title"
//                                                 name="title"
//                                                 disabled={pending}
//                                                 placeholder="Home Main Title"
//                                                 autoComplete="off"
//                                             />
//                                             {formState?.errors?.title && <span className="text-red-600 text-sm">{formState.errors.title}</span>}
//                                         </Field>
//                                         <Field>
//                                             <FieldLabel htmlFor="id_titleDescription">Title</FieldLabel>
//                                             <InputGroupTextarea
//                                                 id="id_titleDescription"
//                                                 name="titleDescription"
//                                                 disabled={pending}
//                                                 defaultValue={formState.values?.titleDescription}
//                                                 placeholder="Title Description"
//                                                 autoComplete="off"
//                                                 className="border min-h-[150px]"
//                                             />
//                                             {formState?.errors?.titleDescription && (
//                                                 <span className="text-red-600 text-sm">{formState.errors.titleDescription}</span>
//                                             )}
//                                         </Field>
//                                     </FieldGroup>
//                                     <CardFooter>
//                                         <Button type="submit" className="mt-4" disabled={pending}>
//                                             {pending ? 'Saving...' : 'Save'}
//                                         </Button>
//                                     </CardFooter>
//                                 </Form>
//                             </CardContent>
//                         </Card>
//                         <Dialog open={editOpen} onOpenChange={setEditOpen} modal={false}>
//                             <DialogContent onInteractOutside={(event) => event.preventDefault()} className="sm:max-w-[825px]">
//                                 <Form action={editFormAction}>
//                                     <DialogHeader>
//                                         <DialogTitle>Fill Form To Update Product</DialogTitle>
//                                     </DialogHeader>
//                                     <Card className="h-[400px] overflow-y-scroll">
//                                         <CardContent>
//                                             <FieldGroup>
//                                                 {/* <Field>
//                                             <FieldLabel htmlFor='id_logo'>Home Logo</FieldLabel>
//                                             <Input></Input>
//                                         </Field> */}
//                                                 <div>
//                                                     <CldUploadButton
//                                                         uploadPreset="Cloudinary_upload"
//                                                         className="me-2 inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300"
//                                                         onError={handleEditError}
//                                                         onSuccess={handleEditUpload}
//                                                     >
//                                                         <CloudUpload className="mr-2" />
//                                                         Upload
//                                                     </CldUploadButton>
//                                                     {error && <p className="mt-2 text-xs text-red-600">{error.statusText}</p>}


//                                                     <div className="flex">
//                                                         <>
//                                                             {video?.resource_type === 'image' && (
//                                                                 <CldImage
//                                                                     width="50"
//                                                                     height="50"
//                                                                     src={video.name}
//                                                                     alt="Up image"
//                                                                 />
//                                                             )}
//                                                             {video?.resource_type === 'video' && (
//                                                                 <CldVideoPlayer
//                                                                     width="720"
//                                                                     height="720"
//                                                                     src={video.name}
//                                                                 />
//                                                             )}
//                                                         </>
//                                                     </div>
//                                                     <Field>
//                                                         <Input name="video" value={JSON.stringify(video)} readOnly hidden />
//                                                     </Field>
//                                                 </div>
//                                                 <Field>
//                                                     <FieldLabel htmlFor="id_title">Home Main Title</FieldLabel>
//                                                     <Input
//                                                         id="id_title"
//                                                         name="title"
//                                                         disabled={pending}
//                                                         placeholder="Home Main Title"
//                                                         autoComplete="off"
//                                                         defaultValue={homeInfo.title}
//                                                     />
//                                                     {formState?.errors?.title && <span className="text-red-600 text-sm">{formState.errors.title}</span>}
//                                                 </Field>
//                                                 <Field>
//                                                     <FieldLabel htmlFor="id_titleDescription">Title</FieldLabel>
//                                                     <InputGroupTextarea
//                                                         id="id_titleDescription"
//                                                         name="titleDescription"
//                                                         disabled={pending}
//                                                         defaultValue={homeInfo.titleDescription}
//                                                         placeholder="Title Description"
//                                                         autoComplete="off"
//                                                         className="border min-h-[150px]"
//                                                     />
//                                                     {formState?.errors?.titleDescription && (
//                                                         <span className="text-red-600 text-sm">{formState.errors.titleDescription}</span>
//                                                     )}
//                                                 </Field>
//                                             </FieldGroup>
//                                         </CardContent>
//                                     </Card>
//                                     <DialogFooter className="mt-4">
//                                         <DialogClose asChild>
//                                             <Button variant="outline">Cancel</Button>
//                                         </DialogClose>
//                                         <Button type="submit">{pending ? 'Submitting...' : 'Update Home'}</Button>
//                                     </DialogFooter>
//                                 </Form>
//                             </DialogContent>
//                         </Dialog>
//                     </div>
//                 </main>
//             </div >
//         </div >
//     );
// }

// export default HomePage;
