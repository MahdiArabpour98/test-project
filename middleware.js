import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      const isLoggedIn = !!token;
      const admin = token?.role === "ADMIN" || token?.role === "SUPERADMIN";
      if (isLoggedIn) {
        if (admin) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
});

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/add-user/:path*",
    "/create-post/:path*",
    "/posts-management/:path*",
  ],
};
