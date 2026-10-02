/**
 * GLOW VAI Cosmetic Compliance Details (India Rules)
 * Required details for cosmetic & e-commerce sellers in India.
 * Fill in details prior to public launch. Renders only when populated.
 */

export interface ComplianceDetails {
  marketerName?: string;
  marketerAddress?: string;
  manufacturerName?: string;
  manufacturerAddress?: string;
  licenceNumber?: string;
  grievanceOfficerName?: string;
  grievanceOfficerEmail?: string;
  grievanceOfficerPhone?: string;
}

export const complianceConfig: ComplianceDetails = {
  // TODO: Confirm requirements with legal/regulatory consultant before launch.
  marketerName: "",
  marketerAddress: "",
  manufacturerName: "",
  manufacturerAddress: "",
  licenceNumber: "",
  grievanceOfficerName: "",
  grievanceOfficerEmail: "",
  grievanceOfficerPhone: "",
};
