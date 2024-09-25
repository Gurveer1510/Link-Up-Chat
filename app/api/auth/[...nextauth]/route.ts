import { authOptions } from "@/app/libs/authOptions";
import NextAuth from "next-auth";

// Create NextAuth API route handler
const handler = NextAuth(authOptions);

// Export handler for GET and POST methods
export { handler as GET, handler as POST };
