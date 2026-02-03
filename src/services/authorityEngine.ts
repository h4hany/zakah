/**
 * Authority Engine - Central resolver for authority rules
 * 
 * Provides a single point of access to retrieve the business rules
 * for any given authority. This centralizes the mapping logic and
 * makes it easy to extend with new authorities.
 */

import { Authority, AuthorityRules } from "./authority";
import {
  AAOIFIStrategy,
  PermanentCommitteeStrategy,
  FiqhAcademyStrategy,
} from "./authorityStrategies";

/**
 * Resolves the business rules for a given authority
 * 
 * @param authority - The selected Islamic authority
 * @returns The AuthorityRules configuration for the specified authority
 * 
 * @example
 * ```typescript
 * const rules = resolveAuthorityRules("AAOIFI");
 * // Returns AAOIFIStrategy rules
 * ```
 */
export function resolveAuthorityRules(authority: Authority): AuthorityRules {
  switch (authority) {
    case "PERMANENT":
      return PermanentCommitteeStrategy;
    case "FIQH":
      return FiqhAcademyStrategy;
    case "AAOIFI":
    default:
      return AAOIFIStrategy;
  }
}

