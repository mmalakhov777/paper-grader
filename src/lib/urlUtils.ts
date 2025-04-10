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
 * Adds current URL parameters to a destination URL
 */
export function addParamsToUrl(url: string): string {
  // Don't modify external URLs
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  
  const currentParams = getUrlParams();
  
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
    
    if (!toSearch && location.search) {
      navigate(`${toPath}${location.search}`, options);
    } else {
      navigate(to, options);
    }
  };
  
  return navigateWithParams;
} 