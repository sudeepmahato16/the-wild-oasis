<div align="center">

  <img src="/public/logo-dark.png#gh-dark-mode-only" alt="logo" width="200" height="auto" />
  <img src="/public/logo-light.png#gh-light-mode-only" alt="logo" width="200" height="auto" />
  <br/>
  <br/>
  <p>
   The Wild Oasis is an internal hotel management system built with nextjs13, prisma, MongoDB, typescript, tailwind CSS, and many other technologies. It allows employees to manage everything about hotel bookings, cabins, and guests.
  </p>

<p>
  <a href="https://github.com/sudeepmahato16/the-wild-oasis/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/sudeepmahato16/the-wild-oasis" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/sudeepmahato16/the-wild-oasis" alt="last update" />
  </a>
  <a href="https://github.com/sudeepmahato16/the-wild-oasis/network/members">
    <img src="https://img.shields.io/github/forks/sudeepmahato16/the-wild-oasis" alt="forks" />
  </a>
  <a href="https://github.com/sudeepmahato16/the-wild-oasis/stargazers">
    <img src="https://img.shields.io/github/stars/sudeepmahato16/the-wild-oasis" alt="stars" />
  </a>
  <a href="https://github.com/sudeepmahato16/the-wild-oasis/issues/">
    <img src="https://img.shields.io/github/issues/sudeepmahato16/the-wild-oasis" alt="open issues" />
  </a>
  <a href="https://github.com/sudeepmahato16/the-wild-oasis/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/sudeepmahato16/the-wild-oasis.svg" alt="license" />
  </a>
</p>
   
<h4>
    <a href="https://the-wild-oasis-roan.vercel.app/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/sudeepmahato16/the-wild-oasis/blob/main/README.md">Documentation</a>
  <span> · </span>
    <a href="https://github.com/sudeepmahato16/the-wild-oasis/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/sudeepmahato16/the-wild-oasis/issues/">Request Feature</a>
  </h4>
</div>

</br>

## Features

1. **User Authentication and Signup:**

   1. Hotel employees can log in to the application to perform tasks.
   2. New users can only be signed up within the application to ensure that only actual hotel employees can create accounts.

2. **User Profile Management:**

   1. Users can upload an avatar to personalize their profile.
   2. Users can change their name and password.

3. **Cabin Management:**

   1. The app provides a table view with all cabins.
   2. The table view displays cabin information, including cabin photo, name, capacity, price, and current discount.
   3. Users can update or delete existing cabins.
   4. Users can create new cabins, including the ability to upload a photo.

4. **Booking Management:**

   1. The app provides a table view with all bookings.
   2. The table view displays booking information, including arrival and departure dates, booking status, paid amount, cabin details, and guest data.
   3. Booking status can be "unconfirmed," "checked in," or "checked out."
   4. The table view is filterable by booking status.
   5. Additional booking data includes the number of guests, number of nights, guest observations, and whether breakfast was booked and its price.

5. **Booking Operations:**

   1. Users can delete, check in, or check out a booking as the guest arrives.
   2. On check-in, users can accept payment outside the app and then confirm the payment within the app.
   3. Guests can add breakfast for the entire stay during check-in if they haven't already.

6. **Guest Data Management:**

   1. Guest data contains full name, email, national ID, nationality, and a country flag for easy identification.

7. **Dashboard:**

   1. The initial app screen serves as a dashboard displaying important information for the last 7, 30, or 90 days.
   2. It shows a list of guests checking in and out on the current day, and users can perform tasks related to these activities from the dashboard.
   3. The dashboard provides statistics on recent bookings, sales, check-ins, and occupancy rates.
   4. It includes a chart showing all daily hotel sales, distinguishing between "total" sales and "extras" sales (only breakfast at present).
   5. There's also a chart displaying statistics on stay durations, an important metric for the hotel.

8. **Application-wide Settings:**

   1. Users can define application-wide settings such as breakfast price, minimum and maximum nights per booking, and maximum guests per booking.

9. **Dark Mode:**
   1. The app includes a dark mode option for a different visual appearance and enhanced user experience in low-light conditions.

<br/>

## :camera: Screenshots

<kbd><img width="890" alt="login" src="https://github.com/sudeepmahato16/the-wild-oasis/assets/122378993/6648f02d-fb01-46ac-810c-fa47066e83ff"></kbd>

<kbd><img width="957" alt="dashboard" src="https://github.com/sudeepmahato16/the-wild-oasis/assets/122378993/77754290-4df7-42ee-9e13-66748d596cff"></kbd>

<kbd><img width="956" alt="bookings" src="https://github.com/sudeepmahato16/the-wild-oasis/assets/122378993/fa04e745-4b44-41d9-b293-53c63545ea9b"></kbd>

<kbd><img width="957" alt="single-booking" src="https://github.com/sudeepmahato16/the-wild-oasis/assets/122378993/33d830fd-6887-467e-b79f-cab427f33680"></kbd>

<br/>

## Installation

- Clone the repository:

  ```
  git clone https://github.com/sudeepmahato16/the-wild-oasis.git
  ```

- Navigate to the project directory:

  ```
  cd the-wild-oasis
  ```

- Install the dependencies:

  ```
  npm install
  ```

- Set up the environment variables:

  1.  Create a `.env` file in the root directory.

  2.  Add the following variables to the .env file, replacing the placeholder values with your own:

  ```
  DATABASE_URL=<your-mongodb-uri>
  NEXTAUTH_SECRET=<your-nextauth-secret>
  NEXT_PUBLIC_CLOUDINARY_KEY=<your-cloudinary-cloud-name>
  ```

<br/>

## Usage

- In the middleware.ts file, make sure to comment out all the routes as shown below:

  ```
  export { default } from "next-auth/middleware"

  export const config = {
   matcher: [
       // "/dashboard",
       // "/cabins",
       // "/settings",
       // "/bookings",
       // "/users",
       // "/accounts"
   ]
  }
  ```

- To upload sample data, kindly remove the comments from the Uploader component within the Sidebar component, as depicted here:

  ```
  "use client";
  import React from "react";
  import Logo from "./Logo";
  import MainNav from "./MainNav";
  import { useGlobalContext } from "@/context/GlobalContext";
  import Uploader from "@/data/Uploader";

  const Sidebar = () => {
  const { isSidebarOpen } = useGlobalContext();
  return (

  <aside
  className={`row-span-full w-[250px] ${
        isSidebarOpen ? "-ml-[250px] " : "m-0 "
      } bg-white dark:bg-black py-8 px-6 border-r dark:border-gray-900 transition-all duration-300 ease-in-out border-gray-100 flex flex-col gap-8 `} >
  <Logo />
  <MainNav />
  <Uploader />
  </aside>
  );
  };
  
   export default Sidebar;

   ```

- Start the development server:

   ```
   
   npm run dev
   
   ```

- Open your browser and visit `http://localhost:3000` to access the application.

- Click on the Upload All button in the sidebar to upload sample data.

- Click on Users in the sidebar and create a new user.

- Once completed, uncomment all the routes in the middleware.ts file and restart the development server.

- Finally, log in with the newly created user account.

<br/>

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes to the new branch.
- Open a pull request back to the main repository, including a description of your changes.
