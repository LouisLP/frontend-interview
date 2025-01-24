import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Applications from "./Applications";
import { useApplications } from "../../hooks/useApplications";
import { Application } from "../../types/Application";

vi.mock("../../hooks/useApplications", () => ({
  useApplications: vi.fn(),
}));

const mockApplications: Application[] = [
  {
    guid: "1234-abcd",
    loan_amount: 50000,
    first_name: "Carson",
    last_name: "White Basin",
    company: "Test Co",
    email: "iwoca@test.com",
    date_created: "2025-01-01",
    expiry_date: "2025-02-01",
  },
];

describe("Applications", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders applications list and load more button", () => {
    vi.mocked(useApplications).mockReturnValue({
      applications: mockApplications,
      isLoading: false,
      hasMore: true,
      error: null,
      loadMore: vi.fn(),
    });

    render(<Applications />);

    expect(screen.getByText("Carson White Basin")).toBeInTheDocument();
    expect(screen.getByText("Load more")).toBeInTheDocument();
  });

  it("shows loading spinner when loading", () => {
    vi.mocked(useApplications).mockReturnValue({
      applications: [],
      isLoading: true,
      hasMore: true,
      error: null,
      loadMore: vi.fn(),
    });

    render(<Applications />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("handles error state", () => {
    const errorMessage = "Failed to fetch applications";
    vi.mocked(useApplications).mockReturnValue({
      applications: [],
      isLoading: false,
      hasMore: false,
      error: errorMessage,
      loadMore: vi.fn(),
    });

    render(<Applications />);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it("calls loadMore when clicking load more button", () => {
    const loadMore = vi.fn();
    vi.mocked(useApplications).mockReturnValue({
      applications: mockApplications,
      isLoading: false,
      hasMore: true,
      error: null,
      loadMore,
    });

    render(<Applications />);

    fireEvent.click(screen.getByText("Load more"));
    expect(loadMore).toHaveBeenCalledTimes(1);
  });

  it("hides load more button when hasMore is false", () => {
    vi.mocked(useApplications).mockReturnValue({
      applications: mockApplications,
      isLoading: false,
      hasMore: false,
      error: null,
      loadMore: vi.fn(),
    });

    render(<Applications />);

    expect(screen.queryByText("Load more")).not.toBeInTheDocument();
  });
});
