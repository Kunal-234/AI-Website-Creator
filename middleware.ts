import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/workspace',
  '/api/(.*)' // Temporarily make API routes public for testing
])

export default clerkMiddleware(async (auth, req) => {
  // Temporarily disable authentication for development
  // if (!isPublicRoute(req)) {
  //   await auth.protect()
  // }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Run Clerk for all API routes
    '/api/(.*)',
  ],
};
