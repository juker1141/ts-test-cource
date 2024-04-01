import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess";
import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";
import { Account } from "../../../app/server_app/model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();
const updateMock = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
        update: updateMock,
      };
    }),
  };
});

const someAccount: Account = {
  id: "",
  password: "somePassword",
  userName: "someUserName",
};

describe("SessionTokenDataAccess test suite", () => {
  let sut: SessionTokenDataAccess;
  const fakeId = "1234";

  beforeEach(() => {
    sut = new SessionTokenDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
    jest.spyOn(global.Date, "now").mockReturnValue(0);
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce(fakeId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate token for account", async () => {
    insertMock.mockResolvedValueOnce(fakeId);
    const actualTokenId = await sut.generateToken(someAccount);

    expect(actualTokenId).toBe(fakeId);
    expect(insertMock).toHaveBeenCalledWith({
      id: "",
      userName: someAccount.userName,
      valid: true,
      expirationDate: new Date(1000 * 60 * 60),
    });
  });

  it("should invalidate token", async () => {
    await sut.invalidateToken(fakeId);

    expect(updateMock).toHaveBeenCalledWith(fakeId, "valid", false);
  });

  it("should check valid token", async () => {
    getByMock.mockResolvedValueOnce({ valid: true });

    const actual = await sut.isValidToken("");
    expect(actual).toBe(true);
  });

  it("should check invalid token", async () => {
    getByMock.mockResolvedValueOnce({ valid: false });

    const actual = await sut.isValidToken("");
    expect(actual).toBe(false);
  });

  it("should check inexistent token", async () => {
    getByMock.mockResolvedValueOnce(undefined);

    const actual = await sut.isValidToken("");
    expect(actual).toBe(false);
  });
});
