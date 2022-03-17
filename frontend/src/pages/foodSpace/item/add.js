import React, { useEffect, useState } from 'react'
import BarcodeScannerComponent from "react-qr-barcode-scanner";


function add() {
    const [scan, setScan] = useState(false);
    const [logs, setLog] = useState([]);

    const barcodeScannerComponentHandleUpdate = (error, result) => {

        if (result) {
            window.navigator.vibrate(100);
            setLog([...logs, result.text]);
            setScan(false);
        }
    };



    return (
        <div className="App">
            <button onClick={() => setScan(true)}>SCAN</button>
            <button onClick={() => setScan(false)}>CANCEL</button>
            {scan && (
                <div className="w-full h-12">
                    <BarcodeScannerComponent
                        onUpdate={barcodeScannerComponentHandleUpdate}
                    />
                </div>
            )}
            <div>
                {logs.map((log) => (
                    <div key={log}>{log}</div>
                ))}

                <button onClick={() => setLog([])}>CLEAR</button>
            </div>


        </div>
    )
}

export default add