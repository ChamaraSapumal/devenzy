// File: components/ui/dialog.tsx

import React, { useState } from 'react';

export const Dialog: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }> = ({
    open,
    onOpenChange,
    children,
}) => {
    const handleClose = () => {
        onOpenChange(false);
    };

    return (
        <div>
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                    onClick={handleClose}
                >
                    <div
                        className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                        <button
                            className="absolute top-4 right-4 p-2"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export const DialogTrigger: React.FC<{ asChild: boolean; children: React.ReactNode }> = ({ asChild, children }) => {
    return <>{children}</>;
};

export const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};
