import { faker } from '@faker-js/faker';
import { Address, CustomerInfo, DiscountInfo, EmployeeInfo, ItemModifier, Order, OrderItem, OrderStatus, PaymentInfo, SiteInfo } from './interface/interface';

// Utility to generate an address
export function generateAddress(): Address {
    return {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
    };
}

// Utility to generate customer information
export function generateCustomerInfo(): CustomerInfo {
    return {
        customerId: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        address: generateAddress(),
        loyaltyMemberId: faker.string.uuid(),
        loyaltyPoints: faker.number.int({ min: 0, max: 1000 })
    };
}

// Utility to generate item modifiers
export function generateItemModifiers(): ItemModifier {
    return {
        modifierId: faker.string.uuid(),
        name: faker.commerce.productAdjective(),
        priceAdjustment: faker.number.float({ min: -5, max: 5, fractionDigits: 2 })
    };
}

// Utility to generate order items
export function generateOrderItem(depth = 0): OrderItem {
    const maxDepth = 2;
    const hasChildItems = depth < maxDepth && faker.datatype.boolean();

    return {
        itemId: faker.string.uuid(),
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 10 }),
        price: Number(faker.commerce.price({ min: 0.01, max: 20, dec: 2 })),
        category: faker.commerce.department(),
        specialInstructions: [faker.lorem.sentence()],
        modifiers: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, generateItemModifiers),
        childItems: hasChildItems ? Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => generateOrderItem(depth + 1)) : [],
    };
}

export function generatePaymentInfo(): PaymentInfo {
    return {
        paymentId: faker.string.uuid(),
        method: faker.finance.transactionType(),
        amount: parseFloat(faker.commerce.price({ min: 20, max: 500, dec: 2 })),
        transactionDate: faker.date.recent(),
        isPaymentComplete: faker.datatype.boolean(),
        billingAddress: generateAddress()
    };
}

export function generateDiscountInfo(): DiscountInfo {
    return {
        name: faker.helpers.arrayElement(['Special', 'Loyalty', 'On-the-house']),
        discountId: faker.string.uuid(),
        description: faker.commerce.productDescription(),
        amount: faker.number.int({ min: 1, max: 20 }),
        percentage: faker.number.int({ max: 100 }),
        appliesTo: [faker.commerce.productName()]
    };
}

export function generateEmployeeInfo(): EmployeeInfo {
    return {
        employeeId: faker.string.uuid(),
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        contactInfo: faker.phone.number()
    };
}

export function generateSiteInfo(): SiteInfo {
    return {
        siteId: faker.string.uuid(),
        locationName: faker.company.name(),
        address: generateAddress(),
        phone: faker.phone.number(),
        manager: generateEmployeeInfo()
    };
}

export function generateOrderStatus(): OrderStatus {
    return {
        statusId: faker.string.uuid(),
        currentStatus: 'Processing',
        timestamps: {
            created: faker.date.past(),
            updated: faker.date.recent()
        }
    };
}

export function generateOrder(): Order {
    return {
        orderId: faker.string.uuid(),
        customerInfo: generateCustomerInfo(),
        items: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, generateOrderItem),
        paymentInfo: [generatePaymentInfo()],
        discountsApplied: [generateDiscountInfo()],
        orderStatus: generateOrderStatus(),
        siteInfo: generateSiteInfo(),
        createdByEmployee: generateEmployeeInfo(),
        createTime: faker.date.past(),
        updateTime: faker.date.recent(),
        estimatedDeliveryTime: faker.date.future(),
        actualDeliveryTime: faker.date.future(),
        deliveryMethod: faker.helpers.arrayElement(['Delivery', 'Pick-up']),
        isPriorityOrder: faker.datatype.boolean(),
        notes: [faker.lorem.sentence()],
        subTotal: parseFloat(faker.commerce.price({ min: 100, max: 200, dec: 2 })),
        tax: parseFloat(faker.commerce.price({min: 10, max: 20, dec: 2 })),
        total: parseFloat(faker.commerce.price({ min: 110, max: 220, dec: 2 })),
        tip: parseFloat(faker.commerce.price({ min: 0, max: 30, dec: 2 })),
        feedback: faker.lorem.sentences(),
        refundAmount: parseFloat(faker.commerce.price({min: 0, max: 50, dec: 2})),
        refundReason: faker.lorem.sentence(),
        deliveryDriver: generateEmployeeInfo(),
        packagingOptions: [faker.helpers.arrayElement(['Standard', 'Eco-Friendly', 'Premium'])],
        isGift: faker.datatype.boolean(),
        giftMessage: faker.lorem.sentence(),
        kitchenNotes: [faker.lorem.sentence()],
        cookingInstructions: [faker.lorem.sentence()],
        allergies: [faker.lorem.word()],
        tableNumber: faker.string.numeric(3),
        reservationTime: faker.date.future(),
        diningDuration: faker.number.int({ min: 30, max: 180 }),
        numberOfGuests: faker.number.int({ min: 1, max: 10 }),
        isTakeout: faker.datatype.boolean(),
        customerSignature: faker.internet.userName(),
        temperatureControl: {
            coldItems: faker.datatype.boolean(),
            hotItems: faker.datatype.boolean()
        },
        orderCompletionConfirmation: faker.datatype.boolean(),
        thirdPartyDeliveryService: faker.company.name()
    };
}

export function generateOrders(count: number): Order[] {
    return Array.from({ length: count }, generateOrder);
}
