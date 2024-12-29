const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './service.proto';

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const echoService = grpcObject.grpc_service.EchoService;

// Implement the SayHello method
function sayHello(call, callback) {
  console.log(`Received gRPC request from ${call.request.name}`);
  callback(null, { message: `Hello ${call.request.name}` });
}

// Start the gRPC server
const server = new grpc.Server();
server.addService(echoService.service, { sayHello: sayHello });
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('Service B (gRPC) is running on port 50051');
server.start();
