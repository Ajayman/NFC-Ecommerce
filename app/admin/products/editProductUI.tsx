"use client";

import { EditProductAction, GetEditProductAction, SubmitProductAction } from "@/app/actions/product-actions";
import { productState } from "@/app/schema";
import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue } from "@/components/ui/combobox";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroupTextarea } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useActionState } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

type Product = {
    products: any;
    name: string,
    description: string,
    image: {}[],
    sizes: string[],
    colors: string[],
    category: string[],
    rating: number,
    price: number
};
const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as const
const colors = ["Ivory", "Sage", "Charcoal", "Blush"] as const
const categories = ["Party", "Cultural", "Baby", "Casual", "Formal"] as const
const productType = ["Featured", "Trending", "New"] as const
export function ProductDialogUI({ option }: { option: String }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File[] | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string[] | null>(null);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImageFile(Array.from(files));
        }
    }
    const [formState, formAction, pending] = useActionState<productState, FormData>(SubmitProductAction,
        {
            values: {
                name: "",
                description: "",
                productType: [],
                image: [{ name: "", url: "", resource_type: "" }],
                sizes: [],
                colors: [],
                category: [],
                rating: 0,
                price: 0
            },
            errors: null,
            success: false
        })
    useEffect(() => {
        if (formState?.success) {
            toast("Your product has been updated successfully!")
            setEditOpen(false);
            router.refresh();
        }
    }, [formState?.success])
    const urlArray: string[] | null = []
    useEffect(() => {
        if (imageFile) {
            imageFile.forEach((file) => {
                const url = URL.createObjectURL(file);
                urlArray?.push(url);
            })
            setPreviewUrl(urlArray);
            // return () => {
            //   URL.revokeObjectURL(url);
            // };
        } else {
            setPreviewUrl(null)
        }
    }, [imageFile])
    const removeImage = () => {
        setImageFile(null)
        if (formState.values) {
            formState.values.image = []
        }
    }
    const handleEdit = async (id: string) => {
        const response = await EditProductAction(id);
        if (response.success && response.product) {
            formState.values = {
                name: response.product.name,
                description: response.product.description,
                productType: response.product.productType.filter((type: string): type is typeof productType[number] => (productType as readonly string[]).includes(type)),
                image: [],
                sizes: response.product.sizes.filter((size: string): size is typeof sizes[number] => (sizes as readonly string[]).includes(size)),
                colors: response.product.colors,
                category: response.product.category.filter((category: string): category is typeof categories[number] => (categories as readonly string[]).includes(category)),
                rating: response.product.rating,
                price: response.product.price
            }
        }
        setEditOpen(true);
    }
    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <Plus size={20} />
                    Add Product
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[825px]">
                <Form action={formAction}>
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
                                        name="name"
                                        disabled={pending}
                                        defaultValue={formState.values?.name}
                                        placeholder="Product name"
                                        autoComplete="off"
                                    />
                                    {formState?.errors?.name && <span className="text-red-600 text-sm">{formState.errors.name}</span>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="id_description">Description</FieldLabel>
                                    <InputGroupTextarea
                                        id="id_description"
                                        name="description"
                                        disabled={pending}
                                        defaultValue={formState.values?.description}
                                        placeholder="Product Description"
                                        autoComplete="off"
                                        className="border min-h-[150px]"
                                    />
                                    {formState?.errors?.description && (
                                        <span className="text-red-600 text-sm">{formState.errors.description}</span>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="id_image">Image Upload</FieldLabel>
                                    <Input id="id_image" name="image" type="file" multiple max={9} onChange={handleImageChange} accept=".jpg, .jpeg, png, webp" />
                                    <FieldDescription>Select max 9 pictures to upload. (First Image is defautl Image to show)</FieldDescription>
                                </Field>
                                {previewUrl && (
                                    <div className="flex flex-row">
                                        {previewUrl.map((url, index) => (
                                            <div key={index}>
                                                <Image
                                                    src={url}
                                                    alt="Preview"
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <button onClick={removeImage} style={{ marginTop: '10px' }}>
                                    Remove Image
                                </button>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="id_price">Price</FieldLabel>
                                        <Input
                                            id="id_price"
                                            name="price"
                                            defaultValue={formState.values?.price}
                                            disabled={pending}
                                            placeholder="Price"
                                            className="w-3xs"
                                        />
                                        {formState?.errors?.price && (
                                            <span className="text-red-600 text-sm">{formState.errors.price}</span>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_sizes">Sizes</FieldLabel>
                                        <Combobox
                                            id="id_sizes"
                                            multiple
                                            autoHighlight
                                            name="sizes"
                                            items={sizes}
                                            defaultValue={formState.values?.sizes}
                                        >
                                            <ComboboxChips className="w-full max-w-xs">
                                                <ComboboxValue>
                                                    {(values) => (
                                                        <React.Fragment>
                                                            {values.map((value: string) => (
                                                                <ComboboxChip key={value}>{value}</ComboboxChip>
                                                            ))}
                                                            <ComboboxChipsInput />
                                                        </React.Fragment>
                                                    )}
                                                </ComboboxValue>
                                            </ComboboxChips>
                                            <ComboboxContent>
                                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                <ComboboxList>
                                                    {(item) => (
                                                        <ComboboxItem key={item} value={item}>
                                                            {item}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                        {formState?.errors?.sizes && (
                                            <span className="text-red-600 text-sm">{formState.errors.sizes}</span>
                                        )}
                                    </Field>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="id_colors">Colors</FieldLabel>
                                        <Combobox
                                            id="id_colors"
                                            multiple
                                            autoHighlight
                                            name="colors"
                                            items={colors}
                                            defaultValue={formState.values?.colors}
                                        >
                                            <ComboboxChips className="w-full max-w-xs">
                                                <ComboboxValue>
                                                    {(values) => (
                                                        <React.Fragment>
                                                            {values.map((value: string) => (
                                                                <ComboboxChip key={value}>{value}</ComboboxChip>
                                                            ))}
                                                            <ComboboxChipsInput />
                                                        </React.Fragment>
                                                    )}
                                                </ComboboxValue>
                                            </ComboboxChips>
                                            <ComboboxContent>
                                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                <ComboboxList>
                                                    {(item) => (
                                                        <ComboboxItem key={item} value={item}>
                                                            {item}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                        {formState?.errors?.colors && (
                                            <span className="text-red-600 text-sm">{formState.errors.colors}</span>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="id_categories">Categories</FieldLabel>
                                        <Combobox
                                            id="id_categories"
                                            multiple
                                            autoHighlight
                                            items={categories}
                                            name="category"
                                            defaultValue={formState.values?.category}
                                        >
                                            <ComboboxChips className="w-full max-w-xs">
                                                <ComboboxValue>
                                                    {(values) => (
                                                        <React.Fragment>
                                                            {values.map((value: string) => (
                                                                <ComboboxChip key={value}>{value}</ComboboxChip>
                                                            ))}
                                                            <ComboboxChipsInput />
                                                        </React.Fragment>
                                                    )}
                                                </ComboboxValue>
                                            </ComboboxChips>
                                            <ComboboxContent>
                                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                <ComboboxList>
                                                    {(item) => (
                                                        <ComboboxItem key={item} value={item}>
                                                            {item}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                        {formState?.errors?.sizes && (
                                            <span className="text-red-600 text-sm">{formState.errors.sizes}</span>
                                        )}
                                    </Field>
                                </div>
                                <Field>
                                    <FieldLabel htmlFor="id_rating">Rating</FieldLabel>
                                    <Select name="rating" defaultValue={String(formState.values?.rating)}>
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue placeholder="Rating" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Rating</SelectLabel>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </FieldGroup>
                        </CardContent>
                    </Card>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">{pending ? 'Submitting...' : 'Update Product'}</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>

    )
}