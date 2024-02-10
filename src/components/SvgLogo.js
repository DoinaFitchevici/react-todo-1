import "./SvgLogo.css";

const SvgLogo = () => {
  return (
    <div className="svg-container">
      <svg
        width="200px"
        height="200px"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="40%" y1="40%" x2="100%" y2="60%">
            <stop
              offset="0%"
              style={{ stopColor: "#8070F0", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#ff9Fff", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <polyline
          points="30,100 70,160 170,40"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default SvgLogo;
