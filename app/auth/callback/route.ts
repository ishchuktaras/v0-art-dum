// app/auth/callback/route.ts

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

      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single()

        if (!existingProfile) {
          await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            role: 'user',
            full_name: user.user_metadata?.full_name || null
          })
        }
      }

      return NextResponse.redirect(`${origin}/admin`)
    } catch (error) {
      return NextResponse.redirect(`${origin}/auth/login?error=Nastala chyba`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login`)
}
