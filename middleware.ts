// updateSession: Custom function from your Supabase utilities (handles auth logic)
import { updateSession } from "@/lib/supabase/middleware";
// NextRequest: TypeScript type for Next.js request object
import { type NextRequest } from "next/server";

// User Request → Middleware → Page/API Route → Response

// What happens here:
// * Function Name: Must be named middleware (Next.js convention)
// * Parameter: Receives NextRequest object with request details
// * Delegation: Passes all logic to updateSession function
// * Return: Returns response from updateSession
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// The matcher is a regex pattern that determines which routes the middleware should run on.
// Pattern Breakdown:

// * / - Starts with slash (root)
// * ( - Start capture group
// * ?! - Negative lookahead (exclude these patterns)
// * _next/static - Exclude Next.js static files
// * _next/image - Exclude Next.js image optimization
// * favicon.ico - Exclude favicon
// * .*\\.(?:svg|png|jpg|jpeg|gif|webp)$ - Exclude image files
// * ) - End negative lookahead
// * .* - Match everything else
// * ) - End capture group

// "Run middleware on ALL routes EXCEPT static files, images, and favicon" such the following examples:
// * /_next/static/chunks/main.js (Next.js files)
// * /_next/image/logo.png (optimized images)
// * /favicon.ico
// * /logo.svg, /hero.png, etc. (static images)
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};


