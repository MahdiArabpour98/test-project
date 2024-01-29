import { postById } from "@/actions/data";
import EditPostForm from "./edit-post-form";

export const metadata = {
  title: "ویرایش پست",
};

const UpdatePost = async ({ params }) => {
  const post = await postById(params.id);

  return <EditPostForm post={post} />;
};

export default UpdatePost;
