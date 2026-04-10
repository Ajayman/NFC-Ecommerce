'use client';

import React, { useActionState, useEffect } from "react"

import { useState } from 'react';
import { AdminSidebar } from "@/components/admin/sidebar";
import { CloudUpload, Edit2, Plus, Trash2, X } from 'lucide-react';
import Form from "next/form"
import { DeleteProductAction, EditProductAction, GetEditProductAction, SubmitProductAction } from "@/app/actions/product-actions";
import { productState } from "@/app/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroupTextarea } from "@/components/ui/input-group";
import { Combobox, ComboboxChipsInput, ComboboxContent, useComboboxAnchor, ComboboxChips, ComboboxValue, ComboboxChip, ComboboxEmpty, ComboboxList, ComboboxItem } from "@/components/ui/combobox";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectGroup, SelectItem, SelectContent, SelectLabel } from "@/components/ui/select";
import { use } from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton, CldImage, CldVideoPlayer } from 'next-cloudinary'
type ImageUpload = {
  name: string;
  url: string;
  resource_type: 'image' | 'video';
};

type Product = {
  products: any;
  name: string,
  description: string,
  productType: string[],
  image: ImageUpload[],
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
export default function AdminProducts({ products }: { products: Promise<Product> }) {
  const allProducts = use(products);
  const [formState, formAction, pending] = useActionState<productState, FormData>(SubmitProductAction,
    {
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
      errors: null,
      success: false
    })
  const [editFormState, editFormAction, editPending] = useActionState<productState, FormData>(GetEditProductAction.bind(null, formState.values?.id || ""), {
    values: {
      name: formState.values?.name || "",
      description: formState.values?.description || "",
      productType: formState.values?.productType || [],
      image: formState.values?.image || [],
      sizes: formState.values?.sizes || [],
      colors: formState.values?.colors || [],
      category: formState.values?.category || [],
      rating: formState.values?.rating || 0,
      price: formState.values?.price || 0
    },
    errors: null,
    success: false
  })
  const router = useRouter();
  const [images, setImages] = useState<ImageUpload[]>([]);
  const [editedImages, setEditedImages] = useState<ImageUpload[]>([]);
  const [info, setInfo] = useState({ message: "" });
  const [error, setError] = useState({ message: "" });
  function handleUpload(result: any) {
    const { public_id: name, secure_url: url, resource_type: resource_type } = result.info;
    setImages((prev) => [...prev, { name, url, resource_type }]);
    setError({ message: "" });
  }
  function handleEditUpload(result: any) {
    const { public_id: name, secure_url: url, resource_type: resource_type } = result.info;
    if (formState.values) {
      formState.values.image = [];
    }
    setEditedImages((prev) => [...prev, { name, url, resource_type }]);
    setError({ message: "" });
  }


  function handleError(error: any) {
    setInfo({ message: "" });
    setError(error);
  }

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const handleEdit = async (id: string) => {
    setEditedImages([]);
    const response = await EditProductAction(id);
    if (response.success && response.product) {
      setEditOpen(true);
      console.log(response.product.images);
      formState.values = {
        id: response.product.id,
        name: response.product.name,
        description: response.product.description,
        productType: response.product.productType.filter((type: string): type is typeof productType[number] => (productType as readonly string[]).includes(type)),
        image: response.product.images,
        sizes: response.product.sizes.filter((size: string): size is typeof sizes[number] => (sizes as readonly string[]).includes(size)),
        colors: response.product.colors,
        category: response.product.category.filter((category: string): category is typeof categories[number] => (categories as readonly string[]).includes(category)),
        rating: response.product.rating,
        price: response.product.price
      }
    }
  }
  const handleDelete = async (id: string) => {
    const response = DeleteProductAction(id);
    if ((await response).success) {
      router.refresh();
    }
  }

  const anchor = useComboboxAnchor()
  useEffect(() => {
    if (formState?.success) {
      toast("Your product has been created successfully!")
      setOpen(false);
      router.refresh();
    }
  }, [formState.success])

  useEffect(() => {
    if (editFormState?.success) {
      toast("Your product has been updated successfully!")
      setEditOpen(false);
      router.refresh();
    }
  }, [editFormState.success])

  return (
    <div className="flex bg-background min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">Products</h1>
              <p className="text-muted-foreground">Manage your product catalog</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen} modal={false}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  <Plus size={20} />
                  Add Product
                </button>
              </DialogTrigger>
              <DialogContent onInteractOutside={(event) => event.preventDefault()} className="sm:max-w-[825px]">
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
                            placeholder="Product Description"
                            autoComplete="off"
                            className="border min-h-[150px]"
                          />
                          {formState?.errors?.description && (
                            <span className="text-red-600 text-sm">{formState.errors.description}</span>
                          )}
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="id_type">Product Type</FieldLabel>
                          <Combobox
                            id="id_type"
                            multiple
                            autoHighlight
                            name="productType"
                            items={productType}
                            defaultValue={[productType[0]]}
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
                            <ComboboxContent anchor={anchor}>
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
                          {formState?.errors?.productType && (
                            <span className="text-red-600 text-sm">{formState.errors.colors}</span>
                          )}
                        </Field>
                        <div>
                          <CldUploadButton
                            uploadPreset="Cloudinary_upload"
                            className="me-2 inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                            onError={handleError}
                            onSuccess={handleUpload}
                            options={{
                              multiple: true,
                              maxFiles: 8
                            }}
                          >
                            <CloudUpload className="mr-2" />
                            Upload
                          </CldUploadButton>
                          {error && <p className="mt-2 text-xs text-red-600">{error.message}</p>}

                          {images.length > 0 && (
                            <div className="flex">
                              {`Image Print: ${{ images }}}`}
                              {images.map((url, index) => (
                                <React.Fragment key={index}>
                                  {typeof url === 'string' ? (
                                    <CldImage
                                      width="50"
                                      height="50"
                                      src={url}
                                      alt="Uploaded image"
                                    />
                                  ) : (
                                    <>
                                      {url.resource_type === 'image' && (
                                        <CldImage
                                          width="50"
                                          height="50"
                                          src={url.url}
                                          alt="Up image"
                                        />
                                      )}
                                      {url.resource_type === 'video' && (
                                        <CldVideoPlayer
                                          width="200"
                                          height="200"
                                          src={url.url}
                                        />
                                      )}
                                    </>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                          <Field>
                            <Input name="image" value={JSON.stringify(images)} readOnly hidden />
                          </Field>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Field>
                            <FieldLabel htmlFor="id_price">Price</FieldLabel>
                            <Input
                              id="id_price"
                              name="price"
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
                              defaultValue={[sizes[0]]}
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
                              defaultValue={[colors[0]]}
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
                              <ComboboxContent anchor={anchor}>
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
                              defaultValue={[categories[0]]}
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
                              <ComboboxContent anchor={anchor}>
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
                          <Select name="rating">
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
                    <Button type="submit">{pending ? 'Submitting...' : 'Submit Product'}</Button>
                  </DialogFooter>
                </Form>
              </DialogContent>
            </Dialog>
            {/* <ProductDialogUI option="create" />

            // Edit Product Dialog
            <ProductDialogUI option="edit" /> */}
            <Dialog open={editOpen} onOpenChange={setEditOpen} modal={false}>
              <DialogContent onInteractOutside={(event) => event.preventDefault()} className="sm:max-w-[825px]">
                <Form action={editFormAction}>
                  <DialogHeader>
                    <DialogTitle>Fill Form To Update Product</DialogTitle>
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
                          <FieldLabel htmlFor="id_type">Product Type</FieldLabel>
                          <Combobox
                            id="id_type"
                            multiple
                            autoHighlight
                            name="productType"
                            items={productType}
                            defaultValue={formState.values?.productType}
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
                            <ComboboxContent anchor={anchor}>
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
                          {formState?.errors?.productType && (
                            <span className="text-red-600 text-sm">{formState.errors.colors}</span>
                          )}
                        </Field>
                        {formState.values?.image && formState.values.image.length > 0 && (
                          <div className="flex">
                            {formState.values?.image.map((url, index) => (
                              <React.Fragment key={index}>
                                {typeof url === 'string' ? (
                                  <CldImage
                                    width="50"
                                    height="50"
                                    src={url}
                                    alt="Uploaded image"
                                  />
                                ) : (
                                  <>
                                    {url.resource_type === 'image' && (
                                      <CldImage
                                        width="50"
                                        height="50"
                                        src={url.url}
                                        alt="Up image"
                                      />
                                    )}
                                    {url.resource_type === 'video' && (
                                      <CldVideoPlayer
                                        width="200"
                                        height="200"
                                        src={url.url}
                                      />
                                    )}
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        )}

                        {editedImages.length > 0 && (
                          <div className="flex">
                            {editedImages.map((url, index) => (
                              <React.Fragment key={index}>
                                {typeof url === 'string' ? (
                                  <CldImage
                                    width="50"
                                    height="50"
                                    src={url}
                                    alt="Uploaded image"
                                  />
                                ) : (
                                  <>
                                    {url.resource_type === 'image' && (
                                      <CldImage
                                        width="50"
                                        height="50"
                                        src={url.url}
                                        alt="Up image"
                                      />
                                    )}
                                    {url.resource_type === 'video' && (
                                      <CldVideoPlayer
                                        width="200"
                                        height="200"
                                        src={url.url}
                                      />
                                    )}
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                        <CldUploadButton
                          uploadPreset="Cloudinary_upload"
                          className="me-2 inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                          onError={handleError}
                          onSuccess={handleEditUpload}
                          options={{
                            multiple: true,
                            maxFiles: 8
                          }}
                        >
                          <CloudUpload className="mr-2" />
                          Change Images
                        </CldUploadButton>
                        <Field>
                          <Input name="image" value={JSON.stringify(editedImages)} readOnly hidden />
                        </Field>
                        {error && <p className="mt-2 text-xs text-red-600">{error.message}</p>}
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
                              <ComboboxChips ref={anchor} className="w-full max-w-xs">
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
                              <ComboboxContent anchor={anchor}>
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
                              <ComboboxChips ref={anchor} className="w-full max-w-xs">
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
                              <ComboboxContent anchor={anchor}>
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
                              <ComboboxChips ref={anchor} className="w-full max-w-xs">
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
                              <ComboboxContent anchor={anchor}>
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
                            {formState?.errors?.category && (
                              <span className="text-red-600 text-sm">{formState.errors.category}</span>
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

          </div>

          {/* Products Table */}
          <div className="bg-secondary rounded-lg overflow-hidden border border-border">
            <table className="w-full">
              <thead className="bg-primary/10 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Product Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Colors</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.products.map((product: any) => (
                  <tr key={product.id} className="border-b border-border hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 capitalize text-muted-foreground">{product.price}</td>
                    <td className="px-6 py-4 font-semibold text-primary">{product.sizes}</td>
                    <td className="px-6 py-4 font-semibold text-primary">{product.productType}</td>
                    <td className="px-6 py-4 text-muted-foreground">{product.colors}</td>
                    <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
                    <td className="px-6 py-4 text-muted-foreground">{product.rating}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                          title="Edit"
                          onClick={() => handleEdit(product.id)}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          className="p-2 hover:bg-red-100 rounded text-red-600 transition-colors"
                          title="Delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                }

              </tbody>
            </table>
          </div>
        </div>

      </main >
    </div >
  );
}