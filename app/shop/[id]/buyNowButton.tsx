"use client"
import { SubmitBuyAction } from "@/app/actions/product-actions";
import { buyNowState } from "@/app/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox, ComboboxChips, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue } from "@/components/ui/combobox";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroupTextarea } from "@/components/ui/input-group";
import { Handbag, Plus } from "lucide-react"
import Form from "next/form";
import { useEffect } from "react";
import { useActionState } from "react";
import { useState } from "react";
import { toast } from "sonner";

const BuyNowButton = ({ handleData }: { handleData: (value: {}) => void }) => {
    console.log(handleData);
    const [formState, formAction, pending] = useActionState<buyNowState, FormData>(SubmitBuyAction.bind(null, handleData),
        {
            values: {
                fullName: "",
                email: "",
                phoneNumber: "",
                fullAddress: ""
            },
            errors: null,
            success: false
        }
    );
    const [open, setOpen] = useState(false);
    const handleBuyNow = () => {
        setOpen(true);
    }
    useEffect(() => {
        if (formState?.success) {
            setOpen(false);
            toast.success("Product bought successfully!");
        }
    }, [formState?.success]);
    return (
        <div>
            <button
                onClick={handleBuyNow}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
            >
                <>
                    <Handbag size={20} />
                    Buy Now
                </>
            </button>
            <Dialog open={open} onOpenChange={setOpen} modal={false}>
                <DialogContent onInteractOutside={(event) => event.preventDefault()} className="sm:max-w-[825px]">
                    <Form action={formAction}>
                        <DialogHeader>
                            <DialogTitle>Fill Form To Add Product</DialogTitle>
                        </DialogHeader>
                        <Card className="h-[400px] overflow-y-scroll">
                            <CardContent>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="id_name">Full Name</FieldLabel>
                                        <Input
                                            id="id_name"
                                            name="fullName"
                                            disabled={pending}
                                            placeholder="Full Name"
                                            autoComplete="off"
                                        />
                                        {formState?.errors?.fullName && <span className="text-red-600 text-sm">{formState.errors.fullName}</span>}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_email">Email</FieldLabel>
                                        <Input
                                            id="id_email"
                                            name="email"
                                            disabled={pending}
                                            placeholder="Email"
                                            autoComplete="off"
                                        />
                                        {formState?.errors?.email && <span className="text-red-600 text-sm">{formState.errors.email}</span>}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_phone">Phone Number</FieldLabel>
                                        <Input
                                            id="id_phone"
                                            name="phoneNumber"
                                            disabled={pending}
                                            placeholder="Phone Number"
                                            autoComplete="off"
                                        />
                                        {formState?.errors?.phoneNumber && <span className="text-red-600 text-sm">{formState.errors.phoneNumber}</span>}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_address">Full Address</FieldLabel>
                                        <InputGroupTextarea
                                            id="id_address"
                                            name="fullAddress"
                                            disabled={pending}
                                            placeholder="Full Address"
                                            autoComplete="off"
                                            className="border min-h-[150px]"
                                        />
                                        {formState?.errors?.fullAddress && (
                                            <span className="text-red-600 text-sm">{formState.errors.fullAddress}</span>
                                        )}
                                    </Field>
                                    <Field>
                                        <Input
                                            name="productId"
                                            hidden
                                        />
                                    </Field>
                                    <Field>
                                        <Input
                                            name="productName"
                                            hidden
                                        />
                                    </Field>
                                    <Field>
                                        <Input
                                            name="quantity"
                                            hidden
                                        />
                                    </Field>
                                </FieldGroup>
                            </CardContent>
                        </Card>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">{pending ? 'Buying...' : 'Buy Now'}</Button>
                        </DialogFooter>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default BuyNowButton;
