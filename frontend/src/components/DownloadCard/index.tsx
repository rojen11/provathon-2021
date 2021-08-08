import React from "react";
import SimpleButton from "../SimpleButton";

type DownloadCardProps = {
  header: string;
};

export default function DownloadCard({ header }: DownloadCardProps) {
  return (
    <div className="w-96 h-96 bg-gray-200 p-5 relative">
      <div className="text-2xl text-center">{header}</div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-10">
        <SimpleButton
          name="Download"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              color="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          }
          color="gray"
          xspacing="5"
          yspacing="3"
        />
      </div>
    </div>
  );
}
