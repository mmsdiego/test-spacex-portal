import { vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("next/navigation", async () => {
  return await import("./__mocks__/next-router");
});