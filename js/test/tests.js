var expect = chai.expect;

describe('Creación', function() {
    'use strict';

describe('Juego', function() {
    it('El Objeto Juego está definido', function(done) {
      if (expect(Juego).to.be.an('object')){ // cambio la comparacion !windows.Juego por expect
        done();
      }
      else{ 
        done(err);
      }
    });
});

describe('Tamaño de la grilla', function() {
    it('La grilla tiene el tamaño correcto', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadDePiezasPorLado = 3;
      Juego.construirPiezas();
      // se evalua si el tamaño de la grilla creada es correcto
      // si la cantidad de piezas del rompecabezas es igual a las establecidas en el array piezas, 
      // la grilla esta bien definida
      expect(Juego.piezas.length).to.equal(Juego.cantidadDePiezasPorLado * Juego.cantidadDePiezasPorLado);
    });
  });
describe('Posición Válida',function() {
  it('Posición  valida', function(){
    expect(Juego.posicionValida(2,2)).to.equal(true);
  });
  it('posicion no valida',function(){
    expect(Juego.posicionValida(5,7)).to.be.an('undefined');
  })
  it('string como parámetro' ,function(){
    expect(Juego.posicionValida(5)).to.be.an('undefined');
  })
});
});
