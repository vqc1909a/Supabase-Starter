import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;

export async function updateSession(request: NextRequest) {
	// 1. Initial response with original request
	// return NextResponse.redirect(new URL('/login', request.url));
	let supabaseResponse = NextResponse.next({
		request,
	});

	// With Fluid compute, don't put this client in a global environment
	// variable. Always create a new one on each request.
	const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
		cookies: {
			// 2. Supabase reads existing cookies
			getAll() {
				return request.cookies.getAll(); // Gets auth tokens
				},
				// 3. Supabase potentially refreshes tokens and sets new cookies
				setAll(cookiesToSet) {
					// Step 1: Update request cookies (for current request)
					cookiesToSet.forEach(({name, value}) => {
						console.log(
							`Setting cookie: ${name} = ${value.substring(0, 20)}...`
						);
						request.cookies.set(name, value); // Modify request cookies
					});
					// Step 2: Create NEW response with MODIFIED request
					supabaseResponse = NextResponse.next({
						request,
					});
					// Step 3: Update response cookies for browser and tells the browser to store/update these cookies for future requests.
					cookiesToSet.forEach(
						({name, value, options}) =>
							supabaseResponse.cookies.set(name, value, options) // Set response cookies
					);
				},
			},
		}
	);

	// Do not run code between createServerClient and supabase.auth.getClaims(). A simple mistake could make it very hard to debug issues with users being randomly logged out.

	// IMPORTANT: If you remove getClaims() and you use server-side rendering with the Supabase client, your users may be randomly logged out.
	// getClaims() is the trigger that makes Supabase process and refresh authentication cookies. Without it, the cookie management system never executes.

	// getClaims() returns JWT token claims (limited data) - Contains: { sub, email, iat, exp, role?, permissions? } - Fast (reads from JWT token)
	// getUser() returns full user object (comprehensive data). Contains: { id, email, phone, created_at, updated_at, user_metadata, app_metadata, ... } - Slower (database query)
	const {data} = await supabase.auth.getClaims(); // No network call

  // if (data?.claims?.role !== "admin") {
  //   const url = request.nextUrl.clone();
	// 	url.pathname = "unauthorized";
	// 	return NextResponse.redirect(url);
	// }

	const user = data?.claims;

	//ProtectedPrivateRoute - If the user is not logged in (user is null) and tries to access a protected route (not login or auth), redirect to login page
	if (
		request.nextUrl.pathname !== "/" &&
		!request.nextUrl.pathname.startsWith("/auth") &&
		!user
	) {
		// no user, potentially respond by redirecting the user to the login page
		const url = request.nextUrl.clone();
		url.pathname = "/auth/login";
		return NextResponse.redirect(url);
	}

	//ProtectedPublicRoute - If the user is logged in (user exists) and tries to access a public route (login or auth), redirect to home page
	if(request.nextUrl.pathname.startsWith("/auth") && user) {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.redirect(url);
	}

	// IMPORTANT: You *must* return the supabaseResponse object as it is.
	// If you're creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}
