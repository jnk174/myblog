export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">About Me</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground">
          Hello! I am a passionate developer writing about modern web technologies and more.
        </p>

        <h3>My Skills</h3>
        <ul>
          <li><strong>Frontend:</strong> React, Next.js, Tailwind CSS</li>
          <li><strong>Backend:</strong> Node.js, Python</li>
          <li><strong>Database:</strong> PostgreSQL, MongoDB</li>
        </ul>

        <h3>Contact</h3>
        <p>
          Feel free to reach out via my <a href="https://github.com/jnk17" target="_blank" rel="noreferrer">GitHub</a>.
        </p>
      </div>
    </div>
  );
}
