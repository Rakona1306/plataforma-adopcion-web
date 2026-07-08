import { authService } from "@/features/system/auth/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
    const cookie = (await cookies()).get('access_token')?.value;

    try {
        const response = await authService.profile({ headers: { cookie: `access_token=${cookie}` || "", Authorization: `Bearer ${cookie || ""}` } });

        if (request.nextUrl.pathname.startsWith("/account") && !response) {
            return NextResponse.redirect(new URL("/login", request.url))
        }

        if (request.nextUrl.pathname.startsWith("/dashboard") && response?.role?.toDashboard === false) {
            return NextResponse.redirect(new URL("/", request.url))
        }

        return NextResponse.next()

    } catch (error) {
        console.log("PROXY ERROR", error);
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: [
        "/account/:path*",
        "/dashboard/:path*"
    ],
};