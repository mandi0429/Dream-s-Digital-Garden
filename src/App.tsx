import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  X,
  Play,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { BlurText } from "@/components/blur-text";
import { HlsVideo } from "@/components/hls-video";
import { Button } from "@/components/ui/button";

const navigation = ["Home", "Services", "Work", "Process", "Pricing"];
const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const partners = [
  "张梦",
  "张峰源",
  "黄甜",
  "金泽舟",
  "潘杜若蘅",
  "胡荣端 Alex",
];

type FeatureMedia =
  | {
      type: "video";
      src: string;
    }
  | {
      type: "image";
      src: string;
    };

const featureRows = [
  {
    title: "从修图工具走向对话式美学服务",
    body: "围绕“智能美学服务”的新定位，对原有能力进行重组，让用户不再从功能入口出发，而是从穿搭、妆造与个人风格需求自然进入完整体验。",
    cta: "Learn more",
    media:
      {
        type: "video",
        src: asset("/videos/feature-convert.mp4"),
      } satisfies FeatureMedia,
  },
  {
    title: "审美服务升级：从单点特效到系统化造型能力",
    body: "围绕用户“变美”需求，将滤镜与单点特效升级为覆盖穿搭、妆造与风格判断的系统化美学服务。通过沉淀设计师经验与审美规则，构建AI可调用的知识体系，并输出成套造型方案，实现从“效果叠加”到“整体风格构建”的转变，让用户不仅变好看，也具备可理解、可复用的审美决策能力。",
    cta: "See how it works",
    media:
      {
        type: "image",
        src: asset("/images/knowledge-base.png"),
      } satisfies FeatureMedia,
  },
  {
    title: "全球化表达：从单一审美到多文化个性档案",
    body: "基于不同文化语境的审美差异，构建本地化个性档案体系，将统一的AI美学能力转化为多元可理解的风格语言：国内以「金木水火土」表达气质，海外以「宝石体系」强化风格标签，帮助用户建立清晰的美学身份认知，并提升内容表达与社交传播适配性，实现从单一审美到多文化表达的升级。",
    cta: "Learn more",
    media:
      {
        type: "image",
        src: asset("/images/profile-archive.png"),
      } satisfies FeatureMedia,
  },
];

const keyDecisions = [
  {
    title: "整体UI视觉升级：从工具感 → 品质感",
    body: "重构视觉体系（布局、icon、层级、质感），弱化工具属性，提升产品的审美表达与品牌一致性。",
  },
  {
    title: "交互框架升级",
    body: "由编辑器内AI修图，升级为对话式系统，承载多场景的美学服务能力。",
  },
  {
    title: "以“我”为主的个性化穿搭、妆造风格构建",
    body: "围绕用户自身特征与偏好，建立穿搭与妆造的个性化推荐与生成逻辑，让用户形成持续可沉淀的风格体系。",
  },
  {
    title: "强化美学身份系统",
    body: "基于人脸特征与风格偏好，构建可感知的美学标签与个人档案体系（如风格类型/审美属性），增强用户对自身风格的认知与认同。",
  },
];

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <div className="liquid-glass mb-4 inline-flex rounded-full px-3.5 py-1 font-body text-xs font-medium text-white">
      {children}
    </div>
  );
}

export default function App() {
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const filmRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isFilmOpen) {
      filmRef.current?.pause();
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFilmOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    void filmRef.current?.play().catch(() => undefined);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isFilmOpen]);

  return (
    <div className="bg-black text-white">
      <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          <a href="#home" className="shrink-0">
            <img
              src={asset("/images/logo-mark.png")}
              alt="Studio"
              className="size-12 rounded-full object-cover"
            />
          </a>
        </div>
      </header>

      <main className="overflow-visible bg-black" id="home">
        <section className="relative min-h-[1000px] overflow-visible bg-black">
          <video
            className="absolute left-1/2 top-[20%] z-0 h-auto w-full max-w-[1400px] -translate-x-1/2 bg-black object-contain opacity-85"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 z-0 bg-black/5" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[300px] bg-gradient-to-b from-transparent to-black" />

          <div className="relative z-20 mx-auto flex min-h-[1000px] max-w-7xl flex-col px-6 pb-8 pt-[150px] md:px-10 lg:px-16">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="liquid-glass mb-8 inline-flex items-center gap-3 rounded-full px-3 py-2">
                <span className="rounded-full bg-white px-3 py-1 font-body text-xs font-medium text-black">
                  New
                </span>
                <span className="font-body text-sm font-light text-white/80">
                  Introducing AI-powered web design.
                </span>
              </div>

              <BlurText
                text="从AI修图到AI造型室 重新定义变美"
                className="max-w-5xl font-heading text-6xl italic leading-[0.8] tracking-[-4px] text-foreground md:text-7xl lg:text-[5.5rem]"
              />

              <motion.p
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className="mt-8 max-w-2xl text-pretty font-body text-sm font-light text-white/60"
              >
                用 AI 修图、AI 换装与 AI 造型体验，打开全新的审美表达。
                不止是变好看，而是重新定义你想成为的样子。
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <button
                  className="inline-flex items-center gap-3 rounded-full px-2 py-2 font-body text-[1.05rem] font-light text-white/85 transition-colors duration-200 hover:text-white"
                  aria-label="Watch the film"
                  onClick={() => setIsFilmOpen(true)}
                >
                  <Play className="size-5 fill-current text-white/95" />
                  Watch the Film
                </button>
              </motion.div>
            </div>

            <div className="mt-auto pb-8 pt-16">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <SectionBadge>团队成员</SectionBadge>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
                  {partners.map((partner) => (
                    <span
                      key={partner}
                      className="font-heading text-2xl italic text-white md:text-3xl"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="process"
          className="relative overflow-hidden px-6 py-32 md:px-16 lg:px-24"
        >
          <HlsVideo
            src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[500px] max-w-5xl flex-col items-center justify-center text-center">
            <SectionBadge>What it is</SectionBadge>
            <h2 className="max-w-4xl text-balance font-heading text-4xl italic leading-[0.9] text-white md:text-5xl lg:text-6xl">
              You dream it. We ship it.
            </h2>
            <p className="mt-6 max-w-2xl text-pretty font-body text-sm font-light text-white/60">
              AI造型室 基于AI修图版本，围绕产品向「智能美学服务」的整体定位升级，对产品框架进行重构，从以功能为中心的编辑工具转向以用户为中心的对话式体验。在功能与体验上，重点强化穿搭、妆造及个人档案等美学场景，构建完整的个性化美学服务链路；在UI表现上提升整体品质与一致性，实现从工具产品向智能美学空间的升级。
            </p>
          </div>
        </section>

        <section className="px-6 py-24 md:px-16 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <SectionBadge>How it works</SectionBadge>
            <h2 className="max-w-3xl text-balance font-heading text-4xl italic leading-[0.9] text-white md:text-5xl lg:text-6xl">
              Key decisions
            </h2>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {keyDecisions.map((decision) => (
                <article
                  key={decision.title}
                  className="liquid-glass flex min-h-[34rem] flex-col rounded-2xl p-8"
                >
                  <Sparkles className="size-4 text-white/50" />
                  <div className="mt-8 min-h-[9rem]">
                    <h3 className="text-balance font-heading text-xl italic leading-[1.08] text-white md:text-[1.9rem]">
                      {decision.title}
                    </h3>
                  </div>
                  <div className="min-h-[11rem]">
                    <p className="text-pretty font-body text-sm font-light leading-9 text-white/60">
                      {decision.body}
                    </p>
                  </div>
                  <div className="mt-auto pt-10">
                    <div className="font-body text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                      Decision
                    </div>
                    <div className="mt-2 font-body text-xs font-light text-white/50">
                      Key strategy direction
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="px-6 py-24 md:px-16 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <SectionBadge>Capabilities</SectionBadge>
            <h2 className="max-w-3xl text-balance font-heading text-4xl italic leading-[0.9] text-white md:text-5xl lg:text-6xl">
              Design strategy
            </h2>

            <div className="mt-16 space-y-20">
              {featureRows.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex flex-col items-center gap-10 lg:gap-16 ${
                    index === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
                >
                  <div className="w-full lg:w-1/2">
                    <h3 className="max-w-xl text-balance font-heading text-3xl italic leading-[0.95] text-white md:text-4xl">
                      {feature.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-pretty font-body text-sm font-light text-white/60">
                      {feature.body}
                    </p>
                    <Button className="mt-8" aria-label={feature.cta}>
                      {feature.cta}
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </div>

                  <div className="liquid-glass w-full overflow-hidden rounded-2xl p-3 lg:w-1/2">
                    {feature.media.type === "video" ? (
                      <video
                        src={feature.media.src}
                        className="aspect-[4/3] w-full rounded-xl object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={feature.media.src}
                        alt={feature.title}
                        className="aspect-[4/3] w-full rounded-xl object-cover"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-24 md:px-16 lg:px-24">
          <HlsVideo
            src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black to-transparent" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-balance font-heading text-5xl italic leading-[0.9] text-white md:text-6xl lg:text-7xl">
                AI造型室 懂美更懂你
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-pretty font-body text-sm font-light text-white/60">
                Book a free strategy call. See what AI-powered design can do.
              </p>
            </div>

            <footer className="mt-32 flex flex-col gap-4 border-t border-white/10 pt-8 font-body text-xs text-white/40 md:flex-row md:items-center md:justify-between">
              <span>© 2026 Studio</span>
              <div className="flex items-center gap-5">
                <a href="#privacy" className="transition-colors duration-200 hover:text-white/70">
                  Privacy
                </a>
                <a href="#terms" className="transition-colors duration-200 hover:text-white/70">
                  Terms
                </a>
                <a href="#contact" className="transition-colors duration-200 hover:text-white/70">
                  Contact
                </a>
              </div>
            </footer>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isFilmOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setIsFilmOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Film preview"
          >
            <motion.div
              className="liquid-glass-strong relative w-full max-w-5xl overflow-hidden rounded-[2rem] p-3"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="liquid-glass absolute right-5 top-5 z-10 flex size-10 items-center justify-center rounded-full text-white/80 transition-colors duration-200 hover:text-white"
                aria-label="Close film preview"
                onClick={() => setIsFilmOpen(false)}
              >
                <X className="size-4" />
              </button>

              <video
                ref={filmRef}
                src={asset("/videos/film-preview.mp4")}
                className="aspect-video w-full rounded-[1.5rem] bg-black object-cover"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
