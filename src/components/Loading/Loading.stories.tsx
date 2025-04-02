import React, { useState, useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Spinner, SpinnerProps } from './Spinner';
import { ProgressBar, ProgressBarProps } from './ProgressBar';
import { Skeleton, SkeletonProps } from './Skeleton';

export default {
  title: 'Components/Loading',
} as Meta;

// Spinner Stories
export const SpinnerExample: StoryFn<SpinnerProps> = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <Spinner size={16} />
    <Spinner size={24} />
    <Spinner size={32} color="#4285f4" />
    <Spinner size={48} color="#34a853" thickness={4} />
  </div>
);

// ProgressBar Stories
export const ProgressBarExample: StoryFn<ProgressBarProps> = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ProgressBar value={progress} showValue />
      <ProgressBar value={75} height={8} color="#34a853" />
      <ProgressBar value={50} height={12} color="#fbbc04" showValue />
      <ProgressBar value={25} color="#ea4335" />
    </div>
  );
};

// Skeleton Stories
export const SkeletonExample: StoryFn<SkeletonProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {/* Text Skeletons */}
    <div>
      <h3>Text Skeletons</h3>
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="90%" />
    </div>

    {/* Rectangular Skeletons */}
    <div>
      <h3>Rectangular Skeletons</h3>
      <Skeleton variant="rectangular" height={120} />
      <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
        <Skeleton variant="rectangular" width={100} height={100} />
        <Skeleton variant="rectangular" width={100} height={100} />
        <Skeleton variant="rectangular" width={100} height={100} />
      </div>
    </div>

    {/* Circular Skeletons */}
    <div>
      <h3>Circular Skeletons</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </div>
    </div>

    {/* Wave Animation */}
    <div>
      <h3>Wave Animation</h3>
      <Skeleton variant="rectangular" height={120} animation="wave" />
    </div>
  </div>
);

// Card Loading Example
export const CardLoadingExample: StoryFn = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: '300px',
        padding: '16px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}
    >
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" height={200} />
          <div style={{ marginTop: '16px' }}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="90%" />
          </div>
        </>
      ) : (
        <>
          <img
            src="https://via.placeholder.com/300x200"
            alt="Card"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ marginTop: '16px' }}>
            <h3>Card Title</h3>
            <p>This is a sample card content that was loading.</p>
            <p>It shows how to use skeletons effectively.</p>
          </div>
        </>
      )}
    </div>
  );
};
