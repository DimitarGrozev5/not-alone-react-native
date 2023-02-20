import React, { useEffect } from 'react';
import ProfileConnectionRequests from '../../components/for-pages/profile/profile-connection-reqs';
import ProfileConnections from '../../components/for-pages/profile/profile-connections';
import ProfileOverview from '../../components/for-pages/profile/profile-overview';
import UiButton from '../../components/inputs/ui-button';
import AppLayout from '../../components/layout/app-layput';
import Card from '../../components/layout/card';
import { useStore } from '../../store/useStore';

const Profile: React.FC = () => {
  const getUserData = useStore('userData').getUserData;
  const logout = useStore('userData').logout;

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <AppLayout>
      <ProfileOverview />
      <ProfileConnectionRequests />
      <Card>
        <UiButton onPress={logout}>Logout</UiButton>
      </Card>
    </AppLayout>
  );
};

export default Profile;
