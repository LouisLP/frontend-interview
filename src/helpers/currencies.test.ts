import { formatGBP } from "./currencies";

describe("formatGBP", () => {
  it("formats currency correctly", () => {
    expect(formatGBP(1234)).toBe("£1,234");
    expect(formatGBP(1234567)).toBe("£1,234,567");
  });
});
