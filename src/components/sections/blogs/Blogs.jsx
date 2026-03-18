import { blogPosts } from "@src/data/blogPlaceholders";
import SectionWrapper from "@components/common/SectionWrapper";

export default function Blogs({ ratio = 0, offset = 0 }) {
  const left = (
    <div>
      <div className="inline-flex flex-col mb-4 sm:mb-6">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-slate-900">
          <span className="text-blue-700">Blog</span>
        </h2>
        <span className="mt-1 h-1 w-16 rounded-full bg-blue-400" />
      </div>
      <div className="text-slate-700 text-sm sm:text-base space-y-4">
      <p>
        I have recently started writing blogs on my learnings and experiences.
      </p>
      <p className="text-blue-700 font-semibold">
        I have realized if someone somewhere finds something useful in my blogs, or if someone shows me a better perspective-it's a win for everyone!
      </p>
      </div>
    </div>
  );

  const right = (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400 hover:bg-blue-100 focus-within:outline-none"
          tabIndex={0}
        >
          <h3 className="font-semibold text-base sm:text-lg text-slate-900 mb-2">
            {post.title}
          </h3>
          {post.date && (
            <p className="text-xs text-slate-500 mb-2">{post.date}</p>
          )}
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <SectionWrapper
      id="blogs"
      left={left}
      right={right}
      ratio={ratio}
      offset={offset}
      sectionClassName="bg-slate-50"
    />
  );
}
