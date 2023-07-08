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


export const discountFilterOptions = [
  {
    id: uuidv4(),
    value: 'all',
    label: 'All'
  },
  {
    id: uuidv4(),
    value: 'no-discount',
    label: 'No Discount'
  },
  {
    id: uuidv4(),
    value: 'with-discount',
    label: 'With Discount'
  },
]

export const sortByOptions = [
  {
    id: uuidv4(),
    value: 'name-asc',
    label: 'Sort by name (A-Z)'
  },
  {
    id: uuidv4(),
    value: 'name-desc',
    label: 'Sort by name (Z-A)'
  },
  {
    id: uuidv4(),
    value: 'regularPrice-asc',
    label: 'Sort by price (low first)'
  },
  {
    id: uuidv4(),
    value: 'regularPrice-dsc',
    label: 'Sort by price (high first)'
  },
  {
    id: uuidv4(),
    value: 'maxCapacity-asc',
    label: 'Sort by capacity (low first)'
  },
  {
    id: uuidv4(),
    value: 'maxCapacity-dsc',
    label: 'Sort by capacity (high first)'
  },
]

