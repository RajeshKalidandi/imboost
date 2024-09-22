import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"
import GoogleProvider from "next-auth/providers/google"
import { supabase } from "../../../utils/supabaseClient"

export default NextAuth({
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if the user exists in Supabase
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking user:', error)
          return false
        }

        if (!data) {
          // User doesn't exist, create a new user
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([
              {
                email: user.email,
                name: user.name,
                provider: account.provider,
                provider_id: account.providerAccountId
              }
            ])

          if (createError) {
            console.error('Error creating user:', createError)
            return false
          }
        }

        return true
      } catch (error) {
        console.error('Unexpected error during sign in:', error)
        return false
      }
    },
    async session({ session, token }) {
      try {
        // Add user id to session
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .eq('email', session.user.email)
          .single()

        if (error) {
          console.error('Error fetching user id:', error)
        } else if (data) {
          session.user.id = data.id
        }

        return session
      } catch (error) {
        console.error('Unexpected error during session callback:', error)
        return session
      }
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  }
})