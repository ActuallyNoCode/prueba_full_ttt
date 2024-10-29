import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchTasks } from "@/services/taskService";
import Tasks from "@/components/Tasks/TaskCard";
import { BiPlus, BiSearch } from "react-icons/bi";
import TaskModal from "@/components/Tasks/TaskModal"; // Import the TaskModal
import TaskDetailsModal from "@/components/Tasks/TaskDetailsModal";
import { TaskStatus } from "@/lib/constants";

interface TasksViewProps {
  searchParams: {
    search?: string;
    filter?: string;
    modal?: string; // Added modal query param
    taskId?: string;
  };
}

export default async function TasksView({ searchParams }: TasksViewProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>Unauthorized</div>;
  }

  // Destructure searchParams to get search, filter, and modal
  const { search = "", filter = "", modal, taskId } = searchParams;

  const tasks = await fetchTasks(session.token.accessToken, search, filter);

  // Define styles for highlighted input and select
  const highlightStyles = "ring-2 ring-primary border-primary";

  return (
    <>
      <div className="flex flex-col flex-1 max-w-5xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold">Tasks Web App</h1>

        <form
          className="flex flex-col md:flex-row gap-3 mt-4"
          action="/tasks"
          method="GET"
        >
          <div className="flex flex-col flex-1">
            <input
              id="search"
              name="search"
              placeholder="Search tasks"
              type="text"
              defaultValue={search}
              className={`block w-full rounded-md border-0 py-4 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm ${
                search ? highlightStyles : ""
              }`}
            />
          </div>
          <div className="flex flex-col">
            <select
              id="task-filter"
              name="filter"
              defaultValue={filter}
              className={`block w-full md:w-64 rounded-md border-0 py-4 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryDark sm:text-sm ${
                filter && filter !== "" ? highlightStyles : ""
              }`}
            >
              <option value="">All Tasks</option>
              <option value={TaskStatus.DONE}>Done</option>
              <option value={TaskStatus.PENDING}>Pending</option>
              <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center rounded bg-primary hover:bg-primaryDark text-white px-4 py-2"
          >
            <BiSearch className="h-4 w-4 mr-1" />
            Search
          </button>
        </form>

        {tasks.length > 0 ? (
          <Tasks tasks={tasks} />
        ) : (
          <p className="mt-10 text-gray-700">
            No tasks found. Create a new Task in the bottom right.
          </p>
        )}
      </div>

      <a
        href="/tasks?modal=true" // Link to open the modal
        className="rounded-full bg-primary hover:bg-primaryDark text-white fixed bottom-10 right-10 inline-block hover:scale-125 transition-transform duration-300 ease-in-out"
      >
        <BiPlus className="h-14 w-14 p-1" />
      </a>

      {/* Conditionally render the TaskModal based on the modal query param */}
      {modal === "true" && !taskId && <TaskModal />}

      {/* Conditionally render the TaskDetailsModal based on the taskId query param */}
      {modal === "true" && taskId && <TaskDetailsModal params={searchParams} />}
    </>
  );
}
