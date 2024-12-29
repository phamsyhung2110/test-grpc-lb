const express = require('express');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './service.proto';

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const echoService = grpcObject.grpc_service.EchoService;

const app = express();
const port = process.env.PORT || 5000;
const grpcServiceAddress = process.env.GRPC_SERVICE_ADDRESS || 'service-b-grpc:50051';

// Create a gRPC client for Service B
const client = new echoService(grpcServiceAddress, grpc.credentials.createInsecure());

// Proxy the HTTP request and forward it to Service B using gRPC
app.get('/hello', (req, res) => {
  const name = req.query.name || 'World';
  client.sayHello({ name: name }, (error, response) => {
    if (error) {
      res.status(500).send('Error calling gRPC service');
    } else {
      res.send(response.message);
    }
  });
});

app.listen(port, () => {
  console.log(`Service A (Proxy) for gRPC is running on port ${port}`);
});
