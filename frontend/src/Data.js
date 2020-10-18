import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card, Statistic } from 'semantic-ui-react';


import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

function Main (props) {
  const { api } = useSubstrate();
  const { accountPair } = props;
  // The transaction submission status
  const [status, setStatus] = useState('');

  // The currently stored value
  const [currentData, setData] = useState(0);

    useEffect(() => {
    let unsubscribe;
    api.query.templateModule.user(newValue => {
      if (newValue.isNone) {
        setData(0)
      } else {
        console.log(newValue)
        setCurrentAge(newValue.Data.toString())
      }
    }).then(unsub => {
      unsubscribe = unsub;
    })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api.query.templateModule]);

  return (
    <Grid.Column width={8}>
      <h1>Set Data</h1>
      <Form>
        <Form.Field>
          <Input
            label='Data'
            state='data'
            type='string'
            onChange={(_, { value }) => setData(value)}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            accountPair={accountPair}
            label='Update Details'
            type='SIGNED-TX'
            setStatus={setStatus}
            attrs={{
              palletRpc: 'templateModule',
              callable: 'doData',
              inputParams: [{"data": data} ],
              paramFields: [true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}



export default function Data (props) {
  const { api } = useSubstrate();
  return (api.query.templateModule && api.query.templateModule.user
    ? <Main {...props} /> : null);
}
