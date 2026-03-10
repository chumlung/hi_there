import { blogPosts } from '../data/blogPlaceholders'

export default function Blogs() {
  return (
    <section id="blogs" className="py-16 sm:py-24 px-4 sm:px-6 bg-coffee-50 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-coffee-900 mb-3 sm:mb-4">
          Blog
        </h2>
        <p className="text-coffee-600 text-sm sm:text-base mb-8 sm:mb-12">
          Thoughts on web development, architecture, and tech leadership.
        </p>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-coffee-200 bg-coffee-100 p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-coffee-300 transition-all duration-200"
            >
              <h3 className="font-semibold text-base sm:text-lg text-coffee-900 mb-2">{post.title}</h3>
              {post.date && (
                <p className="text-xs text-coffee-500 mb-2">{post.date}</p>
              )}
              <p className="text-coffee-600 text-xs sm:text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
