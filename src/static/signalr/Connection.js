
import jQuery from 'jquery';

// need to add jquery to page
window.jQuery = jQuery;
require('./jquery.signalR-2.2.1');

export default class {

    get id() { return this._connection.id }
    get transportName() { return this._connection.transport.name }

    constructor(options = { 
                url: 'http://127.0.0.1:3985/signalr',
                qs: { version: '0.0.1.0' }, 
                logging: true, 
                useDefaultPath: false 
            }) {
        this._connection = jQuery.hubConnection(options.url, 
            { 
                qs: options.qs, 
                logging: options.logging, 
                useDefaultPath: options.useDefaultPath 
            });

        this._connection.disconnected(() => {
            // debugger;
        });

        this._connection.reconnected(() => {
            // debugger;
        });

        this._connection.reconnecting(() => {
            // debugger;
        });

        // this._connection.connectionSlow(() => { });
        // this._connection.received(() => { });
        // this._connection.starting(() => { });
        // this._connection.stateChanged((change) => { });
    }

    createHubProxy(proxy) {
         return this._connection.createHubProxy(proxy)
    }

    start() {
        return this._connection.start();
    }
    
}