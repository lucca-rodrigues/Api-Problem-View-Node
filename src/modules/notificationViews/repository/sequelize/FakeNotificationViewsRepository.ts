const configs: number[] = [];

class FakeNotificationConfigsRepository {
  async find() {
    return configs;
  }

  async create() {
    configs.push(1600);
  }
}

export default FakeNotificationConfigsRepository;
