// Proxies the GitHub top-languages SVG through our own origin with a 1-hour
// cache to avoid upstream rate-limiting on the client. See github-stats route.
export const dynamic = "force-dynamic";

const UPSTREAM =
  "https://github-readme-stats.vercel.app/api/top-langs/?username=arsalanmaniar&layout=compact&theme=transparent&hide_border=true&title_color=06b6d4&text_color=ffffff&bg_color=00000000";

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return new Response("Upstream GitHub languages unavailable", {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const svg = await res.text();
    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Failed to fetch GitHub languages", {
      status: 502,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
