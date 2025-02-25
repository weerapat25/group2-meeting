"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

const rooms = {
  "ห้องประชุม 1": { capacity: 100 },
  "ห้องประชุม 2": { capacity: 100 },
  "ห้องประชุม 3": { capacity: 100 },
  "ห้องประชุม 4": { capacity: 100 },
  "ห้องประชุม 5": { capacity: 50 },
  "ห้องประชุม 6": { capacity: 50 },
  "ห้องประชุม 7": { capacity: 50 },
  "ห้องประชุม 8": { capacity: 50 },
}

function generateTimeOptions() {
  const options = []
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      options.push(time)
    }
  }
  return options
}

const timeOptions = generateTimeOptions()

export default function RoomBookingForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [department, setDepartment] = useState("")
  const [attendees, setAttendees] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const validateTime = () => {
    if (!startTime || !endTime) {
      setErrorMessage("กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุด")
      return false
    }
    if (startTime >= endTime) {
      setErrorMessage("เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด")
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!selectedRoom || !date || !department || !attendees || !startTime || !endTime) {
      setErrorMessage("กรุณากรอกข้อมูลให้ครบทุกช่อง")
      return
    }

    const attendeesNumber = Number.parseInt(attendees, 10)
    if (isNaN(attendeesNumber) || attendeesNumber <= 0) {
      setErrorMessage("กรุณากรอกจำนวนผู้เข้าประชุมให้ถูกต้อง")
      return
    }

    if (attendeesNumber > rooms[selectedRoom as keyof typeof rooms].capacity) {
      setErrorMessage(`จำนวนผู้เข้าร่วมประชุมเกินความจุของห้อง (${rooms[selectedRoom as keyof typeof rooms].capacity} คน)`)
      return
    }

    if (!validateTime()) {
      return
    }

    setShowConfirmation(true)
  }

  const handleConfirmBooking = () => {
    console.log({ date, department, attendees, selectedRoom, startTime, endTime })
    setShowConfirmation(false)
    // เพิ่มโค้ดสำหรับรีเซ็ตฟอร์มหรือแสดงข้อความยืนยันการจองสำเร็จ
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="room" className="text-lg font-semibold mb-2 block">
              เลือกห้องประชุม
            </Label>
            <Select onValueChange={setSelectedRoom} value={selectedRoom} required>
              <SelectTrigger id="room" className="w-full">
                <SelectValue placeholder="เลือกห้องประชุม" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(rooms).map(([room, { capacity }]) => (
                  <SelectItem key={room} value={room}>
                    {room} (รองรับ {capacity} คน)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date" className="text-lg font-semibold mb-2 block">
              เลือกวันที่
            </Label>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" required />
          </div>
        </div>

        {selectedRoom && (
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-lg font-semibold">รูปภาพห้องประชุม</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">{selectedRoom}</h3>
                <Badge variant="secondary">
                  <Users className="w-4 h-4 mr-1" />
                  รองรับ {rooms[selectedRoom as keyof typeof rooms].capacity} คน
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="department" className="text-lg font-semibold mb-2 block">
              ส่วนงาน
            </Label>
            <Input
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="กรอกส่วนงานของคุณ"
              required
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="attendees" className="text-lg font-semibold mb-2 block">
              จำนวนผู้เข้าประชุม
            </Label>
            <Input
              id="attendees"
              type="number"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
              placeholder="กรอกจำนวนผู้เข้าประชุม"
              required
              min="1"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="startTime" className="text-lg font-semibold mb-2 block">
              เวลาเริ่มต้น
            </Label>
            <Select onValueChange={setStartTime} value={startTime} required>
              <SelectTrigger id="startTime" className="w-full">
                <SelectValue placeholder="เลือกเวลาเริ่มต้น" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="endTime" className="text-lg font-semibold mb-2 block">
              เวลาสิ้นสุด
            </Label>
            <Select onValueChange={setEndTime} value={endTime} required>
              <SelectTrigger id="endTime" className="w-full">
                <SelectValue placeholder="เลือกเวลาสิ้นสุด" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        <Button type="submit" className="w-full">
          จองห้องประชุม
        </Button>
      </form>
      <Dialog open={showConfirmation} onOpenChange={(open: boolean) => setShowConfirmation(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการจองห้องประชุม</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p>
              <strong>ห้องประชุม:</strong> {selectedRoom}
            </p>
            <p>
              <strong>วันที่:</strong>{" "}
              {date?.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p>
              <strong>เวลา:</strong> {startTime} - {endTime}
            </p>
            <p>
              <strong>ส่วนงาน:</strong> {department}
            </p>
            <p>
              <strong>จำนวนผู้เข้าประชุม:</strong> {attendees}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleConfirmBooking}>ยืนยันการจอง</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

