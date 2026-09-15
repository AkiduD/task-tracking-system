import { clerkMiddleware } from "@clerk/nextjs/server";

const publicRoutes = ["/sign-in", "/sign-up"];

export default clerkMiddleware(async (auth, request) => {
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isPublicRoute) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};