"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import {
  Folder,
  FileText,
  Clock,
  HardDrive,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  selectFolderTree,
  selectFolder,
  startEditingFile,
} from "@/state/features/workspace/workspaceSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const folderTree = useAppSelector(selectFolderTree) || [];

  const allItems = useAppSelector((state) => state.workspace.items || []);

  const totalFolders = allItems.filter(
    (item: { type: string }) => item.type === "folder",
  ).length;
  const totalFiles = allItems.filter(
    (item: { type: string }) => item.type === "file",
  ).length;
  const recentItems = [...allItems].reverse().slice(0, 5); // সাম্প্রতিক ৫টি আইটেম

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 md:p-8 text-white shadow-lg">
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to Doc Exp Workspace 👋
          </h1>
          <p className="text-blue-100 text-sm md:text-base max-w-xl">
            Manage your files, documents, and folders efficiently with
            Redux-powered state management.
          </p>
        </div>
        <HardDrive className="absolute -right-6 -bottom-6 h-48 w-48 text-white/10 pointer-events-none" />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Folders Card */}
        <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Total Folders
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {totalFolders}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-blue-600 dark:text-blue-400">
            <Folder className="h-6 w-6" />
          </div>
        </div>

        {/* Total Files Card */}
        <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Total Files
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {totalFiles}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-emerald-600 dark:text-emerald-400">
            <FileText className="h-6 w-6" />
          </div>
        </div>

        {/* Storage Used Card */}
        <div className="flex items-center justify-between p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Storage Usage
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {(totalFiles * 1.2).toFixed(1)} KB
            </h3>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/50 rounded-xl text-purple-600 dark:text-purple-400">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Files & Folders List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Clock className="h-5 w-5 text-slate-500" />
              <span>Recent Items</span>
            </h2>
          </div>

          <div className="border border-slate-200/80 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            {recentItems.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No files or folders created yet. Use the &quot;+ Create&quot;
                button to get started!
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentItems.map(
                  (item: { id: string; type: string; name: string }) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (item.type === "folder") {
                          dispatch(selectFolder(item.id));
                        } else {
                          dispatch(startEditingFile(item.id));
                        }
                      }}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.type === "folder" ? (
                          <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-600 dark:text-blue-400">
                            <Folder className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-600 dark:text-emerald-400">
                            <FileText className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-400 capitalize">
                            {item.type}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips / Workspace Overview */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Quick Overview
          </h2>
          <div className="p-5 border border-slate-200/80 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 space-y-4 shadow-sm">
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                Tip & Tricks
              </span>
              <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Shortcuts available:
              </h4>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
                <li className="flex items-center justify-between">
                  <span>Open Quick Search</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded font-mono text-[10px]">
                    ⌘K
                  </kbd>
                </li>
                <li className="flex items-center justify-between">
                  <span>Create New File</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded font-mono text-[10px]">
                    ⌘1
                  </kbd>
                </li>
                <li className="flex items-center justify-between">
                  <span>Create New Folder</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded font-mono text-[10px]">
                    ⌘2
                  </kbd>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
