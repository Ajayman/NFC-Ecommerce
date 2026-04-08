import prisma from "@/lib/prisma";
import { Suspense } from "react";
import AdminContact from "./contactUi";

async function getContactData() {
  const res = await prisma.contactInfo.findMany();
  return res;
}

export default async function AdminContactHome() {
  const contactData = getContactData();
  console.log(contactData);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContact contactData={contactData} />
    </Suspense>
  )
}