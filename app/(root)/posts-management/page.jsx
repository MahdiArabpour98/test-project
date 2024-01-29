import { allPosts } from "@/actions/data";
import PostOptions from "@/components/main-page/post-options";
import Image from "next/image";

const PostsManagementPage = async () => {
  const posts = await allPosts();

  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.length === 0 ? (
        <div>هیچ پستی برای نمایش وجود ندارد</div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-2 rounded-lg border border-gray-800 p-2"
          >
            <Image
              src="/login-page/primary-bg.jpg"
              width={360}
              height={200}
              className="h-40 w-full rounded-md"
              alt=""
            />
            <h3 className="font-medium">{post.authorName}</h3>
            <h3 className="">{post.title}</h3>
            <p className="font-thin">{post.description}</p>
            <PostOptions post={post} />
          </div>
        ))
      )}
    </div>
  );
};

export default PostsManagementPage;
