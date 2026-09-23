"use client";

import ThemeToggleBtn from "@/components/share/themeToggle";
import { motion } from "framer-motion";
import {
  Folder,
  Zap,
  Search,
  HardDrive,
  ArrowRight,
  Sparkles,
  Command,
  FileText,
} from "lucide-react";

export function HeroSectionOne() {
  const headlineWords = "Organize your files, organize your mind".split(" ");

  return (
    <div className="relative mx-auto mb-20 flex w-full w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl border border-neutral-200/80 bg-slate-50/50 px-4 pt-4 dark:border-neutral-800/80 dark:bg-slate-950/50 backdrop-blur-xl">
      {/* Laser Gradient Borders */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-48 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute bottom-0 h-48 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto left-1/2 -translate-x-1/2 h-px w-72 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Subtle Glow Backdrop */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-gradient-to-tr from-blue-600/15 via-cyan-500/15 to-transparent blur-3xl dark:from-blue-500/20 dark:via-sky-400/10" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 px-4 py-5 md:py-5 text-center max-w-5xl mx-auto">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
          <span>Next-Gen Workspace Manager</span>
        </motion.div>

        {/* Animated Staggered Title */}
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-7xl dark:text-slate-100">
          {headlineWords.map((word, index) => {
            const isHighlighted =
              word.toLowerCase() === "mind" || word.toLowerCase() === "files,";
            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(6px)", y: 15 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                  ease: "easeInOut",
                }}
                className={`mr-2.5 inline-block ${
                  isHighlighted
                    ? "bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-400 dark:via-sky-300 dark:to-cyan-300 bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="relative z-10 mx-auto max-w-2xl py-6 text-center text-base md:text-lg font-normal text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          Doc Exp is a modern workspace manager where you can easily organize
          folders and files. Search, edit, and save your work with a single
          click.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="relative z-10 mt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="group relative inline-flex h-12 w-full sm:w-52 items-center justify-center rounded-xl bg-blue-600 px-6 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600">
            <span>Get Started</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button className="inline-flex h-12 w-full sm:w-52 items-center justify-center rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 font-medium text-slate-800 dark:text-slate-200 shadow-sm transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-700 active:scale-95">
            <Command className="mr-2 h-4 w-4 text-slate-500" />
            <span>View Demo</span>
          </button>
        </motion.div>

        {/* Interactive Workspace Preview Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-14 relative mx-auto max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-4 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 px-3 py-1 rounded-md text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
              <Search className="h-3.5 w-3.5" />
              <span>Search / Command...</span>
              <kbd className="ml-2 rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/50 p-3 hover:border-blue-500/50 transition-colors">
              <Folder className="h-6 w-6 text-blue-500 fill-blue-500/20" />
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Documents
                </p>
                <p className="text-[11px] text-slate-500">18 items</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/50 p-3 hover:border-blue-500/50 transition-colors">
              <Folder className="h-6 w-6 text-cyan-500 fill-cyan-500/20" />
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Projects
                </p>
                <p className="text-[11px] text-slate-500">6 items</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/50 p-3 hover:border-blue-500/50 transition-colors">
              <FileText className="h-6 w-6 text-emerald-500 fill-emerald-500/20" />
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Notes.md
                </p>
                <p className="text-[11px] text-slate-500">Auto-saved</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          className="relative z-10 mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: <Zap className="h-6 w-6 text-blue-500" />,
              title: "Lightning Fast",
              desc: "Create folders and files in milliseconds with effortless UI responsive speed.",
            },
            {
              icon: <Search className="h-6 w-6 text-cyan-500" />,
              title: "Powerful Search",
              desc: "Instant fuzzy search across your entire workspace workspace documents.",
            },
            {
              icon: <HardDrive className="h-6 w-6 text-emerald-500" />,
              title: "Auto Save",
              desc: "Never lose edits. Your data persists locally with single-click syncing.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 p-6 text-left shadow-sm backdrop-blur-sm transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/80 p-3 border border-slate-200/50 dark:border-slate-700/50 group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-semibold text-base text-slate-800 dark:text-slate-200">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-md shadow-blue-500/20">
          <Folder className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Doc Exp
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggleBtn />

        <button className="h-9 rounded-lg bg-blue-600 dark:bg-blue-500 px-4 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 dark:hover:bg-blue-600 transition-all active:scale-95">
          Get Started
        </button>
      </div>
    </nav>
  );
};
