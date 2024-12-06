export function WebsiteLoader() {
  return (
    <div className="loading-container">
      <div className="loader-dot"></div>
      <div className="loader-dot1"></div>
      <div className="loader-dot2"></div>
      <style>
        {`
                @keyframes bounce {
                    100% {
                        transform: translateY(-10px);
                    }
                }
                `}
      </style>
    </div>
  );
}
