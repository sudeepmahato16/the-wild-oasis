import { IconType } from "react-icons/lib";

export interface INavLink {
    label: string,
    icon: IconType,
    pathname: string,
    id: string
}

export type ExtendedBooking = Booking & {
    guest: {
      fullName: string;
      email: string;
      country: string;
      countryFlag: string;
      nationalID: string;
      nationality: string;
    };
    cabin: {
      name: string;
    };
  };