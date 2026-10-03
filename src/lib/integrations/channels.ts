import type { Channel } from '@/lib/commerce/types';
export interface ChannelAdapter { channel: Channel; pullOrders(): Promise<void>; pushInventory(variantId: string, available: number): Promise<void>; }
export const channelPlan: Channel[] = ['website','pos','whatsapp','amazon','flipkart','meesho'];
