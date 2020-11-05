// @flow
import React from 'react';
import { useGrpcState } from '../../context/grpc/grpc-context';
import type { GrpcRequest } from '../../../models/grpc-request';
import { findGrpcRequestState } from '../../context/grpc/grpc-reducer';
import { Pane, PaneBody, PaneHeader } from './pane';
import { ListGroup, ListGroupItem } from 'insomnia-components';

type Props = {
  forceRefreshKey: string,
  activeRequest: GrpcRequest,
};

const GrpcResponsePane = ({ activeRequest }: Props) => {
  const grpcState = useGrpcState();
  const { requestMessages, responseMessages } = findGrpcRequestState(grpcState, activeRequest._id);

  return (
    <Pane type="response">
      <PaneHeader />
      <PaneBody>
        <strong className="pad-bottom text-danger">Request Messages</strong>
        <ListGroup className="pad-bottom">
          {requestMessages.map(p => (
            <ListGroupItem key={p.id}>{p.text}</ListGroupItem>
          ))}
        </ListGroup>
        <strong className="pad-bottom text-danger">Response Messages</strong>
        <ListGroup>
          {responseMessages.map(p => (
            <ListGroupItem key={p.id}>{p.text}</ListGroupItem>
          ))}
        </ListGroup>
      </PaneBody>
    </Pane>
  );
};

export default GrpcResponsePane;
