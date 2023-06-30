import { v4 as uuidv4 } from "uuid";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

export const navLinks = [
  {
    id: uuidv4(),
    icon: HiOutlineHome,
    label: "Home",
    pathname: "/dashboard",
  },
  {
    id: uuidv4(),
    icon: HiOutlineCalendarDays,
    label: "Bookings",
    pathname: "/bookings",
  },
  {
    id: uuidv4(),
    icon: HiOutlineHomeModern,
    label: "Cabins",
    pathname: "/cabins",
  },
  {
    id: uuidv4(),
    icon: HiOutlineUsers,
    label: "Users",
    pathname: "/users",
  },
  {
    id: uuidv4(),
    icon: HiOutlineCog6Tooth,
    label: "Settings",
    pathname: "/settings",
  },
];
