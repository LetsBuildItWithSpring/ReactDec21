import { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';

export function useData(property = []) {
    const state = useSelector(state => state[property]);
    return state;
}
// ['categories', 'balance', 'tweets']
export function useDataPro(properties = []) {
    const store = useStore();
    const data = {};
    const globalState = store.getState();
    let i = 0;
    while (i < properties.length) {
        const el = properties[i];
        data[el] = globalState[el];
        i = i + 1;
    }
    return data;
}