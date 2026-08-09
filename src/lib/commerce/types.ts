export type Channel = 'website' | 'pos' | 'whatsapp' | 'amazon' | 'flipkart' | 'meesho';
export type Money = { amount: number; currency: 'INR' };
export type InventoryLedgerReason = 'opening_stock' | 'reservation' | 'pos_sale' | 'online_sale' | 'cancellation' | 'return' | 'damage' | 'restock' | 'transfer' | 'adjustment' | 'purchase' | 'channel_allocation';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
export type RtoSignal = { phoneVerified: boolean; previousRto: number; previousReturns: number; addressQuality: number; pincodeRisk: number; orderValue: number; paymentType: 'prepaid' | 'cod' | 'partial_cod'; repeatCustomer: boolean };
export type RtoDecision = { riskScore: number; riskLevel: RiskLevel; recommendedAction: string };
export type ProductSummary = { id: string; slug: string; name: string; price: Money; image: string; tags: string[]; sizes: string[]; stockLabel: string };
