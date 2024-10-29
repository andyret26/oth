import { useEffect, useId, useRef, useState } from "react"

import { format, isValid, parse } from "date-fns"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"
import "./DatePicker.scss"
import { TbCalendar } from "react-icons/tb"
import IconBtn from "../IconBtn/IconBtn"
import InputFiled from "../InputFiled/InputField"

interface Props {
  onChange: (newValue: string) => void
  value: string
}

export default function DatePicker({ onChange, value }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialogId = useId()
  const headerId = useId()

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date())

  // Hold the selected date in state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  // Hold the input value in state
  const [inputValue, setInputValue] = useState<string>("")

  // Hold the dialog visibility in state
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Function to toggle the dialog visibility
  const toggleDialog = () => setIsDialogOpen(!isDialogOpen)

  // Hook to handle the body scroll behavior and focus trapping.
  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      document.body.style.overflow = isOpen ? "hidden" : ""
    }
    if (!dialogRef.current) return
    if (isDialogOpen) {
      handleBodyScroll(true)
      dialogRef.current.showModal()
    } else {
      handleBodyScroll(false)
      dialogRef.current.close()
    }
  }, [isDialogOpen])

  const handleDayPickerSelect = (date: Date) => {
    if (!date) {
      setInputValue("")
      setSelectedDate(undefined)
    } else {
      setSelectedDate(date)
      setInputValue(format(date, "dd/MM/yyyy"))
      onChange(format(date, "dd/MM/yyyy"))
    }
    dialogRef.current?.close()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value) // keep the input value in sync
    const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date())

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate)
      setMonth(parsedDate)
    } else {
      setSelectedDate(undefined)
    }

    onChange(e.target.value)
  }

  useEffect(() => {
    setInputValue(value)

    const parsedDate = parse(value, "dd/MM/yyyy", new Date())

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate)
      setMonth(parsedDate)
    } else {
      setSelectedDate(undefined)
    }
  }, [value])

  return (
    <div className="date-picker">
      <InputFiled
        value={inputValue}
        label="Date"
        placeholder="MM/dd/yyyy"
        onChange={handleInputChange}
      />
      <IconBtn
        Icon={TbCalendar}
        onClick={toggleDialog}
        bgColor="yellow"
        size={30}
      />
      <dialog
        className="date-picker__dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        aria-labelledby={headerId}
        onClose={() => setIsDialogOpen(false)}
      >
        <DayPicker
          required
          month={month}
          onMonthChange={setMonth}
          autoFocus
          mode="single"
          selected={selectedDate}
          onSelect={handleDayPickerSelect}
        />
      </dialog>
    </div>
  )
}
