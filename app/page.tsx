"use client";

import React, { useEffect, useState } from "react";
import type { users as User } from "@/generated/prisma";
import { deleteUserById } from "@/actions/deleteUserById";

export type TUser = Omit<User, "created_at" | "updated_at"> & {
  created_at: string;
  updated_at: string;
};

const limit = 10;

export default function Page() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (cursorId?: number) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (cursorId) params.set("cursor_id", String(cursorId));
    params.set("limit", String(limit));

    const res = await fetch(`/api/users?${params.toString()}`);
    const data: TUser[] = await res.json();
    setUsers((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const loadMore = () => {
    if (users.length > 0) {
      const lastUser = users[users.length - 1];
      const lastUserId = lastUser.id;
      fetchUsers(lastUserId);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUserById(id);

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error: any) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="font-sans">
      <div className="mx-auto  max-w-4xl flex flex-col gap-4 p-4">
        {users.length > 0 ? (
          <table className="table-auto">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">{user.id}</td>
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">{user.name}</td>
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">{user.email}</td>
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">{new Date(user.created_at).toLocaleString()}</td>
                  <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    <button onClick={() => handleDelete(user.id)} className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        <div className="flex justify-center">
          {loading ? <div>Loading...</div> : null}
          {loading ? null : (
            <button onClick={loadMore} className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50">
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
