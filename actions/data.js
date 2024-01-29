"use server";

import prismadb from "@/lib/prismadb";
import { unstable_noStore as noStore } from "next/cache";

export const allUsers = async () => {
  noStore();
  const users = await prismadb.user.findMany({
    include: {
      posts: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};

export const allPosts = async () => {
  noStore();
  const posts = await prismadb.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
};

export const postById = async (id) => {
  noStore();
  const post = await prismadb.post.findUnique({
    where: { id },
  });

  return post;
};
