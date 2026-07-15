export function TravelMap() {
  const destinations = [
    { name: "Southern California", x: 15, y: 40 },
    { name: "Europe", x: 48, y: 25 },
    { name: "East Asia", x: 80, y: 35 },
    { name: "Alaska", x: 20, y: 15 },
  ];

  return (
    <div className="relative w-full bg-gradient-to-br from-[#1fa2ff]/5 to-[#60b8ff]/10 border border-[#1fa2ff]/20 rounded-lg p-8 mb-12 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzMSwgMTYyLCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')] opacity-50" />

      <svg
        viewBox="0 0 100 50"
        className="w-full h-auto relative z-10"
        style={{ maxHeight: '400px' }}
      >
        <g className="opacity-20 stroke-[#1fa2ff]" fill="none" strokeWidth="0.2">
          <path d="M 15 25 Q 25 20, 35 22 Q 45 24, 50 25 Q 55 26, 60 25 Q 70 23, 75 25" />
          <path d="M 10 30 L 20 28 L 30 30 L 40 28 L 50 30" />
          <path d="M 45 15 Q 55 12, 65 15 Q 72 17, 78 15" />
          <path d="M 20 35 Q 30 33, 40 35 Q 48 37, 55 35" />
          <path d="M 15 20 L 25 22 L 35 20 L 42 22" />
          <path d="M 60 30 Q 68 28, 75 30 Q 82 32, 88 30" />
          <path d="M 35 40 L 45 38 L 55 40 L 65 38" />
          <path d="M 50 18 Q 58 16, 66 18 Q 72 20, 78 18" />
        </g>

        {destinations.map((dest, index) => (
          <g key={index}>
            <circle
              cx={dest.x}
              cy={dest.y}
              r="1"
              className="fill-[#1fa2ff] animate-pulse"
              style={{ animationDelay: `${index * 0.3}s` }}
            />
            <circle
              cx={dest.x}
              cy={dest.y}
              r="2"
              className="fill-none stroke-[#1fa2ff] opacity-30"
              strokeWidth="0.3"
            />
            <text
              x={dest.x}
              y={dest.y - 3}
              className="fill-foreground text-[2px] font-medium"
              textAnchor="middle"
            >
              {dest.name}
            </text>
          </g>
        ))}

        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1fa2ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#1fa2ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60b8ff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Journey across continents • Flight paths coming soon
        </p>
      </div>
    </div>
  );
}
