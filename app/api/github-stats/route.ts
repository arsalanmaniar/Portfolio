// Proxies the GitHub readme-stats SVG through our own origin with a 1-hour
// cache, so visitors' browsers no longer hit (and get rate-limited by) the
// upstream service directly. Runs per request; the upstream fetch is cached.
export const dynamic = "force-dynamic";

const UPSTREAM =
  "https://github-readme-stats.vercel.app/api?username=arsalanmaniar&show_icons=true&theme=transparent&hide_border=true&title_color=06b6d4&icon_color=06b6d4&text_color=ffffff&bg_color=00000000";

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return new Response("Upstream GitHub stats unavailable", {
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
    return new Response("Failed to fetch GitHub stats", {
      status: 502,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
