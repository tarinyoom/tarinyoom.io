import { BlogPostCard } from "./BlogPostCard";

export function HomePage() {
  const blogPosts = [
    {
      id: 1,
      title: "Finding Stillness in the Natural World",
      excerpt:
        "Exploring how moments in nature can bring clarity and peace to our busy minds. A journey through forest paths and quiet moments.",
      date: "Oct 28, 2024",
      readTime: "5 min read",
      category: "Mindfulness",
      imageUrl:
        "https://images.unsplash.com/photo-1600340053706-32d1278206ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBzdW5saWdodHxlbnwxfHx8fDE3NjIxMzMwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      title: "The Creative Process: Lessons from Nature",
      excerpt:
        "What the cycles of seasons teach us about patience, growth, and letting go in our creative endeavors.",
      date: "Oct 15, 2024",
      readTime: "7 min read",
      category: "Creativity",
      imageUrl:
        "https://images.unsplash.com/photo-1646352569848-534ffdbc0e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjB3cml0aW5nJTIwZGVza3xlbnwxfHx8fDE3NjIxMzMwODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      title: "Creating a Mindful Workspace",
      excerpt:
        "How incorporating natural elements into your environment can enhance focus and creativity in your daily work.",
      date: "Oct 1, 2024",
      readTime: "4 min read",
      category: "Lifestyle",
      imageUrl:
        "https://images.unsplash.com/photo-1557777948-261e80e1abc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlJTIwcGxhbnRzfGVufDF8fHx8MTc2MjEzMzA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      title: "Walking Meditation: A Beginner's Guide",
      excerpt:
        "Combining movement with mindfulness in nature. Simple practices for finding presence on your daily walks.",
      date: "Sep 18, 2024",
      readTime: "6 min read",
      category: "Mindfulness",
      imageUrl:
        "https://images.unsplash.com/photo-1600340053706-32d1278206ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBzdW5saWdodHxlbnwxfHx8fDE3NjIxMzMwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 5,
      title: "Sustainable Living: Small Changes, Big Impact",
      excerpt:
        "Practical steps toward a more eco-conscious lifestyle that honors our connection to the earth.",
      date: "Sep 5, 2024",
      readTime: "8 min read",
      category: "Sustainability",
      imageUrl:
        "https://images.unsplash.com/photo-1646352569848-534ffdbc0e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjB3cml0aW5nJTIwZGVza3xlbnwxfHx8fDE3NjIxMzMwODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 6,
      title: "The Art of Observation",
      excerpt:
        "Developing a deeper awareness of the natural world around us through intentional seeing and noting.",
      date: "Aug 22, 2024",
      readTime: "5 min read",
      category: "Creativity",
      imageUrl:
        "https://images.unsplash.com/photo-1557777948-261e80e1abc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlJTIwcGxhbnRzfGVufDF8fHx8MTc2MjEzMzA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-foreground">Welcome to Nature's Journal</h1>
            <p className="text-muted-foreground">
              A personal exploration of mindfulness, creativity, and sustainable living inspired by
              the natural world.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h2 className="text-foreground">Articles</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  imageUrl={post.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
