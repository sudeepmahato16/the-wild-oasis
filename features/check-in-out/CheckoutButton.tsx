import React, { FC } from "react";
import Button from "@/components/Button";
import { useCheckout } from "./hooks/useCheckout";

interface CheckoutButtonProps {
  bookingId: string;
}

const CheckoutButton: FC<CheckoutButtonProps> = ({ bookingId }) => {
  const { checkout, isCheckingOut } = useCheckout();
  
  return (
    <Button
      variant="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
