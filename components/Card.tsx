import { cn } from "@/lib/utils"

const Card = ({ children, className }: { children: React.ReactNode, className: string }) => {
    return (
      <span className={cn("w-[200px] h-[320px] rounded-2xl p-4", className)}>{children}</span>
    )
}

export default Card