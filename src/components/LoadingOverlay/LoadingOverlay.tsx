import "./LoadingOverlay.css";

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingOverlay = ({ isLoading, children }: LoadingOverlayProps) => {
  return (
    <div className="overlay-container">
      {children}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default LoadingOverlay;
