export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/dashboard",
        "/cabins",
        "/settings",
        "/bookings",
        "/users",
        "/accounts"
    ]
}