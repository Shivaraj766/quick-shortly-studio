import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { FloatingWhatsApp } from "../components/site/FloatingWhatsApp";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Quick Shortly — Professional iPhone Shoots & Cinematic Video Editing" },
      {
        name: "description",
        content:
          "Quick Shortly is a premium creative agency for cinematic iPhone shoots, wedding films, Instagram reels, AI videos, and motion graphics with fast delivery.",
      },
      { name: "author", content: "Quick Shortly" },
      { property: "og:title", content: "Quick Shortly — Professional iPhone Shoots & Cinematic Video Editing" },
      {
        property: "og:description",
        content: "Cinematic iPhone shoots & professional video editing for brands and creators.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@QuickShortly" },
      { name: "twitter:title", content: "Quick Shortly — Professional iPhone Shoots & Cinematic Video Editing" },
      { name: "description", content: "Premium creative agency for cinematic iPhone shoots, wedding films, Instagram reels, AI videos, and motion graphics. Shoot on iPhone. Edit Like Cinema." },
      { property: "og:description", content: "Premium creative agency for cinematic iPhone shoots, wedding films, Instagram reels, AI videos, and motion graphics. Shoot on iPhone. Edit Like Cinema." },
      { name: "twitter:description", content: "Premium creative agency for cinematic iPhone shoots, wedding films, Instagram reels, AI videos, and motion graphics. Shoot on iPhone. Edit Like Cinema." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f26fa3e2-8aea-4346-a261-6eefaa15bb6f/id-preview-81a8c43a--cbf5b8f2-2994-46a6-b3e2-14c6e1e8cd11.lovable.app-1782794063859.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f26fa3e2-8aea-4346-a261-6eefaa15bb6f/id-preview-81a8c43a--cbf5b8f2-2994-46a6-b3e2-14c6e1e8cd11.lovable.app-1782794063859.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isApp = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  const isAuth = pathname === "/login" || pathname === "/signup";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex min-h-screen flex-col bg-background">
        {!isApp && !isAuth && <Navbar />}
        <main className="flex-1">
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
        {!isApp && !isAuth && <Footer />}
        {!isApp && <FloatingWhatsApp />}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
