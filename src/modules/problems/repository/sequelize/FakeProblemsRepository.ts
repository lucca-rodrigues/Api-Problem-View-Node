const configs: number[] = [];

class FakeProblemsRepository {
  async find() {
    return configs;
  }

  async create() {
    configs.push(1600);
  }
}

export default FakeProblemsRepository;
