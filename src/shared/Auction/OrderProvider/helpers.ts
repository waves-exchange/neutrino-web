import { IOrder } from "routes/BondsDashboard/types";

export const sortOrders = (orders: IOrder[]): IOrder[] => {
    const sorted = [orders.find(order => order.is_first)].filter(Boolean);

    if (sorted.length === 0) {
        return []
    }

    while (true) {
        const lastSortedOrder = sorted[sorted.length - 1];

        if (!lastSortedOrder || lastSortedOrder.order_next === null) {
            break;
        }

        const nextOrder = orders.find(order => order.id === lastSortedOrder.order_next);
        sorted.push(nextOrder);
    }

    return sorted
}

export const computeOrderPosition = (orders: IOrder[] | Record<string, any>[], roi: number) => {
    const sortedBondOrders = sortOrders(orders as IOrder[])

    let position = '';
    if (sortedBondOrders.length === 0) {
        return position;
    }

    sortedBondOrders.forEach(order => {
        if (roi >= Number(order.debugRoi)) {
            position = order.id;
        }
    });

    return position;
}