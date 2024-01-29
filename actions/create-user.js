"use server";

import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { createUserSchema } from "@/lib/validations/create-user";

export async function createUser(values) {
  const session = await auth();
  const { user } = session;

  const validate = createUserSchema.safeParse(values);

  const { fullName, phoneNumber, nationalCode } =
    createUserSchema.parse(values);

  if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
    if (validate) {
      await prismadb.user.create({
        data: {
          fullName: fullName.trim(),
          phoneNumber,
          nationalCode,
          username: phoneNumber,
        },
      });
      return { status: 200, message: "User created" };
    } else {
      return { status: 400, message: "Bad request" };
    }
  } else {
    return { status: 403, message: "Access forbidden" };
  }
}
