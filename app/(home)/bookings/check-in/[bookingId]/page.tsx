import React from 'react'

import CheckinBooking from '@/features/check-in-out/CheckinBooking'
import { getBooking } from '@/services/getBooking';
import { getSettings } from '@/services/getSettings';

interface IParams {
  bookingId?: string;
}

const CheckIn = async ({ params: { bookingId } }: { params: IParams }) => {
  const booking = await getBooking(bookingId!);
  const settings = await getSettings();
  return (
    <CheckinBooking booking={booking} settings={settings}/>
  )
}

export default CheckIn