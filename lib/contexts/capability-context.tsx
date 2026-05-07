'use client';

/**
 * Capability Context
 * 
 * Provides capability classification results to all components in the application.
 * This allows components to adapt their rendering based on device and network capabilities.
 */

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { CapabilityClassification } from '../types/capability-detection';

/**
 * Context value interface
 */
interface CapabilityContextValue {
  classification: CapabilityClassification | null;
  setClassification: (classification: CapabilityClassification) => void;
  isDetecting: boolean;
}

/**
 * Capability Context
 */
const CapabilityContext = createContext<CapabilityContextValue | undefined>(undefined);

/**
 * Provider props
 */
interface CapabilityProviderProps {
  children: ReactNode;
}

/**
 * Capability Provider Component
 * 
 * Wraps the application to provide capability classification to all components.
 */
export function CapabilityProvider({ children }: CapabilityProviderProps) {
  const [classification, setClassificationState] = useState<CapabilityClassification | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);

  const setClassification = useCallback((newClassification: CapabilityClassification) => {
    setClassificationState(newClassification);
    setIsDetecting(false);
  }, []);

  return (
    <CapabilityContext.Provider
      value={{
        classification,
        setClassification,
        isDetecting,
      }}
    >
      {children}
    </CapabilityContext.Provider>
  );
}

/**
 * Hook to access capability classification
 * 
 * @throws Error if used outside of CapabilityProvider
 */
export function useCapability(): CapabilityContextValue {
  const context = useContext(CapabilityContext);
  
  if (context === undefined) {
    throw new Error('useCapability must be used within a CapabilityProvider');
  }
  
  return context;
}

/**
 * Hook to get the current capability level
 * 
 * Returns the capability level or null if detection is still in progress.
 */
export function useCapabilityLevel(): 'fast' | 'medium' | 'slow' | null {
  const { classification } = useCapability();
  return classification?.level ?? null;
}

/**
 * Hook to check if capability detection is complete
 */
export function useIsCapabilityDetected(): boolean {
  const { classification } = useCapability();
  return classification !== null;
}
