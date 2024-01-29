import { z } from "zod";

const postImageSchema = z
  .custom()
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "فایل انتخابی حداکثر باید ۲ مگابایت باشد")
  .optional();

export const createPostSchema = z.object({
  authorId: z.string().min(1, "انتخاب کاربر الزامی میباشد"),
  authorName: z.string().min(1, "انتخاب کاربر الزامی میباشد"),
  title: z.string().min(3, "عنوان الزامی است و میبایست حداقل 3 کاراکتر باشد"),
  description: z
    .string()
    .min(10, "توضیحات الزامی است و میبایست حداقل ۱۰ کاراکتر باشد"),
  image: postImageSchema,
});
