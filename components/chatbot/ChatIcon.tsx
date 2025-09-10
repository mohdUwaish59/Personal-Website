import React from 'react';

interface ChatIconProps {
    className?: string;
    size?: number;
}

export const ChatIcon: React.FC<ChatIconProps> = ({
    className = "h-6 w-6",
    size = 24
}) => {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
        </svg>
    );
};

// Alternative chat icon designs
export const ChatBubbleIcon: React.FC<ChatIconProps> = ({
    className = "h-6 w-6",
    size = 24
}) => {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
        </svg>
    );
};

// Modern chat icon with filled style
export const ModernChatIcon: React.FC<ChatIconProps> = ({
    className = "h-6 w-6",
    size = 24
}) => {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Chat icon"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 20.2a1 1 0 001.254 1.254l3.032-.892A9.958 9.958 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zM8 11a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z"
            />
        </svg>
    );
};

// Fallback icon component with emoji if SVG fails
export const FallbackChatIcon: React.FC<ChatIconProps> = ({
    className = "h-6 w-6",
    size = 24
}) => {
    return (
        <div
            className={`${className} flex items-center justify-center text-current`}
            style={{ fontSize: size * 0.6 }}
            role="img"
            aria-label="Chat icon"
        >
            💬
        </div>
    );
};

// Robust chat icon with fallback
export const RobustChatIcon: React.FC<ChatIconProps> = ({
    className = "h-6 w-6",
    size = 24
}) => {
    const [svgError, setSvgError] = React.useState(false);

    if (svgError) {
        return <FallbackChatIcon className={className} size={size} />;
    }

    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Chat icon"
            onError={() => setSvgError(true)}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 20.2a1 1 0 001.254 1.254l3.032-.892A9.958 9.958 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zM8 11a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z"
            />
        </svg>
    );
};

// Logo-based chat icon component
export const LogoChatIcon: React.FC<ChatIconProps & { logoSrc?: string; alt?: string }> = ({
    className = "h-6 w-6",
    size = 24,
    logoSrc = "/logo.png", // Default path - you can change this
    alt = "Chat with us"
}) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    // If image fails to load, show fallback
    if (imageError) {
        return <ModernChatIcon className={className} size={size} />;
    }

    return (
        <div 
            className={`${className} relative flex items-center justify-center`}
            style={{ width: size, height: size }}
        >
            {/* Show loading state while image loads */}
            {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse bg-white/20 rounded-full w-full h-full" />
                </div>
            )}
            
            <img
                src={logoSrc}
                alt={alt}
                width={size}
                height={size}
                className={`
                    object-contain rounded-full transition-opacity duration-200
                    ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                style={{
                    maxWidth: size,
                    maxHeight: size,
                }}
            />
        </div>
    );
};

// Enhanced logo icon with better styling options
export const StyledLogoChatIcon: React.FC<ChatIconProps & { 
    logoSrc?: string; 
    alt?: string;
    showBorder?: boolean;
    borderColor?: string;
}> = ({
    className = "h-6 w-6",
    size = 24,
    logoSrc = "/logo.png",
    alt = "Chat with us",
    showBorder = true,
    borderColor = "rgba(255, 255, 255, 0.2)"
}) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    if (imageError) {
        return <ModernChatIcon className={className} size={size} />;
    }

    return (
        <div 
            className={`${className} relative flex items-center justify-center overflow-hidden rounded-full`}
            style={{ 
                width: size, 
                height: size,
                border: showBorder ? `2px solid ${borderColor}` : 'none'
            }}
        >
            {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse bg-white/20 rounded-full w-full h-full" />
                </div>
            )}
            
            <img
                src={logoSrc}
                alt={alt}
                width={size - (showBorder ? 4 : 0)}
                height={size - (showBorder ? 4 : 0)}
                className={`
                    object-cover rounded-full transition-all duration-200
                    ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
            />
        </div>
    );
};

export default ChatIcon;