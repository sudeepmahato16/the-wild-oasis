import React from "react";
import Button from "./Button";

interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal?: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) => {
  return (
    <div className="w-[400px] flex flex-col gap-3">
      <h1 className="text-[20px] font-medium dark:text-gray-300">Delete {resourceName}</h1>
      <p className="text-gray-500 dark:text-gray-400 text-[13.75px] leading-[1.6] mb-4">
        Are you sure you want to delete this {resourceName} permanently? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" disabled={disabled} onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
