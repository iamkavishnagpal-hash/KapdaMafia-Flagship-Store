import type { RtoDecision, RtoSignal } from './types';
export function scoreRtoRisk(signal: RtoSignal): RtoDecision {
  const score = Math.min(100, Math.max(0,
    (signal.phoneVerified ? -12 : 18) + signal.previousRto * 18 + signal.previousReturns * 6 +
    (100 - signal.addressQuality) * 0.22 + signal.pincodeRisk * 0.28 +
    (signal.paymentType === 'cod' ? 16 : signal.paymentType === 'partial_cod' ? 7 : -10) +
    (signal.orderValue > 3999 ? 8 : 0) + (signal.repeatCustomer ? -10 : 5) + 20));
  if (score >= 75) return { riskScore: Math.round(score), riskLevel: 'VERY_HIGH', recommendedAction: 'Manual review before dispatch; ask for stronger confirmation or prepaid conversion.' };
  if (score >= 55) return { riskScore: Math.round(score), riskLevel: 'HIGH', recommendedAction: 'Require OTP confirmation, partial payment, or prepaid incentive.' };
  if (score >= 35) return { riskScore: Math.round(score), riskLevel: 'MEDIUM', recommendedAction: 'Send WhatsApp confirmation and validate address quality.' };
  return { riskScore: Math.round(score), riskLevel: 'LOW', recommendedAction: 'Ship normally with standard tracking.' };
}
