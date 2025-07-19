// types/next-auth.d.ts
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      randomKey: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    randomKey: string;
  }
}
