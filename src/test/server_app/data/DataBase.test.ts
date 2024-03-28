import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type someTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe("DataBase test suite", () => {
  let sut: DataBase<someTypeWithId>;

  const fakeId = "1234";
  const someObject = {
    id: "",
    name: "someName",
    color: "blue",
  };

  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return id after inset", async () => {
    const actual = await sut.insert({
      id: "",
    } as any);

    expect(actual).toBe(fakeId);
  });

  it("should get element after inset", async () => {
    const id = await sut.insert(someObject);
    const actual = await sut.getBy("id", id);

    expect(actual).toBe(someObject);
  });
});
