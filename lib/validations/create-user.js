import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z.string().min(3, "نام و نام خانوادگی الزامی میباشد"),
  nationalCode: z
    .string()
    .min(10, "کد ملی الزامی میباشد و میبایست 10 رقم باشد")
    .max(10, "کد ملی الزامی میباشد و میبایست 10 رقم باشد"),
  phoneNumber: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
});
