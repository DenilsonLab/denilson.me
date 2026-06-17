import { useEffect, useId, useState, useTransition, useDeferredValue } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Construction,
  Link2,
  Search,
  Share2,
  Sparkles,
  Tag,
} from "lucide-react";
import { LayoutWithSidebar } from "./LayoutWithSidebar";
import { resources } from "@/data/resources";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";
import { useSettings } from "@/hooks/useSettings";
import { translations } from "@/utils/translations";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

type ResourceId = (typeof resources)[number]["id"];

export default function ResourcesPage() {
  const { settings } = useSettings();
  const { language, toggleLanguage } = useLanguagePreference();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedResourceId, setSelectedResourceId] = useState<ResourceId | null>(null);
  const [copiedResourceId, setCopiedResourceId] = useState<ResourceId | null>(null);
  const [isPending, startTransition] = useTransition();
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const shouldReduceMotion = useReducedMotion();
  const resourcesHeadingId = useId();
  const t = translations[language];
  const resourcesT = t.resources;

  useEffect(() => {
    const sharedResourceId = searchParams.get("resource") as ResourceId | null;
    const matchingResource = resources.find((resource) => resource.id === sharedResourceId);

    setSelectedResourceId(matchingResource?.id ?? null);
  }, [searchParams]);

  useEffect(() => {
    if (!copiedResourceId) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedResourceId(null);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [copiedResourceId]);

  const categories = [
    { id: "all", label: resourcesT.filters.allCategories },
    ...Object.entries(resourcesT.categories).map(([id, label]) => ({ id, label })),
  ];

  const tags = [
    { id: "all", label: resourcesT.filters.allTags },
    ...Object.entries(resourcesT.tags).map(([id, label]) => ({ id, label })),
  ];

  const filteredResources = resources.filter((resource) => {
    const normalizedQuery = deferredSearchQuery.trim().toLowerCase();
    const matchesSearch =
      normalizedQuery.length === 0 ||
      resource.title[language].toLowerCase().includes(normalizedQuery) ||
      resource.summary[language].toLowerCase().includes(normalizedQuery) ||
      resource.details[language].toLowerCase().includes(normalizedQuery) ||
      resource.tags.some((tag) => resourcesT.tags[tag].toLowerCase().includes(normalizedQuery));

    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    const matchesTag = selectedTag === "all" || resource.tags.includes(selectedTag as never);

    return matchesSearch && matchesCategory && matchesTag;
  });

  const selectedResource = resources.find((resource) => resource.id === selectedResourceId) ?? null;

  const openResource = (resourceId: ResourceId) => {
    setSearchParams({ resource: resourceId });
  };

  const closeResource = () => {
    setSearchParams({});
  };

  const getShareUrl = (resourceId: ResourceId) => {
    if (typeof window === "undefined") {
      return `/resources?resource=${resourceId}`;
    }

    return `${window.location.origin}/resources?resource=${resourceId}`;
  };

  const shareResource = async (resourceId: ResourceId) => {
    const resource = resources.find((item) => item.id === resourceId);

    if (!resource) {
      return;
    }

    const shareUrl = getShareUrl(resourceId);

    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title[language],
          text: resource.summary[language],
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard below when share is canceled or unavailable.
      }
    }

    await navigator.clipboard.writeText(shareUrl);
    setCopiedResourceId(resourceId);
  };

  const seoTitle = selectedResource
    ? `${selectedResource.title[language]} | ${resourcesT.seoTitle}`
    : resourcesT.seoTitle;
  const seoDescription = selectedResource
    ? selectedResource.summary[language]
    : resourcesT.seoDescription;
  const seoUrl = selectedResource
    ? getShareUrl(selectedResource.id)
    : "https://denilson.me/resources";

  return (
    <LayoutWithSidebar
      activeSection="resources"
      language={language}
      onLanguageToggle={toggleLanguage}
    >
      <div className="min-h-screen bg-[#0d1117] text-gray-100 relative overflow-hidden">
        <Helmet>
          <title>{`${seoTitle} | ${settings?.site_title || "Denilson Arguello"}`}</title>
          <meta name="description" content={seoDescription} />
          <meta name="keywords" content={resourcesT.seoKeywords} />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={seoUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <html lang={language} />
        </Helmet>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-0 h-72 w-72 rounded-full bg-[#1f6feb]/20 blur-3xl"
          />
          <motion.div
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-[#238636]/15 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 space-y-10">
          <div className="flex items-start gap-3 rounded-2xl border border-[#ffa657]/30 bg-[#ffa657]/10 p-4 text-sm text-[#ffa657]">
            <Construction aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{resourcesT.developmentNotice}</p>
          </div>

          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[28px] border border-[#21262d] bg-[linear-gradient(135deg,rgba(31,111,235,0.16),rgba(13,17,23,0.92)_45%,rgba(35,134,54,0.14))] p-8 md:p-10 shadow-[0_30px_120px_rgba(0,0,0,0.35)]"
          >
            <div className="max-w-3xl space-y-6">
              <Badge className="border border-[#1f6feb]/30 bg-[#1f6feb]/10 text-[#58a6ff] hover:bg-[#1f6feb]/20">
                <Sparkles aria-hidden="true" className="mr-2 h-3.5 w-3.5" />
                {resourcesT.badge}
              </Badge>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl tracking-tight text-balance">
                  {resourcesT.title}
                </h1>
                <p className="max-w-2xl text-lg text-gray-300 leading-relaxed">
                  {resourcesT.subtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#21262d] bg-[#0d1117]/80 px-4 py-2">
                  <BadgeCheck aria-hidden="true" className="h-4 w-4 text-[#3fb950]" />
                  {resourcesT.features.curated}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#21262d] bg-[#0d1117]/80 px-4 py-2">
                  <Search aria-hidden="true" className="h-4 w-4 text-[#58a6ff]" />
                  {resourcesT.features.searchable}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#21262d] bg-[#0d1117]/80 px-4 py-2">
                  <Share2 aria-hidden="true" className="h-4 w-4 text-[#ffa657]" />
                  {resourcesT.features.shareable}
                </span>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-[24px] border border-[#21262d] bg-[#161b22]/80 p-5 md:p-6 backdrop-blur"
            aria-labelledby={resourcesHeadingId}
          >
            <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <h2 id={resourcesHeadingId} className="text-2xl text-gray-100">
                  {resourcesT.exploreTitle}
                </h2>
                <p className="text-gray-400">{resourcesT.exploreDescription}</p>
              </div>
              <div className="relative w-full lg:max-w-sm">
                <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  type="search"
                  aria-label={resourcesT.searchPlaceholder}
                  value={searchQuery}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    startTransition(() => setSearchQuery(nextValue));
                  }}
                  placeholder={resourcesT.searchPlaceholder}
                  className="h-12 rounded-xl border-[#30363d] bg-[#0d1117] pl-11 text-gray-100 placeholder:text-gray-500 focus-visible:ring-[#58a6ff]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2" role="group" aria-label={resourcesT.filters.allCategories}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    aria-pressed={selectedCategory === category.id}
                    className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
                      selectedCategory === category.id
                        ? "border-[#58a6ff] bg-[#1f6feb]/15 text-[#79c0ff]"
                        : "border-[#30363d] bg-[#0d1117] text-gray-400 hover:border-[#58a6ff]/40 hover:text-gray-200"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2" role="group" aria-label={resourcesT.filters.allTags}>
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => setSelectedTag(tag.id)}
                    aria-pressed={selectedTag === tag.id}
                    className={`min-h-11 rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                      selectedTag === tag.id
                        ? "border-[#3fb950] bg-[#238636]/15 text-[#3fb950]"
                        : "border-[#30363d] bg-transparent text-gray-500 hover:border-[#3fb950]/40 hover:text-gray-300"
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.section>

          {filteredResources.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-[#30363d] bg-[#0d1117]/80 px-6 py-16 text-center">
              <BookOpen aria-hidden="true" className="mx-auto mb-5 h-12 w-12 text-gray-600" />
              <h3 className="text-2xl text-gray-200">{resourcesT.emptyTitle}</h3>
              <p className="mt-2 text-gray-500">{resourcesT.emptyDescription}</p>
            </div>
          ) : (
            <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <Card className="group h-full overflow-hidden border-[#21262d] bg-[#161b22]/90 backdrop-blur transition-colors hover:border-[#58a6ff]/40">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-[#21262d] bg-[#0d1117]">
                      <img
                        src={resource.image}
                        alt={resource.title[language]}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="flex h-full flex-col gap-5 p-5">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="border border-[#1f6feb]/30 bg-[#1f6feb]/10 text-[#58a6ff] hover:bg-[#1f6feb]/20">
                            {resourcesT.categories[resource.category]}
                          </Badge>
                          {copiedResourceId === resource.id && (
                            <span className="text-xs text-[#3fb950]">{resourcesT.copied}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl text-gray-100">{resource.title[language]}</h3>
                          <p className="mt-3 text-sm leading-6 text-gray-400">
                            {resource.summary[language]}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#21262d] bg-[#0d1117]/80 p-4 text-sm text-gray-300">
                        {resource.highlight[language]}
                      </div>

                      <div className="mt-auto space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => setSelectedTag(tag)}
                              aria-pressed={selectedTag === tag}
                              className="inline-flex min-h-11 items-center gap-1 rounded-full border border-[#30363d] px-3 py-1.5 text-xs text-gray-400 transition-colors hover:border-[#58a6ff]/40 hover:text-[#79c0ff]"
                            >
                              <Tag aria-hidden="true" className="h-3 w-3" />
                              {resourcesT.tags[tag]}
                            </button>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Button
                            type="button"
                            onClick={() => openResource(resource.id)}
                            className="min-h-11 bg-[#238636] text-white hover:bg-[#2ea043]"
                          >
                            {resourcesT.view}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => shareResource(resource.id)}
                            className="min-h-11 border-[#30363d] bg-transparent text-gray-200 hover:bg-[#21262d] hover:text-[#58a6ff]"
                          >
                            <Share2 aria-hidden="true" className="mr-2 h-4 w-4" />
                            {resourcesT.share}
                          </Button>
                          <Button asChild variant="outline" className="min-h-11 border-[#30363d] bg-transparent text-gray-200 hover:bg-[#21262d] hover:text-[#58a6ff]">
                            <a href={resource.href} target="_blank" rel="noopener noreferrer">
                              {resourcesT.go}
                              <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </section>
          )}

          <p className="sr-only" aria-live="polite">
            {filteredResources.length} {resourcesT.resultsFound}
          </p>
          {isPending && <p className="text-sm text-gray-500">{resourcesT.searching}</p>}
        </div>

        <Dialog open={Boolean(selectedResource)} onOpenChange={(open) => !open && closeResource()}>
          <DialogContent className="border-[#21262d] bg-[#0d1117] text-gray-100 md:max-w-4xl md:p-0">
            {selectedResource && (
              <div className="overflow-hidden rounded-lg">
                <div className="aspect-[16/7] overflow-hidden border-b border-[#21262d] bg-[#161b22]">
                  <img
                    src={selectedResource.image}
                    alt={selectedResource.title[language]}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-6 p-6 md:p-8">
                  <DialogHeader className="space-y-3 text-left">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="border border-[#1f6feb]/30 bg-[#1f6feb]/10 text-[#58a6ff] hover:bg-[#1f6feb]/20">
                        {resourcesT.categories[selectedResource.category]}
                      </Badge>
                    </div>
                    <DialogTitle className="text-3xl text-gray-100">
                      {selectedResource.title[language]}
                    </DialogTitle>
                    <DialogDescription className="text-base leading-7 text-gray-400">
                      {selectedResource.summary[language]}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="rounded-[20px] border border-[#21262d] bg-[#161b22]/80 p-5 text-gray-300">
                    {selectedResource.details[language]}
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                      {resourcesT.tagsTitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedResource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#30363d] px-3 py-1.5 text-sm text-gray-300"
                        >
                          {resourcesT.tags[tag]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {copiedResourceId === selectedResource.id && (
                      <span className="flex min-h-11 items-center text-sm text-[#3fb950]">
                        {resourcesT.copied}
                      </span>
                    )}
                    <Button onClick={() => shareResource(selectedResource.id)} className="min-h-11 bg-[#1f6feb] text-white hover:bg-[#388bfd]">
                      <Link2 aria-hidden="true" className="mr-2 h-4 w-4" />
                      {resourcesT.shareResource}
                    </Button>
                    <Button asChild className="min-h-11 bg-[#238636] text-white hover:bg-[#2ea043]">
                      <a href={selectedResource.href} target="_blank" rel="noopener noreferrer">
                        {resourcesT.go}
                        <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </LayoutWithSidebar>
  );
}
