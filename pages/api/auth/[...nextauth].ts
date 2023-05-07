import NextAuth from 'next-auth';
import * as dotenv from 'dotenv';
import GoogleProvider from 'next-auth/providers/google';

dotenv.config();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.GOOGLE_SECRET,
};
export default NextAuth(authOptions);
