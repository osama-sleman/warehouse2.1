"use client"

import { Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SearchHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  user: any
}

export function SearchHeader({ searchQuery, onSearchChange, user }: SearchHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search warehouse items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-gray-50 border-0 focus:bg-white transition-colors"
          />
        </div>
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.photo_url || "/placeholder.svg"} />
          <AvatarFallback>{user?.first_name?.[0] || <User className="w-4 h-4" />}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
