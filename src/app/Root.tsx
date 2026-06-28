import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft, Package } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleBack = () => {
    if ((location.state as any)?.fromToday) {
      navigate('/', { state: { openToday: true }, replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5C5446] font-sans overflow-x-hidden selection:bg-[#E3E8C8]">
      {/* Background decoration for that soft AC feel */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[radial-gradient(circle_at_50%_0%,#F3F6E6_0%,transparent_70%)]" />

      {/* Header/Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center pointer-events-none">
        <AnimatePresence mode="popLayout">
          {!isHome ? (
            <motion.div
              key="back"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="pointer-events-auto"
            >
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-[#8D9876] hover:bg-white active:scale-95 transition-all"
              >
                <ArrowLeft size={24} />
              </button>
            </motion.div>
          ) : (
            <div key="empty" className="w-12 h-12" />
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {isHome && (
            <motion.div
              key="archive"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="pointer-events-auto"
            >
              <Link
                to="/archive"
                className="flex flex-col items-center justify-center gap-1 opacity-80 hover:opacity-100 transition-opacity group mr-2 mt-2"
              >
                <div className="relative">
                  <Package size={28} className="text-[#8D9876] group-hover:scale-110 transition-transform drop-shadow-sm" fill="#E3E8C8" strokeWidth={1.5} />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#F4D9D9] rounded-full border border-[#FDFBF7]" />
                </div>
                <span className="text-[10px] font-bold text-[#8D9876] tracking-wide">灵感小盒</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-20 pb-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
