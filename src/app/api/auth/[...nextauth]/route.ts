// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // Your provider configuration
      async authorize(credentials) {
        try {
          const response = await fetch('/your-api-endpoint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
          })

          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          const contentType = response.headers.get('content-type')

          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON')
          }

          const data = await response.json()

          // Process your data here
          return data
        } catch (error) {
          console.error('Failed to fetch data:', error)
          throw new Error('Failed to authenticate')
        }
      }
    })
  ]

  // Other next-auth configurations
})

export const POST = handler
