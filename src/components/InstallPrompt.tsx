import { Download, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type NavigatorWithStandalone = Navigator & { standalone?: boolean };
type WindowWithMSStream = Window & { MSStream?: unknown };

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const nav = navigator as NavigatorWithStandalone;
    const win = window as WindowWithMSStream;

    // Check if already installed / standalone
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      nav.standalone === true;
    setIsStandalone(standalone);
    if (standalone) return;

    // Check if dismissed recently
    const dismissed = localStorage.getItem("install-dismissed");
    if (dismissed && Date.now() - Number(dismissed) < 3 * 24 * 60 * 60 * 1000)
      return;

    // Detect iOS
    const ua = navigator.userAgent;
    const isiOS = /iPad|iPhone|iPod/.test(ua) && !win.MSStream;
    setIsIOS(isiOS);

    if (isiOS) {
      // Show iOS instructions after a delay
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    // Android / Desktop — capture beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 2000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("install-dismissed", String(Date.now()));
  };

  if (isStandalone || !showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto">
      <div className="glass border border-primary/30 rounded-2xl p-4 shadow-2xl shadow-primary/10">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-foreground mb-0.5">
              রমজান হাব ইন্সটল করুন
            </h4>
            {isIOS ? (
              <p className="text-xs text-muted-foreground leading-relaxed">
                Safari-এ{" "}
                <span className="inline-flex items-center">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2316a34a' stroke-width='2'%3E%3Cpath d='M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13'/%3E%3C/svg%3E"
                    alt="share"
                    className="w-4 h-4 mx-0.5"
                  />
                </span>{" "}
                Share বাটনে ট্যাপ করে <strong>"Add to Home Screen"</strong>{" "}
                সিলেক্ট করুন
              </p>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-2.5">
                  অ্যাপটি ফোনে ইন্সটল করুন — অফলাইনেও চলবে!
                </p>
                <button
                  onClick={handleInstall}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold transition-all hover:opacity-90 glow-green"
                >
                  <Download className="w-3.5 h-3.5" />
                  ইন্সটল করুন
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
