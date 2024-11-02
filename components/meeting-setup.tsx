"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const MeetingSetup = ({
  setIsSetupCompleted,
}: {
  setIsSetupCompleted: (value: boolean) => void;
}) => {
  const [isCamMicToggleOn, setIsCamMicToggleOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("Usecall must be used within StreamCall Components");
  }

  useEffect(() => {
    if (isCamMicToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isCamMicToggleOn, call?.camera, call?.microphone]);
  return (
    <div className="bg-slate-900 h-screen w-full text-white flex items-center justify-center flex-col gap-6">
      <h1 className="text-4xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isCamMicToggleOn}
            onChange={(e) => setIsCamMicToggleOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="bg-green-600 hover:bg-green-500"
        onClick={() => {
          call.join();

          setIsSetupCompleted(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};
