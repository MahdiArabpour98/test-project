"use server";
import prismadb from "@/lib/prismadb";
import { usernameSchema } from "@/lib/validations/login-form";

export const findUserByUsername = async (values) => {
  const validation = usernameSchema.safeParse(values);

  if (validation.success) {
    const user = await prismadb.user.findUnique({
      where: {
        username: values.username,
        phoneNumber: values.phoneNumber,
      },
    });
    if (user && (user.role === "ADMIN" || user.role === "SUPERADMIN")) {
      const { username, phoneNumber } = user;
      return { status: 200, data: { username, phoneNumber } };
    } else {
      return { status: 404, message: "User not found" };
    }
  } else {
    return { status: 400, message: "Wrong formats" };
  }
};
