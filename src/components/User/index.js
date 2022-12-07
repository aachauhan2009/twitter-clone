import React from "react";
import UserProfile from './Profile';
import UserProfileLoader from './Profile/loader';

export default function User() {
  return (
    <div className="User">
      <React.Suspense fallback={<UserProfileLoader />}>
        <UserProfile />
      </React.Suspense>
    </div>
  );
}
