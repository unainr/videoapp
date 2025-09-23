import React from 'react'
import { SignUpForm } from '@/components/auth/sign-up/SignUpForm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
const SignUpPage = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
    })
      if(!!session){
      redirect("/")
    }
  return (
    <><SignUpForm/></>
  )
}

export default SignUpPage