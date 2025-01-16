import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Applications from "./Applications";
import { Application } from "./types/Application";

const mockApplications: Application[] = [
  {
    id: 1,
    first_name: "Louis",
    last_name: "Lascelles-Palys",
    company: "Test Co",
    email: "louis@test.com",
    loan_amount: 50000,
    date_created: "2024-01-01",
    expiry_date: "2024-02-01",
  },
];

describe("Applications", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  test("renders applications and load more button", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockApplications,
      headers: new Headers({
        Link: '<http://localhost:3001/api/applications?_page=2>; rel="next"',
      }),
    });

    render(<Applications />);

    await waitFor(() => {
      expect(screen.getByText("Louis Lascelles-Palys")).toBeInTheDocument();
      expect(screen.getByText("Load more")).toBeInTheDocument();
    });
  });

  test("loads more applications on button click", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => mockApplications,
        headers: new Headers({
          Link: '<http://localhost:3001/api/applications?_page=2>; rel="next"',
        }),
      })
      .mockResolvedValueOnce({
        json: async () => [
          { ...mockApplications[0], id: 2, company: "Second Co" },
        ],
        headers: new Headers({}),
      });

    render(<Applications />);

    const loadMore = await screen.findByText("Load more");
    fireEvent.click(loadMore);

    await waitFor(() => {
      expect(screen.getByText("Second Co")).toBeInTheDocument();
    });
  });
});
