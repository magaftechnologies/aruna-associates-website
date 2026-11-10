import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EnquirySection } from "./enquiry";

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function fillRequiredFields(container: HTMLElement) {
  fireEvent.change(screen.getByLabelText("Full Name *"), { target: { value: "A Customer" } });
  fireEvent.change(screen.getByLabelText("Mobile Number *"), { target: { value: "9030086081" } });
  fireEvent.change(screen.getByLabelText("Location *"), { target: { value: "Hyderabad" } });
  fireEvent.change(screen.getByLabelText("Requirement *"), { target: { value: "Home Loan" } });
  return container.querySelector("form");
}

describe("enquiry form", () => {
  it("shows field errors and does not submit an empty form", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<EnquirySection />);

    fireEvent.submit(container.querySelector("form")!);

    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid 10-digit mobile number.")).toBeInTheDocument();
    expect(screen.getByText("Please tell us your location.")).toBeInTheDocument();
    expect(screen.getByText("Please choose a requirement.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid optional email address", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<EnquirySection />);
    const form = fillRequiredFields(container)!;
    fireEvent.change(screen.getByLabelText("Email (optional)"), {
      target: { value: "not-an-email" },
    });

    fireEvent.submit(form);

    expect(screen.getByText("Please check your email address.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not claim success when no Web3Forms key is configured", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<EnquirySection />);

    fireEvent.submit(fillRequiredFields(container)!);

    expect(await screen.findByText(/Online enquiries aren't switched on yet/)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the existing fields, blocks duplicate submits, and resets after success", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test-access-key");
    let resolveRequest!: (response: Response) => void;
    const fetchMock = vi.fn(
      (_url: string, _options: RequestInit) =>
        new Promise<Response>((resolve) => {
          resolveRequest = resolve;
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<EnquirySection />);
    const form = fillRequiredFields(container)!;
    fireEvent.change(screen.getByLabelText("Email (optional)"), {
      target: { value: "customer@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Approximate Requirement"), {
      target: { value: "₹40 lakh" },
    });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Please call me." } });

    fireEvent.submit(form);

    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
    fireEvent.submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({ method: "POST" }),
    );

    resolveRequest({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);
    expect(await screen.findByText(/your enquiry has been sent/)).toBeInTheDocument();

    const payload = fetchMock.mock.calls[0]![1].body as FormData;
    expect(payload.get("access_key")).toBe("test-access-key");
    expect(payload.get("business_name")).toBe("Aruna Associates");
    expect(payload.get("form_source")).toBe("Aruna Associates website enquiry form");
    expect(payload.get("name")).toBe("A Customer");
    expect(payload.get("phone")).toBe("9030086081");
    expect(payload.get("email")).toBe("customer@example.com");
    expect(payload.get("location")).toBe("Hyderabad");
    expect(payload.get("requirement")).toBe("Home Loan");
    expect(payload.get("amount")).toBe("₹40 lakh");
    expect(payload.get("message")).toBe("Please call me.");
    await waitFor(() => expect(screen.getByLabelText("Full Name *")).toHaveValue(""));
  });

  it("shows a retry message when the form service rejects a request", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test-access-key");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network unavailable")));
    const { container } = render(<EnquirySection />);

    fireEvent.submit(fillRequiredFields(container)!);

    expect(await screen.findByText(/Something went wrong\. Please try again/)).toBeInTheDocument();
  });

  it("shows a retry message when Web3Forms returns a failed response", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test-access-key");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ success: false }),
      }),
    );
    const { container } = render(<EnquirySection />);

    fireEvent.submit(fillRequiredFields(container)!);

    expect(await screen.findByText(/Something went wrong\. Please try again/)).toBeInTheDocument();
  });
});
