import React from "react";

type TooltipProps = {
    content: string;
    children: React.ReactNode;
};

export const Tooltip = ({ content, children }: TooltipProps) => {
    return (
        <div className="relative group">
            {children}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                {content}
            </div>
        </div>
    );
};
