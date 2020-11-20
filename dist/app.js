"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const grpc_1 = __importDefault(require("grpc"));
const endpoint_grpc_pb_1 = require("iroha-helpers/lib/proto/endpoint_grpc_pb");
const index_1 = __importDefault(require("iroha-helpers/lib/commands/index"));
const index_2 = __importDefault(require("iroha-helpers/lib/queries/index"));
const commands = index_1.default;
const queries = index_2.default;
const app = express_1.default();
const port = 3000;
const IROHA_ADDRESS = '0.0.0.0:50051';
const adminPriv = 'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70';
const commandService = new endpoint_grpc_pb_1.CommandService_v1Client(IROHA_ADDRESS, grpc_1.default.credentials.createInsecure());
const queryService = new endpoint_grpc_pb_1.QueryService_v1Client(IROHA_ADDRESS, grpc_1.default.credentials.createInsecure());
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
//# sourceMappingURL=app.js.map