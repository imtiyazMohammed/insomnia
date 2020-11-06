import * as ipcGrpc from '../ipc-grpc';
import * as grpc from '../../network/grpc';
import { ipcMain } from 'electron';
import { GrpcRequestEventEnum } from '../../common/grpc-events';
import { ResponseCallbacks } from '../../network/grpc/response-callbacks';

jest.mock('../../network/grpc');

describe('ipc-grpc', () => {
  const event = { reply: jest.fn() };
  const id = 'abc';

  beforeEach(() => {
    jest.resetAllMocks();
    ipcGrpc.init(); // ipcMain is mocked
  });

  it('should add expected listener for sendUnary', () => {
    const [channel, listener] = ipcMain.on.mock.calls[0];

    // Expect the sendUnary channel
    expect(channel).toBe(GrpcRequestEventEnum.sendUnary);

    // Execute the callback, and make sure the correct grpc method is called
    listener(event, id);
    expect(grpc.sendUnary).toHaveBeenCalledWith(id, expect.any(ResponseCallbacks));
  });

  it('should add expected listener for startClientStream', () => {
    const [channel, listener] = ipcMain.on.mock.calls[1];

    // Expect the sendUnary channel
    expect(channel).toBe(GrpcRequestEventEnum.startClientStream);

    // Execute the callback, and make sure the correct grpc method is called
    listener(event, id);
    expect(grpc.startClientStreaming).toHaveBeenCalledWith(id, expect.any(ResponseCallbacks));
  });

  it('should add expected listener for startServerStream', () => {
    const [channel, listener] = ipcMain.on.mock.calls[2];

    // Expect the sendUnary channel
    expect(channel).toBe(GrpcRequestEventEnum.startServerStream);

    // Execute the callback, and make sure the correct grpc method is called
    listener(event, id);
    expect(grpc.startServerStreaming).toHaveBeenCalledWith(id, expect.any(ResponseCallbacks));
  });

  it('should add expected listener for startBidiStream', () => {
    const [channel, listener] = ipcMain.on.mock.calls[3];

    // Expect the sendUnary channel
    expect(channel).toBe(GrpcRequestEventEnum.startBidiStream);

    // Execute the callback, and make sure the correct grpc method is called
    listener(event, id);
    expect(grpc.startBidiStreaming).toHaveBeenCalledWith(id, expect.any(ResponseCallbacks));
  });

  it('should add expected listener for sendMessage', () => {
    const [channel, listener] = ipcMain.on.mock.calls[4];

    // Expect the sendUnary channel
    expect(channel).toBe(GrpcRequestEventEnum.sendMessage);

    // Execute the callback, and make sure the correct grpc method is called
    listener(event, id);
    expect(grpc.sendMessage).toHaveBeenCalledWith(id, expect.any(ResponseCallbacks));
  });

  it('should add expected listener for commit', () => {
    const [channel, listener] = ipcMain.on.mock.calls[5];

    // Expect the sendUnary channel
    expect(channel).toBe(GrpcRequestEventEnum.commit);

    // Execute the callback, and make sure the correct grpc method is called
    listener(event, id);
    expect(grpc.commit).toHaveBeenCalledWith(id);
  });

  it('should add expected listener for cancel', () => {
    const [channel, listener] = ipcMain.on.mock.calls[6];

    // Expect the sendUnary channel
    expect(channel).toBe(GrpcRequestEventEnum.cancel);

    // Execute the callback, and make sure the correct grpc method is called
    listener(event, id);
    expect(grpc.cancel).toHaveBeenCalledWith(id);
  });
});
