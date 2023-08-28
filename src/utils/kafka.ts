import 'dotenv/config';
import { Kafka, logLevel } from 'kafkajs';

const BROKER_NOTIFICATION_B1 = process.env.BROKER_KAFKA_B1 || 'localhost:9092';
const BROKER_NOTIFICATION_B2 = process.env.BROKER_KAFKA_B2 || 'localhost:9092';

class KafkaInstance {
  private static instance: any = null;
  private static producer: any;
  private static consumer: any;

  public static async getInstance() {
    if (this.instance == null) {
      this.instance = new Kafka({
        clientId: 'api-problem-views',
        brokers: [BROKER_NOTIFICATION_B1, BROKER_NOTIFICATION_B2],
        logLevel: logLevel.ERROR,
      });

      this.producer = this.instance.producer();
      this.consumer = this.instance.consumer({ groupId: 'group-id' });
    }
    return this.instance;  
  }

  public static async produceToTopic(topic: string, message: any) {
    await this.getInstance();

    if (this.instance !== null) {
      await this.producer.connect();
      await this.producer.send({
        topic: topic,
        messages: [ { value: JSON.stringify(message), }, ],
      });
      console.log('\nSend to topic: ', topic);
      console.log('Message: ', message);
      await this.producer.disconnect();
    }
  }

  public static async consumeFromTopic(topic: string, onMessage: (message: any) => void) {
    await this.getInstance();

    if (this.instance !== null) {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: topic, fromBeginning: true });
      this.consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause  }: any) => {
          console.log('\n# New message kafka received: \n> Info:', {topic, partition, offset: message?.offset})

          const parsedMessage = JSON.parse(message.value.toString());
          console.log(`Received message from topic: ${topic}`);
          console.log('Message: ', parsedMessage);
          
          onMessage(parsedMessage);
        },
      });
    }
  }

  public static async disconnectConsumer() {
    if (this.instance !== null && this.consumer) {
      await this.consumer.disconnect();
      console.log('Consumer disconnected.');
    }
  }
}

export default KafkaInstance;