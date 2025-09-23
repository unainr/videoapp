import React from 'react'
import { SignInForm } from '@/components/auth/sign-in/SignInForm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const SignInPage =  async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
    if(!!session){
    redirect("/")
  }
  return (
    <><SignInForm/></>
  )
}

export default SignInPage