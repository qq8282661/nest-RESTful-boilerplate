import { Injectable } from '@nestjs/common';
import { Client, ClientGrpc, GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Injectable()
export class GrpcClientFactory {
  @Client(generateGrpcOptions('localhost:3001', 'nt_module_test', 'nt_module_test.proto'))
  public readonly testServiceClient: ClientGrpc;
}

export function generateGrpcOptions(
  url: string,
  packageName: string,
  protoFileName: string,
): GrpcOptions {
  return {
    transport: Transport.GRPC,
    options: {
      url,
      package: packageName,
      protoPath: join(__dirname, 'protobufs/' + protoFileName),
      loader: {
        arrays: true,
      },
    },
  };
}
