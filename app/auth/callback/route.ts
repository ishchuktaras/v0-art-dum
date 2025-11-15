import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  console.log('[v0] Auth callback received with code:', code)
  console.log('[v0] Origin:', origin)

  if (code) {
    const supabase = await createClient()
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('[v0] Error exchanging code for session:', error)
        return NextResponse.redirect(`${origin}/auth/login?error=Chyba při potvrzení emailu`)
      }

      console.log('[v0] Email confirmed successfully, redirecting to admin')
      return NextResponse.redirect(`${origin}/admin`)
    } catch (error) {
      console.error('[v0] Exception in auth callback:', error)
      return NextResponse.redirect(`${origin}/auth/login?error=Nastala chyba`)
    }
  }

  console.log('[v0] No code provided, redirecting to login')
  return NextResponse.redirect(`${origin}/auth/login`)
}
