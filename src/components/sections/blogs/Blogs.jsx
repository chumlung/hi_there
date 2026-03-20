import { blogPosts } from "@src/data/blogs";
import SectionWrapper from "@components/common/SectionWrapper";
import HorizontalCardStackWheel from "@components/common/HorizontalCardStackWheel";
import BlogCard from "./BlogCard";

export default function Blogs({ ratio = 0, offset = 0, mode = "desktop" }) {
  const left = (
    <div>
      <div className="inline-flex flex-col mb-4 sm:mb-6">
        <h2 className="type-sectionTitle">
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
    <div className="w-full flex justify-center">
      <HorizontalCardStackWheel
        items={blogPosts}
        heightInPx={400}
        paddingInPx={12}
        widthPercent={100}
        renderItem={(post) => (
          <BlogCard
            title={post.title}
            excerpt={post.excerpt}
            link={post.link}
            imageFileName={post.imageFileName}
          />
        )}
      />
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
      mode={mode}
    />
  );
}
