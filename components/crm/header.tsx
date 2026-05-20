'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bell, Eye, History, PlusCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface CRMHeaderProps {
  userName?: string
  notifications?: number
}

export function CRMHeader({ userName = 'Admin', notifications = 0 }: CRMHeaderProps) {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Domain/URL Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-secondary rounded-full text-sm font-medium text-secondary-foreground">
            quotes.hotelexcella.in
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/crm/quote/new">
            <Button variant="ghost" size="sm" className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Generate Quote
            </Button>
          </Link>
          <Link href="/crm/quote/preview">
            <Button variant="ghost" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
          </Link>
          <Link href="/crm/quotes">
            <Button variant="ghost" size="sm" className="gap-2">
              <History className="w-4 h-4" />
              Quotes History
            </Button>
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2 pr-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/crm/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/crm/help">Help & Support</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
