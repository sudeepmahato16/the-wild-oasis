import React from "react";
import UpdateSettingForm from "@/features/settings/UpdateSettingForm";

const Settings = () => {
  return <div className="flex flex-col gap-4">
     <h1 className="text-[24px] dark:text-gray-100 font-semibold">
      Update hotel settings
     </h1>
     <UpdateSettingForm />
  </div>;
};

export default Settings;
