import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { Reservation } from "../../../app/server_app/model/ReservationModel";

const insertMock = jest.fn();
const getByMock = jest.fn();
const updateMock = jest.fn();
const deleteMock = jest.fn();
const getAllElementsMock = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => ({
      insert: insertMock,
      getBy: getByMock,
      update: updateMock,
      delete: deleteMock,
      getAllElements: getAllElementsMock,
    })),
  };
});

describe("ReservationsDataAccess test suite", () => {
  let sut: ReservationsDataAccess;

  const someReservation: Reservation = {
    id: "",
    room: "someRoom",
    user: "someUserName",
    startDate: "someStartDate",
    endDate: "someEndDate",
  };
  const someId = "1234";

  beforeEach(() => {
    sut = new ReservationsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce(someId);
  });

  afterEach(() => {
    jest.clearAllMocks();
    someReservation.id = "";
  });

  it("should add reservation and return the id", async () => {
    insertMock.mockResolvedValueOnce(someId);

    const actualId = await sut.createReservation(someReservation);

    expect(actualId).toBe(someId);
    expect(insertMock).toHaveBeenCalledWith(someReservation);
  });

  it("should make the update reservation call", async () => {
    await sut.updateReservation(someId, "endDate", "someOtherEndDate");

    expect(updateMock).toHaveBeenCalledWith(
      someId,
      "endDate",
      "someOtherEndDate"
    );
  });

  it("should make the delete reservation call", async () => {
    await sut.deleteReservation(someId);

    expect(deleteMock).toHaveBeenCalledWith(someId);
  });

  it("should return reservation by id", async () => {
    getByMock.mockResolvedValueOnce(someReservation);

    const actual = await sut.getReservation(someId);

    expect(actual).toEqual(someReservation);
    expect(getByMock).toHaveBeenCalledWith("id", someId);
  });

  it("should return all reservations", async () => {
    getAllElementsMock.mockResolvedValueOnce([
      someReservation,
      someReservation,
    ]);

    const actual = await sut.getAllReservations();
    expect(actual).toEqual([someReservation, someReservation]);
    expect(getAllElementsMock).toHaveBeenCalledTimes(1);
  });
});
