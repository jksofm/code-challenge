import React from 'react'
import { Request } from '../models'
import dayjs from 'dayjs'

interface CardProps {
    request: Request
}
export function Card({request}:CardProps) {
  return (
    <div key={request.id} className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700">

<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{request.author}</h5>
<p className="font-normal text-gray-700 dark:text-gray-400">{request.title}</p>
    <p>{dayjs(request.createdAt).format("DD/MM/YYYY h:mm a")}</p>
 
</div>
  )
}

