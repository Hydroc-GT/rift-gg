import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      {/* Profile Header Skeleton */}
      <div className="skeleton-card profile-skeleton">
        <div className="skeleton-avatar pulse"></div>
        <div className="skeleton-info">
          <div className="skeleton-line title pulse"></div>
          <div className="skeleton-line subtitle pulse"></div>
          <div className="skeleton-btn-row">
            <div className="skeleton-btn pulse"></div>
            <div className="skeleton-btn pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="profile-main-layout">
        <div className="profile-left-col">
          <div className="skeleton-card ranked-skeleton pulse"></div>
          <div className="skeleton-card ranked-skeleton pulse"></div>
        </div>

        <div className="profile-right-col">
          <div className="skeleton-card match-skeleton pulse"></div>
          <div className="skeleton-card match-skeleton pulse"></div>
          <div className="skeleton-card match-skeleton pulse"></div>
        </div>
      </div>
    </div>
  );
};
