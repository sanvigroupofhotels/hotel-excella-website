'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  PlusCircle,
  History,
  Bell,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

const navigation = [
  { name: 'Dashboard', href: '/crm', icon: LayoutDashboard },
  { name: 'Generate Quote', href: '/crm/quote/new', icon: PlusCircle },
  { name: 'Quotes History', href: '/crm/quotes', icon: History },
  { name: 'Follow-ups', href: '/crm/follow-ups', icon: Bell, badge: true },
  { name: 'Calendar', href: '/crm/calendar', icon: Calendar },
  { name: 'Reports', href: '/crm/reports', icon: FileText },
]

const bottomNavigation = [
  { name: 'Help & Support', href: '/crm/help', icon: HelpCircle },
  { name: 'Settings', href: '/crm/settings', icon: Settings },
]

interface CRMSidebarProps {
  pendingFollowUps?: number
}

export function CRMSidebar({ pendingFollowUps = 0 }: CRMSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/crm/login')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-serif font-bold text-lg">HE</span>
          </div>
        </div>
        <div>
          <h1 className="font-serif font-bold text-foreground">Hotel Excella</h1>
          <p className="text-xs text-muted-foreground">Boutique Luxury Stay</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = item.href === '/crm' 
            ? pathname === '/crm'
            : pathname.startsWith(item.href)
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
              {item.badge && pendingFollowUps > 0 && (
                <Badge variant="destructive" className="ml-auto text-xs">
                  {pendingFollowUps}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
        
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
