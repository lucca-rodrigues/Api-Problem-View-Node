
import { Kafka, logLevel } from 'kafkajs';
import KafkaInstance from './kafka';


jest.mock('kafkajs', () => {
  const mKafka = {
    producer: jest.fn().mockReturnThis(),
    consumer: jest.fn().mockReturnThis(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    send: jest.fn(),
    subscribe: jest.fn(),
    run: jest.fn(),
  };
  return {
    Kafka: jest.fn(() => mKafka),
    logLevel: jest.fn(() => logLevel.ERROR),
  };
});


describe('KafkaInstance', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getInstance should create and return Kafka instance', async () => {
        const kafkaInstance = await KafkaInstance['getInstance']();
        expect(kafkaInstance).toBeInstanceOf(Object);
    });

    test('produceToTopic should connect, send a message, and disconnect', async () => {
        const topic = 'test-topic';
        const message = { key: 'value' };
        await KafkaInstance.produceToTopic(topic, message);

        const kafkaInstance = await KafkaInstance['getInstance']();
        const producer = kafkaInstance.producer();

        expect(producer.connect).toHaveBeenCalledTimes(1);
        expect(producer.send).toHaveBeenCalledWith({
            topic: topic,
            messages: [{ value: JSON.stringify(message) }],
        }); 
        expect(producer.disconnect).toHaveBeenCalledTimes(1);
    });

    test('consumeFromTopic should connect, subscribe and run consumer', async () => {
        const topic = 'test-topic';
        const onMessage = jest.fn();

        await KafkaInstance.consumeFromTopic(topic, onMessage);

        const kafkaInstance = await KafkaInstance['getInstance']();
        const consumer = kafkaInstance.consumer({ groupId: 'group-id' });

        expect(consumer.connect).toHaveBeenCalledTimes(1);
        expect(consumer.subscribe).toHaveBeenCalledWith({ topic: topic, fromBeginning: true });
        expect(consumer.run).toHaveBeenCalled();
        
    });

    test('disconnectConsumer should disconnect the consumer', async () => {
        await KafkaInstance.disconnectConsumer();

        const kafkaInstance = await KafkaInstance['getInstance']();
        const consumer = kafkaInstance.consumer({ groupId: 'group-id' });

        expect(consumer.disconnect).toHaveBeenCalledTimes(1);

    });
});

