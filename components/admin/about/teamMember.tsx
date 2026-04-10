// "use client";

// import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import Form from "next/form";
// import Image from "next/image";
// import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { InputGroupTextarea } from "@/components/ui/input-group";
// import { Button } from "@/components/ui/button";
// import { useActionState } from "react";
// import { aboutTeamMemberState } from "@/app/schema";
// import { TeamMemberAddAction } from "@/app/actions/aboutTitleAddEditAction";
// import { useState } from "react";
// import { useEffect } from "react";
// import { toast } from "sonner";

// const TeamMember = (aboutData: any) => {
//     const [openTeamEdit, setOpenTeamEdit] = useState(false);
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//     const initialStateTeamMember = {
//         values: {
//             name: "",
//             role: "",
//             bio: "",
//             image: File || "",
//             aboutId: aboutData?.id || ""
//         },
//         errors: null,
//         success: false
//     }
//     const [formTeamMemberState, formTeamAction, pendingTeamMember] = useActionState<aboutTeamMemberState || undefined, FormData>(TeamMemberAddAction.bind(null, aboutData?.id), initialStateTeamMember)

//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0] || null;
//         setImageFile(file)
//     }

//     useEffect(() => {
//         if (formTeamMemberState.success) {
//             toast("Team Member Created Successfully");
//         } else if (formTeamMemberState.errors) {
//             toast("Something went wrong");
//         }
//     }, [formTeamMemberState.success])

//     useEffect(() => {
//         if (imageFile) {
//             const url = URL.createObjectURL(imageFile);
//             setPreviewUrl(url);
//         }
//     }, [imageFile])

//     const removeImage = () => {
//         setImageFile(null)
//         setPreviewUrl(null)
//         if (formTeamMemberState.values?.image) {
//             // formTeamMemberState.values.image = 
//         }
//     }

//     return (
//         <div className="grid grid-cols-3 gap-4 mt-4">
//             <Card className="col-span-2 bg-secondary text-2xl">
//                 <CardHeader>
//                     <CardTitle>Team Members</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <Form action={formTeamAction}>
//                         <Field className="mb-4">
//                             <FieldLabel className="block text-sm font-medium">Name</FieldLabel>
//                             <Input
//                                 id="id_team_member_name"
//                                 name="name"
//                                 disabled={false}
//                                 placeholder="Team Member Name"
//                                 className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                             />
//                         </Field>
//                         <Field className="mb-4">
//                             <FieldLabel className="block text-sm font-medium">Role</FieldLabel>
//                             <Input
//                                 id="id_team_member_role"
//                                 name="role"
//                                 disabled={false}
//                                 placeholder="Team Member Role"
//                                 className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                             />
//                         </Field>
//                         <Field className="mb-4">
//                             <FieldLabel className="block text-sm font-medium">Bio</FieldLabel>
//                             <Textarea
//                                 id="id_team_member_bio"
//                                 name="bio"
//                                 disabled={false}
//                                 placeholder="Team Member Name"
//                                 className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                             />
//                         </Field>
//                         <Field>
//                             <FieldLabel htmlFor="id_image">Image Upload</FieldLabel>
//                             <Input id="id_image" name="image" type="file" onChange={handleImageChange} accept=".jpg, .jpeg, png, webp" />
//                             <FieldDescription>Select a image to upload.</FieldDescription>
//                         </Field>
//                         {previewUrl && (
//                             <div className="flex flex-row">
//                                 <div>
//                                     <Image
//                                         src={previewUrl}
//                                         alt="Preview"
//                                         width={50}
//                                         height={50}
//                                     />
//                                 </div>
//                             </div>
//                         )}
//                         <Button onClick={removeImage} className={`mt-4 ${!imageFile ? 'invisible' : 'visible'}`}>Remove Image</Button>
//                         <CardAction>
//                             <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
//                                 Save
//                             </button>
//                         </CardAction>
//                     </Form>
//                 </CardContent>
//             </Card>
//             <div className="col-span-1 bg-secondary rounded-lg overflow-hidden border border-border">
//                 <table className="w-full">
//                     <thead className="bg-primary/10 border-b border-border">
//                         <tr>
//                             <th className="px-6 py-4 text-left text-sm font-semibold">Member Name</th>
//                             <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
//                             <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>

//                     </tbody>
//                 </table>
//             </div>
//             <Dialog open={openTeamEdit} onOpenChange={setOpenTeamEdit}>
//                 <DialogContent className="sm:max-w-[825px]">
//                     <Form action={formTeamAction}>
//                         <DialogHeader>
//                             <DialogTitle>Fill Form To Edit Core Value</DialogTitle>
//                         </DialogHeader>
//                         <Card className="h-[400px] overflow-y-scroll">
//                             <CardContent>
//                                 <FieldGroup>
//                                     <Field>
//                                         <FieldLabel htmlFor="id_name">Name</FieldLabel>
//                                         <Input
//                                             id="id_name"
//                                             name="name"
//                                             disabled={pendingTeamMember}
//                                             placeholder="Team Member Name"
//                                             autoComplete="off"
//                                             defaultValue={formTeamMemberState.values?.name}
//                                         />
//                                         {formTeamMemberState?.errors?.name && <span className="text-red-600 text-sm">{formTeamMemberState.errors.name}</span>}
//                                     </Field>
//                                     <Field>
//                                         <FieldLabel htmlFor="id_role">Role</FieldLabel>
//                                         <InputGroupTextarea
//                                             id="id_role"
//                                             name="role"
//                                             disabled={pendingTeamMember}
//                                             placeholder="Role"
//                                             autoComplete="off"
//                                             className="border min-h-[150px]"
//                                             defaultValue={formTeamMemberState.values?.role}
//                                         />
//                                         {formTeamMemberState?.errors?.role && (
//                                             <span className="text-red-600 text-sm">{formTeamMemberState.errors.role}</span>
//                                         )}
//                                     </Field>
//                                     {/* <Field>
//                                         <FieldLabel htmlFor="id_image">Description</FieldLabel>
//                                         <InputGroupTextarea
//                                             id="id_description"
//                                             name="description"
//                                             disabled={pendingTeamMember}
//                                             placeholder="Product Description"
//                                             autoComplete="off"
//                                             className="border min-h-[150px]"
//                                             defaultValue={formTeamMemberState.values?.role}
//                                         />
//                                         {formTeamMemberState?.errors?.role && (
//                                             <span className="text-red-600 text-sm">{formTeamMemberState.errors.role}</span>
//                                         )}
//                                     </Field> */}
//                                     <Field>
//                                         <FieldLabel htmlFor="id_bio">Description</FieldLabel>
//                                         <InputGroupTextarea
//                                             id="id_bio"
//                                             name="bio"
//                                             disabled={pendingTeamMember}
//                                             placeholder="Team Member Bio"
//                                             autoComplete="off"
//                                             className="border min-h-[150px]"
//                                             defaultValue={formTeamMemberState.values?.bio}
//                                         />
//                                         {formTeamMemberState?.errors?.bio && (
//                                             <span className="text-red-600 text-sm">{formTeamMemberState.errors.bio}</span>
//                                         )}
//                                     </Field>

//                                 </FieldGroup>
//                             </CardContent>
//                         </Card>
//                         <DialogFooter className="mt-4">
//                             <DialogClose asChild>
//                                 <Button variant="outline">Cancel</Button>
//                             </DialogClose>
//                             <Button type="submit">{pendingTeamMember ? 'Submitting...' : 'Update'}</Button>
//                         </DialogFooter>
//                     </Form>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }

// export default TeamMember;
