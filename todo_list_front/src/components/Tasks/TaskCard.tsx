import Link from "next/link";
import React from "react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
}

interface TasksProps {
  tasks: Task[];
}

export default function Tasks({ tasks }: TasksProps) {
  return (
    <div className="w-full mx-auto p-6 bg-background rounded-lg shadow-lg">
      <h3 className="sr-only">Tasks</h3>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="transition-transform duration-200 ease-in-out"
          >
            <div className=" pb-5 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transform transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              {/* Accent area */}
              <div className="h-5 w-full bg-primary rounded-t-lg" />
              {/* Adjust the height as needed */}
              <div className="px-5">
                <Link href={`?taskId=${task.id}&modal=true`}>
                  <dl className="relative flex flex-wrap gap-x-3 pt-3">
                    {/* Added padding-top to avoid overlap */}
                    <dt className="sr-only">Title</dt>
                    <dd className="w-full flex-none text-xl font-bold tracking-tight text-gray-900">
                      {task.title}
                    </dd>
                    <dt className="sr-only">Description</dt>
                    <dd className="mt-2 text-base text-gray-500 w-full">
                      {task.description
                        ? `${task.description.slice(0, 50)}${
                            task.description.length > 50 ? "..." : ""
                          }`
                        : "No description"}
                    </dd>
                    <dt className="sr-only">Status</dt>
                    <dd className="mt-2 text-base font-semibold text-gray-900">
                      Status: {task.status}
                    </dd>
                    <dt className="sr-only">Due Date</dt>
                    <dd className="mt-2 flex items-center gap-x-3 text-gray-500 text-sm">
                      <svg
                        viewBox="0 0 2 2"
                        aria-hidden="true"
                        className="h-1 w-1 flex-none fill-gray-500"
                      >
                        <circle r={1} cx={1} cy={1} />
                      </svg>
                      {task.dueDate || "No due date"}
                    </dd>
                  </dl>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
