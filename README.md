# The Wild Oasis

![dashboard](https://github.com/sudeepmahato16/the-wild-oasis/assets/122378993/5ce3f792-2321-4f5d-b1ac-059340142864)

The Wild Oasis is an internal hotel management system built with nextjs13, prisma, MongoDB, typescript, tailwind CSS and many other technologies. It allows employees to manage everything about hotel bookings, cabins, and guests.


## Features

1. **User Authentication and Signup:**
   - Hotel employees can log in to the application to perform tasks.
   - New users can only be signed up within the application to ensure that only actual hotel employees can create accounts.

2. **User Profile Management:**
   - Users can upload an avatar to personalize their profile.
   - Users can change their name and password.

3. **Cabin Management:**
   - The app provides a table view with all cabins.
   - The table view displays cabin information, including cabin photo, name, capacity, price, and current discount.
   - Users can update or delete existing cabins.
   - Users can create new cabins, including the ability to upload a photo.

4. **Booking Management:**
   - The app provides a table view with all bookings.
   - The table view displays booking information, including arrival and departure dates, booking status, paid amount, cabin details, and guest data.
   - Booking status can be "unconfirmed," "checked in," or "checked out."
   - The table view is filterable by booking status.
   - Additional booking data includes the number of guests, number of nights, guest observations, and whether breakfast was booked and its price.
 
5. **Booking Operations:**
   - Users can delete, check-in, or check out a booking as the guest arrives.
   - On check-in, users can accept payment outside the app and then confirm the payment within the app.
   - Guests can add breakfast for the entire stay during check-in if they hadn't already.

6. **Guest Data Management:**
   - Guest data contains full name, email, national ID, nationality, and a country flag for easy identification.

7. **Dashboard:**
   - The initial app screen serves as a dashboard displaying important information for the last 7, 30, or 90 days.
   - It shows a list of guests checking in and out on the current day, and users can perform tasks related to these activities from the dashboard.
   - The dashboard provides statistics on recent bookings, sales, check-ins, and occupancy rates.
   - It includes a chart showing all daily hotel sales, distinguishing between "total" sales and "extras" sales (only breakfast at present).
   - There's also a chart displaying statistics on stay durations, an important metric for the hotel.

8. **Application-wide Settings:**
   - Users can define application-wide settings such as breakfast price, minimum and maximum nights per booking, and maximum guests per booking.

9. **Dark Mode:**
   - The app includes a dark mode option for a different visual appearance and enhanced user experience in low-light conditions.


## Demo

You can check out a live demo [here](https://the-wild-oasis-roan.vercel.app).

## Screenshots

  <kbd><img width="890" alt="login" src="https://github.com/sudeepmahato16/the-wild-oasis/assets/122378993/6648f02d-fb01-46ac-810c-fa47066e83ff"></kbd>

  <kbd><img width="957" alt="dashboard" src="https://github.com/sudeepmahato16/the-wild-oasis/assets/122378993/77754290-4df7-42ee-9e13-66748d596cff"></kbd>

  <kbd><img width="956" alt="bookings" src="https://github.com/sudeepmahato16/the-wild-oasis/assets/122378993/fa04e745-4b44-41d9-b293-53c63545ea9b"></kbd>

  <kbd><img width="957" alt="single-booking" src="https://github.com/sudeepmahato16/the-wild-oasis/assets/122378993/33d830fd-6887-467e-b79f-cab427f33680"></kbd>


## Installation

- Clone the repository:

    ```
    git clone https://github.com/sudeepmahato16/the-wild-oasis.git
    ```
-  Navigate to the project directory:

    ```
    cd the-wild-oasis
    ```
-  Install the dependencies:

    ```
    npm install
    ```
-  Set up the environment variables:

   1. Create a `.env` file in the root directory.

   2. Add the following variables to the .env file, replacing the placeholder values with your own:

    ```
    DATABASE_URL=<your-mongodb-uri>
    NEXTAUTH_SECRET=<your-nextauth-secret>
    NEXT_PUBLIC_CLOUDINARY_KEY=<your-cloudinary-cloud-name>
    ```

## Usage

- Start the development server:

    ```
    npm run dev
    ```
- Open your browser and visit `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes to the new branch.
- Open a pull request back to the main repository, including a description of your changes.
