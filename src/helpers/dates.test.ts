import { formatDate } from "./dates";

describe("formatDate", () => {
  it("formats date correctly", () => {
    expect(formatDate("2021-05-24T04:53:48.656Z")).toBe("24-05-2021");
  });
});
