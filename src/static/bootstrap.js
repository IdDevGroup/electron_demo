import jwt from 'jsonwebtoken';
import jQuery from 'jquery';

let countries = require('country-data').countries;

// need to add jquery to page
window.jQuery = jQuery;
import Connection from './signalr/Connection'
import Proxy from './signalr/VerifidProxy';

let connection = new Connection();
let proxy = new Proxy(connection);

let url = 'http://192.168.1.197:8070';

let $body = window.jQuery('#id_body');
let $bodySetup = $body.find('#id_setup');
let $bodySelect = $body.find('#id_select');
let $notify = window.jQuery('#id_notification');

let jwtString;
let jwtObject;

$bodySelect.find('#bnt_clear').click(e => {
    $bodySelect.find('#idType').val($bodySelect.find("#idType option:first").val()).change();
    $bodySelect.find('#input_id').val('');
}); 

$bodySelect.find('#bnt_verify').click(e => {
    let type = $bodySelect.find('#idType :selected').val();
    let value = $bodySelect.find('#input_id').val();

    if(type == 'ID Type') {
        return;
    }

    if(value == '') {
        return;
    }

    proxy.startScan({
        type: type,
        country: "US",
        value: value
    });
});

$bodySelect.find('#bntIdentityCheck').click(e => {
    proxy.startScan({
        type: "PASSPORT_CARD",
        country: "US",
        value: "C02857580"
    });
});

$bodySelect.find('#bntIdentityCheck2').click(e => {
    proxy.startScan({
        type: "PASSPORT",
        country: "US",
        value: "467448700"
    });
});

$bodySetup.find('#btnSetup').click(e => {
    jQuery.ajax({
        url: `${url}/setup`,
        dataType: 'json',
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({email: 'mdeterman@gmail.com', serial_number: '123456789'})
    }).done((obj) => {
        jwtString = obj.jwt;
        jwtObject = jwt.decode(jwtString, {complete: true});
        $bodySetup.addClass('hidden');
        bodySelect.removeClass('hidden');
    }).fail(() => {
        // console.log("failed");
    });
});

window.document.addEventListener('camera.connection.disconnected', e => {
    $notify.removeClass('success');
    $notify.addClass('error');
    $notify.html('Camera not connected. Please connect cammera to computer!');
    $bodySetup.find('#btnSetup').prop( "disabled", true );
    $bodySetup.find('#serial_number').val('');
});

window.document.addEventListener('camera.connection.success', e => {
    let camera = e.detail
    $notify.removeClass('error');
    $notify.addClass('success');
    $notify.html(`${camera.Name} camera is connected and ready.`);
    $bodySetup.find('#btnSetup').prop( "disabled", false );
    $bodySetup.find('#serial_number').val(camera.SerialNumber);
});

window.document.addEventListener('camera.scan.success', e => {
    alert(e.detail.status)
    console.log(e.detail)
});

window.onload = () => {
    //$bodySetup.removeClass('hidden');
    connection.start()
        .done(function () {
            
            console.log('Now connected, connection ID=' + connection.id);
            console.log("Connected, transport = " + connection.transportName);
        })
        .fail(function () { console.log('Could not connect'); });

    let select =  $bodySelect.find('#country');
    // jQuery.each(countries.all, (key, value) => {
    //     // console.log(`${value.name} ${value.status}`);
    //     // if(value.status)
    //     select.append(jQuery("<option/>", {
    //             value: value.alpha2,
    //             text: value.name
    //         }));
    // });
    
}