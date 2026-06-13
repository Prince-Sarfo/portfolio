// Preloads the Rive WebGL2 asset for the Persona so the browser fetches it
// during HTML parsing — well before React hydrates or the component mounts.
export default function AILayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {}
      <link
        rel="preload"
        href="https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/obsidian-2.0.riv"
        as="fetch"
        crossOrigin="anonymous"
      />
      {children}
    </>
  );
}
