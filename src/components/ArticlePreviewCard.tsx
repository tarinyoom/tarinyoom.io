import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ArticlePreviewCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
}

export function ArticlePreviewCard({
  title,
  excerpt,
  date,
  readTime,
  category,
  imageUrl,
  slug,
}: ArticlePreviewCardProps) {
  return (
    <Link to={`/articles/${slug}`} className="block">
      <Card className="flex h-full w-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-[16/9] overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
            {category}
          </Badge>
        </div>
        <h2 className="mb-3 text-foreground line-clamp-2">{title}</h2>
        <p className="mb-4 text-muted-foreground line-clamp-5">{excerpt}</p>
        <div className="mt-auto flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
