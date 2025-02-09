import { cn } from "@/lib/utils"

interface LoadingProps {
    className?: string
}

export function Loading({ className }: LoadingProps) {
    return (
        <div className={cn(
            "flex min-h-screen items-center justify-center",
            className
        )}>
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
    )
}