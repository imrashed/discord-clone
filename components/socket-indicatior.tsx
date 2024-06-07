"use client";

import React, { useEffect } from "react";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";
import Notify from "@/utils/notification";
import { AUTH } from "@/app/api/service/auth";

export function SocketIndicatior() {
  const { isConnected, socket } = useSocket();

  const user = AUTH.getUserData();
  const userData = user && JSON.parse(user + "");

  useEffect(() => {
    if (socket) {
      socket.on(`newMessage`, (message: any) => {
        if (userData?.email !== message?.member?.profile?.email) {
          Notify(message?.content);
        }
      });
    }
  }, [socket]);

  if (!isConnected)
    return (
      <Badge
        variant="outline"
        className="bg-yellow-600 text-white border-none"
      >
        Fallback: Polling every 1s
      </Badge>
    );

  return (
    <Badge
      variant="outline"
      className="bg-emerald-600 text-white border-none"
    >
      Live: Real-time updates
    </Badge>
  );
}
