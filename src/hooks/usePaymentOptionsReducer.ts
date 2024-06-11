import { PaymentOptions } from "@/types/PaymentOptions";
import { useReducer } from "react";

function reducer(state: PaymentOptions, newState: PaymentOptions): PaymentOptions {
    return { ...state, ...newState };
}

export function usePaymentOptionsReducer() {
    return useReducer(reducer, {
        theme: 'based',
        emoji: '😎'
    });
}
