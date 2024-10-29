/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TaskStatus } from "@/lib/constants";
import { createTask } from "@/services/taskService";
import { useSession } from "next-auth/react";

export default function TaskModal() {
  const { data: session } = useSession();
  // Validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    status: Yup.string().required("Status is required"),
    dueDate: Yup.date(),
  });

  // Handle form submission
  const handleSubmit = async (values: any) => {
    console.log(values);
    const createdTask = await createTask(
      values,
      session?.token.accessToken || ""
    );

    if (createdTask) {
      // Change the search parameter to close the modal
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("modal", "false"); // Change 'true' to 'false'
      window.history.pushState({}, "", currentUrl); // Update the URL without reloading
      window.location.reload(); // Reload the page
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>
        <Formik
          initialValues={{
            title: "",
            description: "",
            status: TaskStatus.IN_PROGRESS,
            dueDate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                  Create Task
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
