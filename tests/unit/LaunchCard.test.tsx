import { render, screen } from "@testing-library/react";
import { LaunchCard } from "@/components/LaunchCard";
import { describe, expect, it } from "vitest";

const launchMock = {
  id: '1',
  mission_name: 'Falcon 9',
  launch_date_utc: '2006-03-24T22:30:00.000Z',
  launch_success: true,
  rocket: {
    rocket_name: 'Falcon 1',
  }
}

describe("LaunchCard Component", () => {
  it("should render mission name when provided", () => {
    render(<LaunchCard launch={launchMock} />);
    expect(screen.getByText("Falcon 9")).toBeInTheDocument();
  });

  it("should throw an error when searching for text that does not exist (expected behavior)", () => {
    render(<LaunchCard launch={launchMock} />);

    expect(() => screen.getByText("X-Wing")).toThrow();
  });
});