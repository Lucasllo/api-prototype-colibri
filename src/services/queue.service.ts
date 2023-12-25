import { Injectable } from '@nestjs/common';
import {
  // paginateListQueues,
  SendMessageCommand,
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { Consumer } from 'sqs-consumer';

@Injectable()
export class QueueService {
  client = new SQSClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });
  queueURL = process.env.TEST_QUEUE_URL;

  app = Consumer.create({
    queueUrl: this.queueURL,
    sqs: this.client,
    handleMessage: async (m) => {
      console.log(m);
    },
    shouldDeleteMessages: false,
    visibilityTimeout: 30,
    waitTimeSeconds: 5,
  });

  constructor() {}

  async sendMessageToQueue(body) {
    try {
      const command = new SendMessageCommand({
        MessageBody: body,
        QueueUrl: this.queueURL,
        MessageAttributes: {
          OrderId: { DataType: 'String', StringValue: '4421x' },
        },
      });
      const result = await this.client.send(command);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async PollMessages() {
    try {
      const command = new ReceiveMessageCommand({
        MaxNumberOfMessages: 10,
        QueueUrl: this.queueURL,
        WaitTimeSeconds: 5,
        MessageAttributeNames: ['All'],
        VisibilityTimeout: 30,
      });
      const result = await this.client.send(command);
      console.log(result.Messages);
      if (result.Messages != undefined) {
        // result.Messages.forEach((mensagem) => {
        //   console.log(mensagem.Body);
        // });
        console.log(result.Messages[0].Body);
        return {
          mensagem: result.Messages[0].Body,
          codigo: result.Messages[0].ReceiptHandle,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteMessagesFromQueue(receiptHandle) {
    try {
      const command = new DeleteMessageCommand({
        QueueUrl: this.queueURL,
        ReceiptHandle: receiptHandle,
      });
      await this.client.send(command);
    } catch (error) {
      console.log(error);
    }
  }
}
