export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/((?!login|api|_next/static|_next/image|favicon.ico).*)",
    "/admin",
  ],
};

