import React from "react";
import dayjs from "dayjs";
import { RequestItem } from "@repo/models";
import "tailwindcss/tailwind.css";

interface CardProps {
  request: RequestItem;
}
export function Card({ request }: CardProps) {
  return (
    <div
      data-testid="card-request"
      key={request.id}
      className="block p-6 border border-gray-400 rounded-lg shadow-xl"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {request.title}
      </h5>
      <p className="font-normal text-black mb-2">{request.author}</p>
      <p>{dayjs(request.createdAt).format("DD/MM/YYYY h:mm a")}</p>
    </div>
  );
}
