import { observer } from 'mobx-react-lite';
import PlanTrip from '../../components/for-pages/trip-edit-view-create/plan-trip';
import AppLayout from '../../components/layout/app-layput';
import UiText from '../../components/typography/generic-text';
import { BaseStackProps } from '../base-stack.types';

const OneTrip: React.FC<BaseStackProps['OneTrip']> = observer(
  ({
    route: {
      params: { tripId },
    },
  }) => {
    return (
      <AppLayout>
        <PlanTrip tripId={tripId} mode="edit" />
      </AppLayout>
    );
  }
);

export default OneTrip;
