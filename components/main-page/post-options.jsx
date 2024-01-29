"use client";

import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deletePost } from "@/actions/delete-post";
import { toast } from "sonner";
import Link from "next/link";

const PostOptions = ({ post }) => {
  const [selectedPost, setSelectedPost] = useState({
    isOpen: false,
    post: null,
  });

  const handleDelete = async () => {
    try {
      const res = await deletePost(selectedPost.post.id);
      if (res.status === 200) {
        toast.success("پست حذف شد");
        router.push(routes.dashboard);
      } else if (res.status === 403) {
        toast.error("دسترسی غیر مجاز");
      } else if (res.status === 400) {
        toast.error("مشکلی پیش آمده است.لطفا مجددا تلاش فرمایید");
      }
    } catch (error) {
      toast.error("مشکلی پیش آمده است.لطفا مجددا تلاش فرمایید");
    } finally {
      setSelectedPost({
        isOpen: false,
        post: null,
      });
    }
  };

  return (
    <div className="flex gap-3">
      <span className="cursor-pointer text-gold transition-all duration-200 hover:scale-110">
        <Trash2
          size={20}
          onClick={() => setSelectedPost({ isOpen: true, post })}
        />
      </span>
      <span className="cursor-pointer text-gold transition-all duration-200 hover:scale-110">
        <Link href={`/${post.id}/edit`}>
          <Edit2 size={20} />
        </Link>
      </span>
      <Dialog
        open={selectedPost.isOpen}
        onOpenChange={() =>
          setSelectedPost({
            isOpen: false,
            post: null,
          })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف پست</DialogTitle>
            <DialogDescription>
              آیا از حذف پست انتخاب شده مطمئن هستید؟
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3">
            <Button
              className="w-fit bg-gold text-white hover:bg-gold hover:text-white"
              onClick={handleDelete}
            >
              حذف
            </Button>
            <Button
              className="w-fit border border-gold bg-transparent text-gold hover:bg-gold hover:text-white"
              onClick={() =>
                setSelectedPost({
                  isOpen: false,
                  post: null,
                })
              }
            >
              بستن
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostOptions;
