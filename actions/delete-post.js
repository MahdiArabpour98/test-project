"use server";

import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function deletePost(id) {
  const session = await auth();
  const { user } = session;

  if (user.role === "SUPERADMIN") {
    await prismadb.post.delete({
      where: { id },
    });
    revalidatePath("/posts-management");
    return { status: 200, message: "User created" };
  } else {
    return { status: 403, message: "Access forbidden" };
  }
}
