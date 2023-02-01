"use strict";

console.log("Working");
/*
  Variables
*/

function c(txt) {
  console.log(txt);
}

function getElement(id, className) {
  if (className === undefined) {
    return document.getElementById(id);
  }

  return document.getElementsByClassName(className);
}

var ICHAMADO = getElement('ichamado'),
    ICLIENTE = getElement('icliente'),
    IDATA = getElement('idata'),
    IENDERECO = getElement('iendereco'),
    ICIDADE = getElement('icidade'),
    IESTADO = getElement('iestado'),
    ITIPO = getElement('itipo'),
    ITIPOoUTRO = getElement('itipoOutro'),
    IMOTIVO = getElement('imotivo'),
    IHORAIN = getElement('iHoraIn'),
    IHORAOUT = getElement('iHoraOut'),
    IDATAOUT = getElement('idataOut'),
    IESPACO = get;