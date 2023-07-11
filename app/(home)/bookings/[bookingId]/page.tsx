import React from 'react'
import BookingDetail from '@/features/bookings/BookingDetail'

interface BookingProps{
  params: {
    bookingId: string
  }
}

const Booking = ({params: {bookingId}}: BookingProps) => {
  return (
    <BookingDetail id={bookingId}/>
  )
}

export default Booking