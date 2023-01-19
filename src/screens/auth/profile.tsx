import React, { useEffect } from 'react';
import ProfileConnectionRequests from '../../components/for-pages/profile/profile-connection-reqs';
import ProfileOverview from '../../components/for-pages/profile/profile-overview';
import UiButton from '../../components/inputs/ui-button';
import AppLayout from '../../components/layout/app-layput';
import Card from '../../components/layout/card';
import { useStore } from '../../store/useStore';

const Profile: React.FC = () => {
  const getUserStore = useStore('userData').getUserData;
  const logout = useStore('userData').logout;

  useEffect(() => {
    getUserStore();
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
