'use client'

import { AdminSidebar } from '@/components/admin/sidebar';
import Form from 'next/form';
import { Card, CardAction, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useActionState } from 'react';
import { SubmitContactAction, SubmitContactEditAction } from '@/app/actions/contact-actions';
import { contactInfoState } from '@/app/schema';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputGroupTextarea } from '@/components/ui/input-group';
import { useState } from 'react';
import { Edit2 } from 'lucide-react';

type ContactData = {
    title: string;
    subTitle: string;
    phone: string;
    openingHours: string;
    email: string;
    emailSubText: string;
    location: string;
    locationSubText: string;
}

export default function AdminContact({ contactData }: { contactData: Promise<any> }) {
    const [open, setOpen] = useState(false);
    const getContactData = use(contactData);
    const router = useRouter();
    const [formContactState, ContactAddAction, isPending] = useActionState<contactInfoState, FormData>(SubmitContactAction, {
        values: {
            title: '',
            subTitle: '',
            phone: '',
            openingHours: 'Everyday 10am - 6pm',
            email: '',
            emailSubText: '',
            location: '',
            locationSubText: ''
        },
        success: false,
        errors: null
    })
    const [formContactEditState, ContactEditAction, isEditPending] = useActionState<contactInfoState, FormData>(SubmitContactEditAction.bind(null, getContactData[0]?.id), {
        values: {
            title: getContactData[0]?.title || '',
            subTitle: getContactData[0]?.subTitle || '',
            phone: getContactData[0]?.phone || '',
            openingHours: (getContactData[0]?.openingHours) as "Everyday 10am - 6pm" | "24 hours whole week" | "All day 10am - 6pm Saturday Closed",
            email: getContactData[0]?.email || '',
            emailSubText: getContactData[0]?.emailSubText || '',
            location: getContactData[0]?.location || '',
            locationSubText: getContactData[0]?.locationSubText || ''
        },
        success: false,
        errors: null
    })
    function handleEditContact(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setOpen(true);
    }
    useEffect(() => {
        if (formContactEditState.success) {
            // You can show a success message or perform any other action here
            toast("Contact Information Updated Successfully!");
            setOpen(false);
            router.refresh();
        }
    }, [formContactEditState.success]);
    useEffect(() => {
        if (formContactState.success) {
            // You can show a success message or perform any other action here
            toast("Contact Information Created Successfully!");
            router.refresh();
        }
    }, [formContactState.success]);
    return (
        <div className="flex bg-background min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="max-w-4xl">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-primary mb-2">Contact Page
                                <button
                                    className="p-2 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                                    title="Edit"
                                    onClick={(event) => handleEditContact(event)}
                                >
                                    <Edit2 size={18} />
                                </button>
                            </h1>
                            <p className="text-muted-foreground">Manage contact information</p>
                        </div>
                    </div>
                    <Card className='bg-secondary'>
                        <CardContent>
                            <Form action={ContactAddAction}>
                                <Field>
                                    <FieldLabel htmlFor="input-title">Title Text</FieldLabel>
                                    <Input
                                        id="input-title"
                                        type="text"
                                        placeholder="Enter title text"
                                        name='title'
                                        disabled={formContactEditState.values?.title ? true : false}
                                    />
                                    {formContactState.errors?.title && (
                                        <p className="text-red-500 text-sm mt-1">{formContactState.errors.title}</p>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="input-subTitle">Title Sub-Text</FieldLabel>
                                    <Input
                                        id="input-subTitle"
                                        type="text"
                                        placeholder="Enter title sub-text"
                                        name='subTitle'
                                        disabled={formContactEditState.values?.subTitle ? true : false}
                                    />
                                    {formContactState.errors?.subTitle && (
                                        <p className="text-red-500 text-sm mt-1">{formContactState.errors.subTitle}</p>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="input-phone">Phone Number</FieldLabel>
                                    <Input
                                        id="input-phone"
                                        type="text"
                                        placeholder="Enter phone number"
                                        name='phone'
                                        disabled={formContactEditState.values?.phone ? true : false}
                                    />
                                    {formContactState.errors?.phone && (
                                        <p className="text-red-500 text-sm mt-1">{formContactState.errors.phone}</p>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="input-openingHours">Opening Hours</FieldLabel>
                                    <Select name='openingHours' disabled={formContactEditState.values?.openingHours ? true : false}>
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue placeholder="Select Opening Option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Choose Option</SelectLabel>
                                                <SelectItem value="Everyday 10am - 6pm">Everyday 10am - 6 pm</SelectItem>
                                                <SelectItem value="24 hours whole week">24 hours whole week</SelectItem>
                                                <SelectItem value="All day 10am - 6pm Saturday Closed">All day 10am -6 pm Saturday Closed</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {formContactState.errors?.openingHours && (
                                        <p className="text-red-500 text-sm mt-1">{formContactState.errors.openingHours}</p>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="input-email">Email</FieldLabel>
                                    <Input
                                        id="input-email"
                                        type="email"
                                        placeholder="Enter email address"
                                        name='email'
                                        disabled={formContactEditState.values?.email ? true : false}
                                    />
                                    {formContactState.errors?.email && (
                                        <p className="text-red-500 text-sm mt-1">{formContactState.errors.email}</p>
                                    )}
                                    <Input
                                        id="input-email-subtext"
                                        type="text"
                                        placeholder="Enter email sub-text"
                                        name='emailSubText'
                                        disabled={formContactEditState.values?.emailSubText ? true : false}
                                    />
                                    {formContactState.errors?.emailSubText && (
                                        <p className="text-red-500 text-sm mt-1">{formContactState.errors.emailSubText}</p>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="input-location">Location</FieldLabel>
                                    <Input
                                        id="input-location"
                                        type="text"
                                        placeholder="Enter location"
                                        name='location'
                                        disabled={formContactEditState.values?.location ? true : false}
                                    />
                                    {formContactState.errors?.location && (
                                        <p className="text-red-500 text-sm mt-1">{formContactState.errors.location}</p>
                                    )}
                                    <Input
                                        id="input-location-subtext"
                                        type="text"
                                        placeholder="Enter location sub-text"
                                        name='locationSubText'
                                        disabled={formContactEditState.values?.locationSubText ? true : false}
                                    />
                                    {formContactState.errors?.locationSubText && (
                                        <p className="text-red-500 text-sm mt-1">{formContactState.errors.locationSubText}</p>
                                    )}
                                </Field>
                                <CardAction className="mt-4">
                                    <Button disabled={formContactEditState.values?.title ? true : false} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                                        Save
                                    </Button>
                                </CardAction>
                            </Form>
                        </CardContent>
                    </Card>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="sm:max-w-[825px]">
                            <Form action={ContactEditAction}>
                                <DialogHeader>
                                    <DialogTitle>Fill Form To Edit Product</DialogTitle>
                                </DialogHeader>
                                <Card className='bg-secondary'>
                                    <CardContent>
                                        <Field>
                                            <FieldLabel htmlFor="input-title">Title Text</FieldLabel>
                                            <Input
                                                id="input-title"
                                                type="text"
                                                placeholder="Enter title text"
                                                name='title'
                                                disabled={isEditPending}
                                                defaultValue={formContactEditState.values?.title}
                                            />
                                            {formContactEditState.errors?.title && (
                                                <p className="text-red-500 text-sm mt-1">{formContactEditState.errors.title}</p>
                                            )}
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="input-subTitle">Title Sub-Text</FieldLabel>
                                            <Input
                                                id="input-subTitle"
                                                type="text"
                                                placeholder="Enter title sub-text"
                                                name='subTitle'
                                                disabled={isEditPending}
                                                defaultValue={formContactEditState.values?.subTitle}
                                            />
                                            {formContactEditState.errors?.subTitle && (
                                                <p className="text-red-500 text-sm mt-1">{formContactEditState.errors.subTitle}</p>
                                            )}
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="input-phone">Phone Number</FieldLabel>
                                            <Input
                                                id="input-phone"
                                                type="text"
                                                placeholder="Enter phone number"
                                                name='phone'
                                                disabled={isEditPending}
                                                defaultValue={formContactEditState.values?.phone}
                                            />
                                            {formContactEditState.errors?.phone && (
                                                <p className="text-red-500 text-sm mt-1">{formContactEditState.errors.phone}</p>
                                            )}
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="input-openingHours">Opening Hours</FieldLabel>
                                            <Select name='openingHours' disabled={isEditPending} defaultValue={formContactEditState.values?.openingHours}>
                                                <SelectTrigger className="w-full max-w-48">
                                                    <SelectValue placeholder="Select Opening Option" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Choose Option</SelectLabel>
                                                        <SelectItem value="Everyday 10am - 6pm">Everyday 10am - 6 pm</SelectItem>
                                                        <SelectItem value="24 hours whole week">24 hours whole week</SelectItem>
                                                        <SelectItem value="All day 10am - 6pm Saturday Closed">All day 10am -6 pm Saturday Closed</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {formContactEditState.errors?.openingHours && (
                                                <p className="text-red-500 text-sm mt-1">{formContactEditState.errors.openingHours}</p>
                                            )}
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="input-email">Email</FieldLabel>
                                            <Input
                                                id="input-email"
                                                type="email"
                                                placeholder="Enter email address"
                                                name='email'
                                                disabled={isEditPending}
                                                defaultValue={formContactEditState.values?.email}
                                            />
                                            {formContactEditState.errors?.email && (
                                                <p className="text-red-500 text-sm mt-1">{formContactEditState.errors.email}</p>
                                            )}
                                            <Input
                                                id="input-email-subtext"
                                                type="text"
                                                placeholder="Enter email sub-text"
                                                name='emailSubText'
                                                disabled={isEditPending}
                                                defaultValue={formContactEditState.values?.emailSubText}
                                            />
                                            {formContactEditState.errors?.emailSubText && (
                                                <p className="text-red-500 text-sm mt-1">{formContactEditState.errors.emailSubText}</p>
                                            )}
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="input-location">Location</FieldLabel>
                                            <Input
                                                id="input-location"
                                                type="text"
                                                placeholder="Enter location"
                                                name='location'
                                                disabled={isEditPending}
                                                defaultValue={formContactEditState.values?.location}

                                            />
                                            {formContactEditState.errors?.location && (
                                                <p className="text-red-500 text-sm mt-1">{formContactEditState.errors.location}</p>
                                            )}
                                            <Input
                                                id="input-location-subtext"
                                                type="text"
                                                placeholder="Enter location sub-text"
                                                name='locationSubText'
                                                disabled={isEditPending}
                                                defaultValue={formContactEditState.values?.locationSubText}
                                            />
                                            {formContactEditState.errors?.locationSubText && (
                                                <p className="text-red-500 text-sm mt-1">{formContactEditState.errors.locationSubText}</p>
                                            )}
                                        </Field>
                                    </CardContent>
                                </Card>
                                <DialogFooter className="mt-4">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">{isEditPending ? 'Submitting...' : 'Update About'}</Button>
                                </DialogFooter>
                            </Form>
                        </DialogContent>
                    </Dialog>
                    {/* Preview */}
                    <div className="mt-8 bg-secondary rounded-lg p-6 border border-border">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Preview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Title</h3>
                                <p className="text-muted-foreground">{formContactEditState.values?.title}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Sub Title</h3>
                                <p className="text-muted-foreground">{formContactEditState.values?.subTitle}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                                <p className="text-muted-foreground">{formContactEditState.values?.email}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Email Sub-Text</h3>
                                <p className="text-muted-foreground">{formContactEditState.values?.emailSubText}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                                <p className="text-muted-foreground">{formContactEditState.values?.phone}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Location</h3>
                                <p className="text-muted-foreground">{formContactEditState.values?.location}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Location Subtext</h3>
                                <p className="text-muted-foreground">{formContactEditState.values?.locationSubText}</p>
                            </div>
                            <div className="md:col-span-2">
                                <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                                <p className="text-muted-foreground whitespace-pre-wrap">{formContactEditState.values?.openingHours}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
