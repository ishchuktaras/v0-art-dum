import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin


  if (code) {
    const supabase = await createClient()
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        return NextResponse.redirect(`${origin}/auth/login?error=Chyba při potvrzení emailu`)
      }

      return NextResponse.redirect(`${origin}/admin`)
    } catch (error) {
      return NextResponse.redirect(`${origin}/auth/login?error=Nastala chyba`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login`)
}
