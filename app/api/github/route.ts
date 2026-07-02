// Aggregates public GitHub stats from the REST API (no auth token needed for
// public data; 60 req/hour per IP). Both fetches are cached for an hour so we
// stay well within the unauthenticated rate limit.

const USER = "arsalanmaniar";
const GH_HEADERS = {
  Accept: "application/vnd.github+json",
  // GitHub requires a User-Agent or it returns 403.
  "User-Agent": "arsalanmaniar-portfolio",
};

type Repo = {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
};

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`, {
        headers: GH_HEADERS,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100`, {
        headers: GH_HEADERS,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return Response.json({ error: "github_unavailable" }, { status: 502 });
    }

    const user = await userRes.json();
    const repos: Repo[] = await reposRes.json();

    let stars = 0;
    let forks = 0;
    const langCount: Record<string, number> = {};

    for (const repo of repos) {
      stars += repo.stargazers_count ?? 0;
      forks += repo.forks_count ?? 0;
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] ?? 0) + 1;
      }
    }

    const totalLanguaged =
      Object.values(langCount).reduce((sum, c) => sum + c, 0) || 1;

    const languages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percent: Math.round((count / totalLanguaged) * 100),
      }));

    return Response.json(
      {
        stars,
        forks,
        repos: user.public_repos ?? repos.length,
        followers: user.followers ?? 0,
        languages,
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return Response.json({ error: "fetch_failed" }, { status: 502 });
  }
}
