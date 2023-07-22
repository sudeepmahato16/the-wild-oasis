import React from "react";
import Button from "./Button";
import SpinnerMini from "./Loader";

interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: (fn?: () => void) => void;
  disabled: boolean;
  onCloseModal?: () => void;
  isLoading?: boolean;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  isLoading,
}) => {
  const onDelete = () => {
    onConfirm(onCloseModal);
  };

  return (
    <div className="w-[400px] flex flex-col gap-3">
      <h1 className="text-[20px] font-medium dark:text-gray-300">
        Delete {resourceName}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-[13.75px] leading-[1.6] mb-4">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button
          variant="secondary"
          disabled={disabled}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          className="flex items-center gap-2"
          disabled={disabled}
          onClick={onDelete}
        >
          {isLoading && <SpinnerMini />}
          <span> Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
