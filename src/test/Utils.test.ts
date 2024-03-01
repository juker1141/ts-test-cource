import { getStringInfo, toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
  it("should return uppercase of valid string", () => {
    const sut = toUpperCase;
    const expected = "ABC";

    const actual = sut("abc");

    expect(actual).toBe(expected);
  });

  it("should return info for valid string", () => {
    const actual = getStringInfo("My-String");

    expect(actual.lowerCase).toBe("my-string");
    expect(actual.extraInfo).toEqual({});

    expect(actual.characters.length).toBe(9);
    expect(actual.characters).toHaveLength(9);
  });
});
