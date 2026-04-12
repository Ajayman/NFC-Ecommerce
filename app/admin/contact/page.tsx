import prisma from "@/lib/prisma";
import { Suspense } from "react";
import AdminContact from "./contactUi";
import { notFound } from "next/navigation";

async function getContactData() {
  const contactData = await prisma.contactInfo.findMany();
  if (!contactData) return notFound();
  return contactData;
}

export default async function AdminContactHome() {
  const contactData = await getContactData();
  console.log(contactData);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContact contactInfo={contactData[0]} />
    </Suspense>
  )
}