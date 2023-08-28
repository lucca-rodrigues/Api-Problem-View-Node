const users = [];

class FakeUsersepository {
  async create(data: any) {
    users.push(data);

    return data;
  }
}

export default FakeUsersepository;
