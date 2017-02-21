

export default class {
    
    constructor(connection) {
        this._proxy = connection.createHubProxy('verifid');
       
        this.on('ConnectEvent', (msg) => {
             window.document.dispatchEvent(
                 new CustomEvent('camera.connection.success', { 'detail': msg })
            );
        });

        this.on('DisconnectEvent', () => {
            window.document.dispatchEvent(
                 new CustomEvent('camera.connection.disconnected')
            );
        });

        this.on('ConnectionFailEvent', () => {
            window.document.dispatchEvent(
                 new CustomEvent('camera.connection.failed')
            );
        });

        this.on('ScanComplete', (msg) => {
            window.document.dispatchEvent(
                 new CustomEvent('camera.scan.success', { 'detail': msg })
            );
        });

        this.on('ScanFailed', () => {
            window.document.dispatchEvent(
                 new CustomEvent('camera.scan.failed')
            );
        })
    }

    on(event, callback) {
        return this._proxy.on(event, callback)
    }

    invoke(action, object) {
        return this._proxy.invoke(action, object);
    }

    getScannerInformation() {
        return this.invoke('GetScannerInformation');
    }

    isScannerConnect() {
        return this.invoke("IsScannerConnect");
    }

    startScan(identifier) {
        return this.invoke('StartScan', identifier);
    }

    stopScan() {
        return this.invoke('StopScan');
    }

}