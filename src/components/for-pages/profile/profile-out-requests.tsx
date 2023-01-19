import { observer } from 'mobx-react-lite';
import { ScrollView } from 'react-native';
import { useStore } from '../../../store/useStore';
import H2 from '../../typography/h2';
import H3 from '../../typography/h3';
import ContactCard from './contact-card';

const OutgoingRequests = observer(() => {
  const { outConReq } = useStore('userData');

  return (
    <>
      <H2 center>Requests you've sent</H2>
      <ScrollView style={{ flex: 1 }}>
        {outConReq.map((c) => (
          <ContactCard key={c.id} {...c} addMode={false} />
        ))}
      </ScrollView>
      {outConReq.length === 0 && <H3 center>You have no new requests</H3>}
    </>
  );
});

export default OutgoingRequests;
