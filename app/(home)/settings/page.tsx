import React from "react";
import UpdateSettingForm from "@/features/settings/UpdateSettingForm";
import { getSettings } from "@/services/getSettings";

const Settings = async () => {
  const settings = await getSettings();
  return <div className="flex flex-col gap-4">
     <h1 className="text-[24px] dark:text-gray-100 font-semibold">
      Update hotel settings
     </h1>
     <UpdateSettingForm settings={settings}/>
  </div>;
};

export default Settings;
