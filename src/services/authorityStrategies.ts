/**
 * Authority strategy implementations
 * 
 * Each authority has its own set of business rules based on
 * their scholarly interpretations of Islamic jurisprudence.
 * 
 * This follows the Strategy Pattern to allow easy extension
 * with new authorities by simply adding a new strategy object.
 */

import { AuthorityRules } from "./authority";

/**
 * AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions) Standards
 * 
 * Modern standard used by Islamic financial institutions worldwide.
 */
export const AAOIFIStrategy: AuthorityRules = {
  nisabType: "gold",
  stockMethod: "market_value",
  debtRule: "short_term",
  purificationScope: "all_haram",
};

/**
 * Permanent Committee for Scholarly Research and Ifta (Saudi Arabia)
 * 
 * Conservative approach with strict interpretation.
 */
export const PermanentCommitteeStrategy: AuthorityRules = {
  nisabType: "gold",
  stockMethod: "dividend_only",
  debtRule: "all",
  purificationScope: "interest_only",
};

/**
 * Islamic Fiqh Academy (OIC)
 * 
 * International scholarly body with comprehensive rulings.
 */
export const FiqhAcademyStrategy: AuthorityRules = {
  nisabType: "silver",
  stockMethod: "market_value",
  debtRule: "short_term",
  purificationScope: "all_haram",
};

