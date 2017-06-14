'use strict';

import React, { Component } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Actions } from 'react-native-router-flux';

var ScanScreen = React.createClass({

    render: function() {
        return (
            <QRCodeScanner onRead={() => {Actions.welcome()}}/>
        );
    },
});

module.exports = ScanScreen;