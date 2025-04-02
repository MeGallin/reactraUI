import React from 'react';
import styled from '@emotion/styled';

export type AvatarSize = 'small' | 'medium' | 'large';
export type AvatarVariant = 'circular' | 'rounded' | 'square';

export interface AvatarProps {
  /**
   * The size of the avatar
   */
  size?: AvatarSize;
  /**
   * The shape of the avatar
   */
  variant?: AvatarVariant;
  /**
   * The image source URL
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Fallback text to display when image fails or isn't provided (usually initials)
   */
  fallback?: string;
  /**
   * Background color for the avatar when displaying fallback text
   */
  backgroundColor?: string;
  /**
   * Additional CSS class name
   */
  className?: string;
}

const sizes = {
  small: {
    width: '32px',
    fontSize: '14px',
  },
  medium: {
    width: '40px',
    fontSize: '16px',
  },
  large: {
    width: '48px',
    fontSize: '20px',
  },
};

const borderRadius = {
  circular: '50%',
  rounded: '8px',
  square: '0',
};

const AvatarContainer = styled.div<{
  size: AvatarSize;
  variant: AvatarVariant;
  backgroundColor: string;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => sizes[size].width};
  height: ${({ size }) => sizes[size].width};
  font-size: ${({ size }) => sizes[size].fontSize};
  line-height: 1;
  border-radius: ${({ variant }) => borderRadius[variant]};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  user-select: none;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Function to generate a consistent color based on text
const stringToColor = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    '#4285f4', // blue
    '#34a853', // green
    '#fbbc04', // yellow
    '#ea4335', // red
    '#5f6368', // grey
    '#1a73e8', // light blue
    '#188038', // dark green
    '#f29900', // orange
    '#c5221f', // dark red
    '#9aa0a6', // light grey
  ];
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Function to get initials from text
const getInitials = (text: string): string => {
  if (!text) return '';
  return text
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2);
};

export const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  variant = 'circular',
  src,
  alt = '',
  fallback = '',
  backgroundColor,
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);
  const initials = getInitials(fallback || alt);
  const bgColor =
    backgroundColor || stringToColor(fallback || alt || 'default');

  return (
    <AvatarContainer
      size={size}
      variant={variant}
      backgroundColor={bgColor}
      className={className}
      role="img"
      aria-label={alt || fallback}
    >
      {src && !imgError ? (
        <Image src={src} alt={alt} onError={() => setImgError(true)} />
      ) : (
        initials
      )}
    </AvatarContainer>
  );
};

export default Avatar;
