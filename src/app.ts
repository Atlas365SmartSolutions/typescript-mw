import express from 'express';
import grpc from 'grpc';
import {
    QueryService_v1Client as QueryService,
    CommandService_v1Client as CommandService
  } from 'iroha-helpers/lib/proto/endpoint_grpc_pb';
import commandsInit from 'iroha-helpers/lib/commands/index';
import queriesInit from 'iroha-helpers/lib/queries/index';

const commands =  commandsInit;
const queries = queriesInit;
const app = express();
const port = 3000;
const IROHA_ADDRESS = '0.0.0.0:50051';
const adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70';
const commandService = new CommandService(
    IROHA_ADDRESS,
    grpc.credentials.createInsecure()
  );
  const queryService = new QueryService(
    IROHA_ADDRESS,
    grpc.credentials.createInsecure()
  );
  const COMMAND_OPTIONS = {
    privateKeys: [adminPriv],
    creatorAccountId: 'admin@test',
    quorum: 1,
    commandService,
    timeoutLimit: 1000000
  };
  const QUERY_OPTIONS = {
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService,
    timeoutLimit: 5000
  };


app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.get('/iroha-test', (req, res) => {
    const accountKey = 'admin@test';
    const batchKeySearch = 'batch_001';
    const respBatchSearchKey = 'batch_0001';

    queries.getAccountDetail(QUERY_OPTIONS, {
        accountId: accountKey,
        key: batchKeySearch,
        pageSize: 100,
        paginationKey: 'coin#test',
        paginationWriter: accountKey,
        writer: accountKey,
    }).then(resp => {

        alert(JSON.stringify(resp));
            // 1st parse is to get rid of escaped backslashes
            // 2nd parse is to get the escaped-JSON string as a JSON object
        // const escapedBatchInfo = JSON.parse(resp[accountKey][batchKeySearch])
        // const batchInfo = JSON.parse(escapedBatchInfo);
        // const batch0001 = batchInfo.batch_0001;
            // const batchNumberResponse = mapBatchObj(extractionBatch, batch0001);
            // console.log(extractionBatch.crudeExtract);
            // console.log(batchInfo);
            // console.log(batchNumberResponse);
            // console.log(extractionBatch);
        // console.log(batchInfo['crudeExtract']);
        // res.send(batchInfo);
        // res.send('iroha-test');
    });
    // res.send("iroha-testing");
  });
app.listen(port, err => {
  // if (err) {
  //   return console.error(err);
  // }

  return console.log(`server is listening on ${port}`);
});

