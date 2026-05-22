import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const postsRoot = path.join(process.cwd(), 'public', 'post');
const outputPath = path.join(process.cwd(), 'public', 'posts.json');

async function findMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return findMarkdownFiles(fullPath);
      }

      return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : [];
    }),
  );

  return files.flat();
}

function stripMarkdown(text) {
  return text
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[`*_~>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getTitle(markdown, filePath) {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading ? stripMarkdown(heading[1]) : path.basename(filePath, '.md');
}

function getDescription(markdown) {
  const body = markdown.replace(/^#\s+.+(?:\r?\n)?/m, '');
  const paragraphs = body
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const firstBodyParagraph = paragraphs.find((paragraph) => !paragraph.startsWith('#'));
  const description = stripMarkdown(firstBodyParagraph ?? '');

  return description.length > 80 ? `${description.slice(0, 80)}...` : description;
}

function formatChineseDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function toPostPath(filePath) {
  return path
    .relative(postsRoot, filePath)
    .replace(/\.md$/, '')
    .split(path.sep)
    .join('/');
}

const files = await findMarkdownFiles(postsRoot);

const posts = await Promise.all(
  files.map(async (filePath) => {
    const [markdown, fileStats] = await Promise.all([readFile(filePath, 'utf8'), stat(filePath)]);
    const createdAt = fileStats.birthtime;

    return {
      title: getTitle(markdown, filePath),
      path: toPostPath(filePath),
      date: formatChineseDate(createdAt),
      description: getDescription(markdown),
      createdAt: createdAt.getTime(),
    };
  }),
);

posts.sort((a, b) => b.createdAt - a.createdAt);

const publicPosts = posts.map(({ createdAt, ...post }) => post);

await writeFile(outputPath, `${JSON.stringify(publicPosts, null, 2)}\n`, 'utf8');
console.log(`Generated ${publicPosts.length} posts in public/posts.json`);
