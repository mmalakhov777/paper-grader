import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Gets the current URL parameters as an object
 */
export function getUrlParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const paramsObject: Record<string, string> = {};
  
  params.forEach((value, key) => {
    paramsObject[key] = value;
  });
  
  return paramsObject;
}

/**
 * Detects the language from the current pathname
 * Returns language code (pt, pt-br, es, es-mx) or null
 */
export function detectLanguageFromPath(pathname: string): string | null {
  // Check for direct language paths like "/pt", "/es"
  if (pathname === '/pt') return 'pt';
  if (pathname === '/pt-br') return 'pt-br';
  if (pathname === '/es') return 'es';
  if (pathname === '/es-mx') return 'es-mx';
  
  // Check for language paths in feature routes like "/feature/pt"
  const pathParts = pathname.split('/');
  const lastPart = pathParts[pathParts.length - 1];
  
  if (['pt', 'pt-br', 'es', 'es-mx'].includes(lastPart)) {
    return lastPart;
  }
  
  return null;
}

/**
 * Adds current URL parameters to a destination URL
 */
export function addParamsToUrl(url: string): string {
  // Don't modify external URLs
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  
  const currentParams = getUrlParams();
  
  // Get language from current pathname if not already in parameters
  if (!currentParams['lang']) {
    const languageCode = detectLanguageFromPath(window.location.pathname);
    if (languageCode) {
      currentParams['lang'] = languageCode;
    }
  }
  
  // If there are no parameters, return the original URL
  if (Object.keys(currentParams).length === 0) {
    return url;
  }
  
  // Parse the URL to handle existing parameters properly
  const [basePath, existingQuery] = url.split('?');
  const targetParams = new URLSearchParams(existingQuery || '');
  
  // Add current parameters to the target URL if they don't already exist
  Object.entries(currentParams).forEach(([key, value]) => {
    if (!targetParams.has(key)) {
      targetParams.append(key, value);
    }
  });
  
  const queryString = targetParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Custom hook to use for navigation with preserved URL parameters
 */
export function usePreserveParamsNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigateWithParams = (to: string, options?: { replace?: boolean }) => {
    // Don't modify external URLs
    if (to.startsWith('http') || to.startsWith('//')) {
      window.location.href = to;
      return;
    }
    
    // Keep current search params if the target URL doesn't have its own
    const [toPath, toSearch] = to.split('?');
    
    // Get language from current pathname if not in search params
    let updatedSearch = location.search;
    const currentParams = new URLSearchParams(location.search);
    
    if (!currentParams.has('lang')) {
      const languageCode = detectLanguageFromPath(location.pathname);
      if (languageCode) {
        currentParams.append('lang', languageCode);
        updatedSearch = `?${currentParams.toString()}`;
      }
    }
    
    if (!toSearch && updatedSearch) {
      navigate(`${toPath}${updatedSearch}`, options);
    } else {
      navigate(to, options);
    }
  };
  
  return navigateWithParams;
} 