
import React, { useState, useEffect } from 'react';
import store from '../../state';

console.log(store.getState());

const MyAccount  = () => {
    const [deposit, setDeposit] = useState(0);
    const [balance, setBalance]= useState(0);
    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            setBalance(state);
        });
    }, [])
    const handleDeposit = () => {
        const action = {
            type: "deposit",
            payload: deposit,
        };
        store.dispatch(action);
    }

    const handleWithdraw = () => {
        // const action = () => {}
        const action = {
            type: "withdraw",
            payload: deposit
        }
        store.dispatch(action);
    }
    
    return <main id="my-acccount">
        <h1>MyAccount</h1>
        <h3>Current Balance: ${balance}</h3>
        <table>
            <tbody>
                <tr>
                    <td>
                        <input onChange={(event) => {
                            console.log(Number(event.currentTarget.value));
                            setDeposit(Number(event.currentTarget.value));
                        }} />
                    </td>
                    <td>
                        <button onClick={handleDeposit}>Deposit ${deposit}</button>
                    </td>
                    <td>
                            <button onClick={handleWithdraw}>Widthdraw ${deposit}</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <br />
        <button onClick={() => {
            console.log(store.getState());

        }}>GET LATEST STATE(BALANCE)</button>
    </main>
}

export default MyAccount;