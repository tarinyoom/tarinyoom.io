import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Leaf, Heart, Sprout } from "lucide-react";

export function AboutPage() {
  return (
    <div className="flex-1">
      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Story Section */}
            <div className="mb-16 grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="space-y-6">
                <h2 className="text-foreground">My Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Welcome! I'm a writer, nature enthusiast, and lifelong learner exploring the
                    profound connections between mindfulness, creativity, and the natural world.
                  </p>
                  <p>
                    This blog began as a personal journal documenting my walks through local
                    forests and parks. Over time, it evolved into a platform where I share insights
                    about sustainable living, creative practices inspired by nature's patterns, and
                    the quiet wisdom found in observing the world around us.
                  </p>
                  <p>
                    Through these writings, I hope to inspire others to slow down, notice the
                    beauty in everyday moments, and cultivate a deeper relationship with both their
                    inner landscape and the earth we call home.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1648750207955-82987d75adad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBuYXR1cmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIxMzUwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Nature portrait"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Values Section */}
            <div>
              <h2 className="mb-8 text-center text-foreground">What I Believe In</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-4 rounded-lg border border-border bg-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-foreground">Mindful Living</h3>
                  <p className="text-muted-foreground">
                    Being present in each moment and finding peace through conscious awareness of
                    our thoughts, actions, and surroundings.
                  </p>
                </div>
                <div className="space-y-4 rounded-lg border border-border bg-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Sprout className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-foreground">Sustainable Choices</h3>
                  <p className="text-muted-foreground">
                    Making conscious decisions that honor the earth and contribute to a healthier
                    planet for future generations.
                  </p>
                </div>
                <div className="space-y-4 rounded-lg border border-border bg-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-foreground">Creative Expression</h3>
                  <p className="text-muted-foreground">
                    Channeling inspiration from nature into art, writing, and creative pursuits
                    that nurture the soul.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
