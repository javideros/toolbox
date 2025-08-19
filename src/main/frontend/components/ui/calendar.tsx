import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = {
  className?: string
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
}

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selected ? new Date(selected.getFullYear(), selected.getMonth(), 1) : new Date()
  )

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isSelected = (day: number) => {
    if (!selected) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date.toDateString() === selected.toDateString()
  }

  const isDisabled = (day: number) => {
    if (!disabled) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return disabled(date)
  }

  const selectDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (!isDisabled(day)) {
      onSelect?.(date)
    }
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex justify-center pt-1 relative items-center mb-4">
        <button
          onClick={previousMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <button
          onClick={nextMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-muted-foreground text-center text-sm font-normal p-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="h-9 w-9" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          return (
            <button
              key={day}
              onClick={() => selectDate(day)}
              disabled={isDisabled(day)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-9 p-0 font-normal",
                isSelected(day) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                isDisabled(day) && "text-muted-foreground opacity-50 cursor-not-allowed"
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }