"use server";

import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createPostSchema } from "@/lib/validations/create-post";
import { revalidatePath } from "next/cache";

export async function updatePost(formData, id) {
  const values = Object.fromEntries(formData.entries());

  const session = await auth();
  const { user } = session;

  const validate = createPostSchema.safeParse(values);

  const { title, description, authorId, authorName, image } =
    createPostSchema.parse(values);

  if (user.role === "SUPERADMIN") {
    if (validate) {
      await prismadb.post.update({
        where: { id },
        data: {
          title: title.trim(),
          description,
          authorId,
          authorName,
          image,
        },
      });
      revalidatePath("/posts-management");
      return { status: 200, message: "User created" };
    } else {
      return { status: 400, message: "Bad request" };
    }
  } else {
    return { status: 403, message: "Access forbidden" };
  }
}
