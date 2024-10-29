/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TaskStatus } from "@/lib/constants";
import { updateTask, getTaskById, deleteTask } from "@/services/taskService";
import { useSession } from "next-auth/react";
import { MdDelete } from "react-icons/md";

export default function TaskDetailsModal({ params }: { params: any }) {
  const { data: session } = useSession();
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    status: TaskStatus.IN_PROGRESS,
    dueDate: "",
  });

  const taskId = params.taskId;
  const modal = params.modal === "true";

  console.log("TaskDetailsModal -> params", params);

  // Validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    status: Yup.string().required("Status is required"),
    dueDate: Yup.date(),
  });

  // Fetch task details when taskId or modal changes
  useEffect(() => {
    const fetchTask = async () => {
      if (taskId && modal) {
        const taskData = await getTaskById(
          taskId,
          session?.token.accessToken || ""
        );
        if (taskData) {
          setInitialValues({
            title: taskData.title,
            description: taskData.description || "",
            status: taskData.status,
            dueDate: taskData.dueDate
              ? new Date(taskData.dueDate).toISOString().split("T")[0]
              : "",
          });
        }
      }
    };

    fetchTask();
  }, [taskId, modal, session]);

  // Handle form submission
  const handleSubmit = async (values: any) => {
    const updatedTask = await updateTask(
      taskId,
      values,
      session?.token.accessToken || ""
    );

    if (updatedTask) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("modal", "false");
      window.history.pushState({}, "", currentUrl);
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    await deleteTask(taskId, session?.token.accessToken || "");

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("modal", "false");
    window.history.pushState({}, "", currentUrl);
    window.location.reload();
  };

  if (!modal) return null;

  return (
    <div
      className={`fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Task Details</h2>
          <MdDelete
            className="text-red-500 text-2xl cursor-pointer"
            onClick={handleDelete}
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize // Ensures Formik reinitializes when initialValues change
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <Field
                  as="select"
                  id="status"
                  name="status"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                  <option value={TaskStatus.DONE}>Done</option>
                  <option value={TaskStatus.PENDING}>Pending</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <Field
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex justify-between">
                <Link
                  href="/tasks"
                  passHref
                  className="rounded bg-accent hover:bg-accentDark text-white px-4 py-2"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="rounded bg-primary hover:bg-primaryDark text-white px-4 py-2"
                >
                  Update Task
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
