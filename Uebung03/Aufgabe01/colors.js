'use strict';

function changestyle() {

    var text = document.querySelector('#src');
    var ausgabetext = document.querySelector('#print');
    var random = Math.floor(Math.random()*16777215).toString(16);

    var button = document.querySelector('#mybutton');
    
    var farbe = '#' + random;
    
    ausgabetext.style['color'] = farbe;
    ausgabetext.style['font-size'] = '250px';
    ausgabetext.innerHTML= text.value;

    button.style['background-color'] = 'purple';
}