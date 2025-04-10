import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { preserveParamsInHref } from '@/components/ui/PreservingLink';
import { getUrlParams } from '@/lib/urlUtils';

/**
 * Component that intercepts click events on all anchor tags
 * and preserves URL parameters for internal links
 */
export function AnchorInterceptor({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Function to handle clicks on anchor tags
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        
        if (!href) return;
        
        // For internal links, prevent default and use the router
        if (
          !href.startsWith('http') && 
          !href.startsWith('//') && 
          !href.startsWith('#') && 
          !href.startsWith('mailto:') && 
          anchor.getAttribute('target') !== '_blank' && 
          !anchor.hasAttribute('download') && 
          !e.ctrlKey && 
          !e.metaKey && 
          !e.shiftKey
        ) {
          e.preventDefault();
          
          // Add current parameters to the destination URL
          const preservedHref = preserveParamsInHref(href);
          navigate(preservedHref);
        } 
        // For external links, modify the href to include URL parameters
        else if (
          (href.startsWith('http') || href.startsWith('//')) && 
          !href.includes('mailto:') && 
          !anchor.hasAttribute('download')
        ) {
          // Get current URL parameters
          const params = getUrlParams();
          if (Object.keys(params).length === 0) return;
          
          e.preventDefault();
          
          // Add parameters to external URL
          const url = new URL(href as string);
          const urlParams = new URLSearchParams(url.search);
          
          // Add current parameters if they don't already exist in the URL
          Object.entries(params).forEach(([key, value]) => {
            if (!urlParams.has(key)) {
              urlParams.append(key, value);
            }
          });
          
          // Update URL search params
          url.search = urlParams.toString();
          
          // Handle target="_blank" case
          if (anchor.getAttribute('target') === '_blank') {
            window.open(url.toString(), '_blank');
          } else {
            window.location.href = url.toString();
          }
        }
      }
    };
    
    // Add the event listener
    document.addEventListener('click', clickHandler);
    
    // Clean up
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [navigate, location.search]); // Re-run if the search params change

  return <>{children}</>;
} 