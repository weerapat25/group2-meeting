import RoomBookingForm from "../components/RoomBookingForm"
import { HotelIcon as MeetingRoom } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <MeetingRoom className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">ระบบจองห้องประชุม</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">จองห้องประชุม</h2>
          <RoomBookingForm />
        </div>
      </main>
      <footer className="bg-gray-100 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          &copy; 2025 ระบบจองห้องประชุม. สงวนลิขสิทธิ์.
        </div>
      </footer>
    </div>
  )
}

