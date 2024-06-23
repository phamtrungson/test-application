import { BaseEntity, IBaseEntityProps } from '../BaseEntity';
import { RequestProcessErrorDomainEvent } from '../events';

export enum RequestProcessStatus {
    Created = 'Created',
    Processing = 'Processing',
    Processed = 'Processed',
    Error = 'Error'
}

export type RPMetadata = { messageId?: string; restart?: number; restartInfo?: any; workerId?: string };
export interface IRequestProcessProps<T = any> extends IBaseEntityProps {
    id: string;
    timestamp: number;
    correlationId: string;
    status: RequestProcessStatus;
    metadata: RPMetadata;

    data?: T;

    updatedAt?: string;
    error?: any;
}

export class RequestProcess<T = any> extends BaseEntity implements IRequestProcessProps {
    constructor(
        public id: string,
        public timestamp: number,
        public correlationId: string,
        public status: RequestProcessStatus = RequestProcessStatus.Created,

        public data: T = {} as any,
        public metadata = {} as RPMetadata,

        public updatedAt?: string,
        public error?: any
    ) {
        super(id);
    }

    restartProcess(info: any) {
        if (this.metadata.restart === undefined) {
            this.metadata.restart = 1;
        } else {
            this.metadata.restart++;
        }
        this.metadata.restartInfo = info;
        this.status = RequestProcessStatus.Processing;
    }

    isFinish() {
        return [RequestProcessStatus.Processed, RequestProcessStatus.Error].includes(this.status);
    }

    statusChangeToProcessing() {
        this.status = RequestProcessStatus.Processing;
    }

    statusChangeToProcessed() {
        this.status = RequestProcessStatus.Processed;
    }

    statusChangeToError(e: any) {
        this.status = RequestProcessStatus.Error;
        this.error = e;

        this.addEvent(new RequestProcessErrorDomainEvent(e));
    }
}
