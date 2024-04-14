export interface CustomerInfo {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: Address;
    loyaltyMemberId: string;
    loyaltyPoints: number;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface OrderItem {
    itemId: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    specialInstructions: string[];
    modifiers: ItemModifier[];
    childItems: OrderItem[];
}

export interface ItemModifier {
    modifierId: string;
    name: string;
    priceAdjustment: number;
}

export interface PaymentInfo {
    paymentId: string;
    method: string;
    amount: number;
    transactionDate: Date;
    isPaymentComplete: boolean;
    billingAddress: Address;
}

export interface DiscountInfo {
    name: string;
    discountId: string;
    description: string;
    amount: number;
    percentage: number;
    appliesTo: string[];
}

export interface SiteInfo {
    siteId: string;
    locationName: string;
    address: Address;
    phone: string;
    manager: EmployeeInfo;
}

export interface EmployeeInfo {
    employeeId: string;
    name: string;
    role: string;
    contactInfo: string;
}

export interface OrderStatus {
    statusId: string;
    currentStatus: string;
    timestamps: Record<string, Date>;
}

export interface Order {
    orderId: string;
    customerInfo: CustomerInfo;
    items: OrderItem[];
    paymentInfo: PaymentInfo[];
    discountsApplied: DiscountInfo[];
    orderStatus: OrderStatus;
    siteInfo: SiteInfo;
    createdByEmployee: EmployeeInfo;
    createTime: Date;
    updateTime: Date;
    estimatedDeliveryTime: Date;
    actualDeliveryTime: Date;
    deliveryMethod: string;
    isPriorityOrder: boolean;
    notes: string[];
    subTotal: number;
    tax: number;
    total: number;
    tip: number;
    feedback: string;
    refundAmount: number;
    refundReason: string;
    deliveryDriver: EmployeeInfo;
    packagingOptions: string[];
    isGift: boolean;
    giftMessage: string;
    kitchenNotes: string[];
    cookingInstructions: string[];
    allergies: string[];
    tableNumber: string;
    reservationTime: Date;
    diningDuration: number; // in minutes
    numberOfGuests: number;
    isTakeout: boolean;
    customerSignature: string;
    temperatureControl: {
        coldItems: boolean;
        hotItems: boolean;
    };
    orderCompletionConfirmation: boolean;
    thirdPartyDeliveryService: string;
}

