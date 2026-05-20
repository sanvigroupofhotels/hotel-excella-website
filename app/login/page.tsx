"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage(){
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  const router=useRouter()
  const submit=async()=>{
    setLoading(true);setError("")
    if (!email || !password) { setError('Email and password are required'); setLoading(false); return }
    document.cookie = `sb-access-token=internal-session; path=/; max-age=${60*60*8}`
    router.push('/dashboard')
  }
  return <main className="min-h-screen grid place-items-center p-6 bg-black"><Card className="w-full max-w-md p-6 space-y-4 bg-card/90 border-gold"><h1 className="font-serif text-3xl text-gold">Hotel Excella CRM</h1><Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><Input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />{error&&<p className="text-red-400 text-sm">{error}</p>}<Button onClick={submit} disabled={loading} className="w-full">{loading?'Signing in...':'Login'}</Button></Card></main>
}
