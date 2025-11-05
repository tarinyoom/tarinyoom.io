import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that transforms img elements with src pointing to videos/*
 * into video elements
 */
export default function rehypeVideoTransform() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;

        // Check if the src points to a video file
        if (src.startsWith('videos/') || src.includes('/videos/')) {
          // Transform img to video element
          node.tagName = 'video';
          node.properties.controls = true;
          node.properties.loop = true;
          node.properties.muted = true;
          node.properties.playsInline = true;
          node.properties.autoplay = true;

          // Keep the alt text as a title attribute for accessibility
          if (node.properties.alt) {
            node.properties.title = node.properties.alt;
            delete node.properties.alt;
          }

          // Add source child element
          node.children = [
            {
              type: 'element',
              tagName: 'source',
              properties: {
                src: node.properties.src,
                type: `video/${src.split('.').pop()}`, // e.g., video/webm, video/mp4
              },
              children: [],
            },
          ];

          // Remove src from video element (it should be on source element)
          delete node.properties.src;
        }
      }
    });
  };
}
