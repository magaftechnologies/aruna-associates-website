import { describe, expect, it } from "vitest";
import { validatePhone } from "@/components/site/enquiry";
import { whatsappLink, business } from "@/data/business";

describe("business rules", () => {
  it("accepts a valid Indian mobile number", () => expect(validatePhone("9030086081")).toBe(true));
  it("rejects a short number", () => expect(validatePhone("90300")).toBe(false));
  it("WhatsApp links go to 9030086081", () => expect(whatsappLink()).toContain("wa.me/919030086081"));
  it("uses the client address", () => expect(business.address).toBe("30-55/1A Moghul Colony, Old Safilguda, Malkajgiri"));
});
