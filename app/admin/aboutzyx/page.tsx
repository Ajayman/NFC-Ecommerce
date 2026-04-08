import { Suspense } from "react";
import AboutAdminUI from "./aboutUi";
import prisma from "@/lib/prisma";

async function getAboutData() {
  const res = await prisma.about.findMany();
  return res;
}

export default async function AdminAbout() {
  const aboutData = getAboutData();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutAdminUI aboutData={aboutData} />
    </Suspense>
  )
}