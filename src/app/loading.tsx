export default function Loading() {
  return (
    <div className="fixed inset-0 bg-bg z-[100] flex flex-col items-center justify-center">
      {/* Animated logo mark */}
      <div className="relative flex items-center justify-center mb-10">
        {/* Outer pulse ring */}
        <div 
          className="absolute w-28 h-28 rounded-full border border-accent/10"
          style={{ animation: "pulse-ring 2s ease-out infinite" }}
        />
        
        {/* Middle spinning ring */}
        <div 
          className="absolute w-20 h-20 rounded-full border-t-2 border-r-2 border-accent/60"
          style={{ animation: "spin 1.8s cubic-bezier(0.68, -0.15, 0.265, 1.35) infinite" }}
        />
        
        {/* Inner spinning ring (reverse) */}
        <div 
          className="absolute w-14 h-14 rounded-full border-b-2 border-l-2 border-secondary/60"
          style={{ animation: "spin 2.5s cubic-bezier(0.68, -0.15, 0.265, 1.35) infinite reverse" }}
        />
        
        {/* Center monogram */}
        <div className="relative w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
          <span 
            className="text-lg font-bold gradient-text-hero" 
            style={{ fontFamily: "var(--font-display)" }}
          >
            KJ
          </span>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="flex flex-col items-center gap-4">
        <h2 
          className="text-sm font-semibold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-accent via-warm to-secondary"
          style={{ fontFamily: "var(--font-display)", animation: "text-shimmer 2s ease-in-out infinite alternate" }}
        >
          Loading
        </h2>
        
        {/* Dot loader */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent"
              style={{
                animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes text-shimmer {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
