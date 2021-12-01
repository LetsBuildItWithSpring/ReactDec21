import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function useData(arrayOfProperties = []){
    const [data, setData] = useState([]);
    const globalState = useSelector(state => state);
    useEffect(() => {
        arrayOfProperties.forEach(el => {
            const tempData =   globalState[el];
            setData([...data, tempData]);
       });
    }, [globalState]);
    return data;
}