// import { View } from "../../views/model/Views";

const views = [];

class FakeViewsRepository {
  async create(data: any) {
    views.push(data);

    return data;
  }
}

export default FakeViewsRepository;
