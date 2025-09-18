import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<any, any>(({ className, value, ...props }, ref) => {
  const Root = ProgressPrimitive.Root as any
  const Indicator = ProgressPrimitive.Indicator as any
  
  return (
    <Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <Indicator
        className="h-full w-full flex-1 bg-gradient-to-r from-purple-600 to-blue-600 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }