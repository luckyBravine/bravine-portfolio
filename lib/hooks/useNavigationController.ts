'use client';

/**
 * Navigation Controller Hook
 * 
 * Manages smooth scrolling navigation between sections with Intersection Observer
 * for tracking the active section.
 */

import { useEffect, useState, useCallback, useRef } from 'react';

export interface Section {
  id: string;
  label: string;
  ref: React.RefObject<HTMLElement>;
}

export interface NavigationControllerProps {
  sections: Section[];
  offset?: number; // scroll offset for fixed header
  onSectionChange?: (sectionId: string) => void;
}

export interface NavigationController {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  isScrolling: boolean;
}

/**
 * Hook for managing navigation between sections
 */
export function useNavigationController({
  sections,
  offset = 80,
  onSectionChange,
}: NavigationControllerProps): NavigationController {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Scroll to section with smooth animation
  const scrollToSection = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    
    if (!section || !section.ref.current) {
      console.warn(`Section not found: ${sectionId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsScrolling(true);

    const elementPosition = section.ref.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    // Update URL hash
    window.history.pushState(null, '', `#${sectionId}`);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set scrolling to false after animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, [sections, offset]);

  // Track active section with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: `-${offset}px 0px -50% 0px`,
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return; // Don't update during programmatic scrolling

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          onSectionChange?.(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sections, offset, isScrolling, onSectionChange]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        scrollToSection(hash);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Scroll to hash on initial load
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      setTimeout(() => scrollToSection(initialHash), 100);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [scrollToSection]);

  return {
    activeSection,
    scrollToSection,
    isScrolling,
  };
}
