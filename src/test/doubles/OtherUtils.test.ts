import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCb,
} from "../../app/doubles/OtherUtils";

describe.skip("OtherUtils test suite", () => {
  describe.only("OtherStringUtils tests with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("asv");
      expect(toUpperCaseSpy).toHaveBeenCalledWith("asv");
    });

    test("Use a spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");
      expect(consoleLogSpy).toHaveBeenCalledWith("abc");
    });

    test("Use a spy to replace the implementation of a method", () => {
      jest.spyOn(sut as any, "callExternalService").mockImplementation(() => {
        console.log("calling mocked implementation!!!");
      });

      (sut as any).callExternalService();
    });
  });

  describe("Tracking callbacks with Jest mocks", () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toHaveBeenCalledWith("Invalid argument!");
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(callBackMock).toHaveBeenCalledWith("called function with abc");
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
  });
  describe("Tracking callbacks", () => {
    let cbArgs = [];
    let timeCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timeCalled++;
    }

    afterEach(() => {
      cbArgs = [];
      timeCalled = 0;
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid argument!");
      expect(timeCalled).toBe(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(cbArgs).toContain("called function with abc");
      expect(timeCalled).toBe(1);
    });
  });

  it("ToUpperCase - calls callback for valid argument", () => {
    const actual = toUpperCaseWithCb("abc", () => {});
    expect(actual).toBe("ABC");
  });

  it("Calculates complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "someOtherInfo",
      },
    };

    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});
