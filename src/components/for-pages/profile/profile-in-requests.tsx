import { observer } from 'mobx-react-lite';
import { ScrollView } from 'react-native';
import { useStore } from '../../../store/useStore';
import H2 from '../../typography/h2';
import H3 from '../../typography/h3';
import ContactCard from './contact-card';

const IncomingRequests = observer(() => {
  const { inConReq, acceptConnection } = useStore('userData');

  const addConnection = (id: string) => () => {
    acceptConnection(id);
  };

  return (
    <>
      <H2 center>People who want to connect with you</H2>
      <ScrollView style={{ flex: 1 }}>
        {inConReq.map((c) => (
          <ContactCard
            key={c.id}
            {...c}
            addMode={true}
            addHandler={addConnection(c.id)}
          />
        ))}
      </ScrollView>
      {inConReq.length === 0 && <H3 center>You have no new requests</H3>}
    </>
  );
});

export default IncomingRequests;
