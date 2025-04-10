import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { addParamsToUrl } from '@/lib/urlUtils';

type PreservingLinkProps = Omit<LinkProps, 'to'> & {
  to: string;
  external?: boolean;
  preserveParams?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Custom Link component that preserves URL parameters
 * 
 * Usage:
 * <PreservingLink to="/some-path">Link Text</PreservingLink>
 * 
 * For external links:
 * <PreservingLink to="https://external.com" external>External Link</PreservingLink>
 * 
 * To disable parameter preservation:
 * <PreservingLink to="/path" preserveParams={false}>No Params</PreservingLink>
 */
export default function PreservingLink({
  to,
  external = false,
  preserveParams = true,
  className,
  children,
  ...props
}: PreservingLinkProps) {
  // For external links, use regular anchor tags
  if (external || to.startsWith('http') || to.startsWith('//') || to.startsWith('mailto:')) {
    return (
      <a href={to} className={className} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  
  // For internal links, use react-router Link with preserved params
  const finalTo = preserveParams ? addParamsToUrl(to) : to;
  
  return (
    <RouterLink to={finalTo} className={className} {...props}>
      {children}
    </RouterLink>
  );
}

/**
 * A version that works with <a> tags directly for cases where you need to modify existing code
 */
export function preserveParamsInHref(href: string): string {
  if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:')) {
    return href;
  }
  
  return addParamsToUrl(href);
} 