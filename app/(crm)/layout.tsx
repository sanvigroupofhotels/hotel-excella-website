import Link from "next/link"
export default function L({children}:{children:React.ReactNode}){return <div><nav className='p-3 bg-zinc-900 text-zinc-200 flex gap-4'><Link href='/dashboard'>Dashboard</Link><Link href='/quotes/create'>Create</Link><Link href='/quotes/history'>History</Link><Link href='/followups'>Follow-ups</Link><Link href='/settings'>Settings</Link></nav>{children}</div>}
