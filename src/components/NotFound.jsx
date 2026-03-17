import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 sm:px-6">
      <h1 className="font-display text-5xl sm:text-6xl md:text-8xl text-slate-900 mb-3 sm:mb-4">
        Oops!
      </h1>
      <p className="text-slate-600 text-base sm:text-lg mb-6 sm:mb-8 text-center">
        You probably got lost. Here, let's go back.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
      >
        Take me home
      </Link>
    </div>
  );
}
