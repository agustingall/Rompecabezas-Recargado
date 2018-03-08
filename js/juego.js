var Juego = { // Creo el objeto literal
/*--------------------------------- Método de ordenamiento Top-Down ----------------------------------*/
//una vez elegido el nivel, se inicia el juego
  piezas : [],
  construirPiezas : function(){
      for (var y=0;y<this.cantidadDePiezasPorLado;y++){
        for (var x=0;x<this.cantidadDePiezasPorLado;x++){
          this.piezas.push({xActual:x,yActual:y,xOriginal:x,yOriginal:y});
        }
      }
    },

  inicia: function () {
     this.cantidadDePiezasPorLado = parseInt($('#cant-pieza').val());
     var cantMov = this.cantDeMovimientos();
     this.movimientosTotales = cantMov;
     this.contadorDeMovimientos = cantMov;
     // Se inicializa el contador
     this.mostarContador();
     this.actualizarContador = function(){
     $("#mov-restantes").text(this.contadorDeMovimientos)
     this.contadorDeMovimientos--;
    };
    // //se guarda el contexto en una variable para que no se pierda cuando se ejecute la funcion iniciarImagen (que va a tener otro contexto interno)
    var self = this;
    
    this.construirPiezas();
    // //se instancian los atributos que indican la posicion de las fila y columna vacias de acuerdo a la cantidad de piezas por lado para que sea la ultima del tablero
    this.posicionFilaVacia = this.cantidadDePiezasPorLado - 1;
    this.posicionColumnaVacia = this.cantidadDePiezasPorLado - 1;
    this.dibujarPiezaVacia = function(){
      this.ctx.fillStyle = '#fff';
      this.piezaVacia = this.ctx.fillRect(this.columnaPosicionVacia*this.anchoPiezas,
      this.filaPosicionVacia*this.altoPiezas,this.anchoPiezas,this.altoPiezas);
      
    };
    // //se espera a que este iniciada la imagen antes de construir las piezas y empezar a mezclarlas
    this.iniciarImagen(function () {
      
      self.dibujarPiezaVacia();
      //la cantidad de veces que se mezcla es en funcion a la cantidad de piezas por lado que tenemos, para que sea lo mas razonable posible.
      var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
      self.mezclarPiezas(cantidadDeMezclas);
      
    });
  },
  // Esta funcion devuelve la cantidad de piezas restantes en funcion a la dificultad marcada
  cantDeMovimientos : function(){
    var radioButtons = [$('#facil'),$('#normal'),$('#dificil')];
    var piezasPorLado = this.cantidadDePiezasPorLado;
    for(var i=0;i<3;i++){
      if (radioButtons[i].is(':checked')){
        //La cantidad de moviminetos será igual a 60 entre la dificultad
        return (60 * this.cantidadDePiezasPorLado / parseInt(radioButtons[i].val()) );
    }  
    }
    swal("¡Seleccionar una dificultad!", "Debes seleccionar una dificultad para jugar", "warning");
    navigator.reload();
  },
  cargarImagen: function (e) { //se carga la imagen del rompecabezas    
    //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600). 
    this.anchoPiezas = Math.floor( this.imagen.width/ this.cantidadDePiezasPorLado);
    this.altoPiezas = Math.floor( this.imagen.height/ this.cantidadDePiezasPorLado);
    // se obtiene el canvas y el contexto
    this.cvs = document.getElementById('contenedor-juego');
    // el contexto pasará a ser un atributo global en el objeto, para poder usarlo en otros métodos
    this.ctx = this.cvs.getContext('2d'); 
    // se establece el ancho y el alto del canvas en valor a la imagen
    this.cvs.height = this.imagen.height;      this.cvs.width = this.imagen.width;
    // Creo un arreglo que cargará pieza por pieza la imagen
    for(var y=0;y<=this.cantidadDePiezasPorLado;y++){
      for(var x=0;x<=this.cantidadDePiezasPorLado;x++){
      // Se dibuja pieza por pieza en el canvas
      this.ctx.drawImage(this.imagen,x*this.anchoPiezas,y*this.altoPiezas,this.anchoPiezas,
      this.altoPiezas,x*this.anchoPiezas,y*this.altoPiezas,this.anchoPiezas,this.altoPiezas);     
    }}
    
   },

  //funcion que carga la imagen
  imagen : new Image(),
  iniciarImagen: function (callback) {
    var self = this;
    //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
    this.imagen.addEventListener('load', function () {
      self.cargarImagen.call(self);
      callback();
    }, false);
    this.imagen.src = Juego.rutaImagen;
  },
  intercambiarPosiciones : function(yActual, xActual, destinoY, destinoX){
    //1. Encontrar el arreglo que contenga el xActual y el yActual y guardarlo en una variable
    for(let i=0;i<this.piezas.length;i++){
        if(this.piezas[i].xActual == xActual && this.piezas[i].yActual == yActual){
          // el arreglo se llamará piezaA haciendo referencia a piezaActual 

          var piezaA = this.piezas[i];
        }
      }
    //2. Encontrar el arreglo que contenga el destinoX y el destinoY    
    for(let i=0;i<this.piezas.length;i++){
        if(this.piezas[i].xActual == destinoX && this.piezas[i].yActual == destinoY){
          // El arreglo se llamará piezaD haciendo referencia a piezaDestino
          var piezaD = this.piezas[i];
        }
      }
    //3. Dibujar en el canvas las piezas que se intercambiaran
    this.ctx.fillRect(destinoX*this.anchoPiezas,destinoY*this.altoPiezas,this.anchoPiezas,this.altoPiezas);
      // se dibuja el cuadrado que representará a la pieza vacia
    this.ctx.drawImage(this.imagen,piezaD.xOriginal*this.anchoPiezas,piezaD.yOriginal*this.altoPiezas,this.anchoPiezas,
    this.altoPiezas,xActual*this.anchoPiezas,yActual*this.altoPiezas,this.anchoPiezas,this.altoPiezas);
    
    //4.  Guardar en un arreglo auxiliar el x e y Actual del arreglo encontrado
    var aux = {x:piezaA.xActual,y:piezaA.yActual};
    //5.  El x e y Actual será igual a destinoX e Y
    piezaA.xActual = destinoX;
    piezaA.yActual = destinoY;
    //6.  El destino x e y será igual al arreglo auxiliar
    piezaD.xActual = aux.x;
    piezaD.yActual = aux.y; 
    this.actualizarContador()},


  capturarTeclas :  function(){
    // captura las teclas dadas por el usuario
    $('body').keydown(function(evento){

      if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
        Juego.moverEnDireccion(evento.which);

        var gano = Juego.chequearSiGano();
        if(gano){
          Juego = undefined
          swal("¡Buen Trabajo!", "¡Has Ganado!", "success");
          setTimeout(function(){
          location.reload()
          },3000)
        }
        if(Juego.contadorDeMovimientos == 0){
          Juego.actualizarContador();
          swal("¡Perdiste!", "¡Te quedaste sin piezas!", "error");
          Juego = undefined;
          setTimeout(function(){
          location.reload()
          },3000)
        }
        evento.preventDefault();
      }
      });
  },
  
  moverEnDireccion : function(direccion){
    // Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
    // su posición con otro elemento
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    // Intercambia pieza blanca con la pieza que está arriba suyo
    if(direccion == 40){
      nuevaFilaPiezaVacia = this.posicionFilaVacia-1;
      nuevaColumnaPiezaVacia = this.posicionColumnaVacia;
    }
    // Intercambia pieza blanca con la pieza que está abajo suyo
    else if (direccion == 38) {
      nuevaFilaPiezaVacia = this.posicionFilaVacia+1;
      nuevaColumnaPiezaVacia = this.posicionColumnaVacia;

    }
    // Intercambia pieza blanca con la pieza que está a su izq
    else if (direccion == 39) {
      nuevaFilaPiezaVacia = this.posicionFilaVacia;
      nuevaColumnaPiezaVacia = this.posicionColumnaVacia-1;

    }
    // Intercambia pieza blanca con la pieza que está a su der
    else if (direccion == 37) {
      nuevaFilaPiezaVacia = this.posicionFilaVacia;
      nuevaColumnaPiezaVacia = this.posicionColumnaVacia+1;
    }

    // Se chequea si la nueva posición es válida, si lo es, se intercambia 
    if (this.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
      this.intercambiarPosiciones(this.posicionFilaVacia, this.posicionColumnaVacia,
      nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      this.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

    } },

  mezclarPiezas : function(veces){
    // Dada una cantidad de veces mezcla las piezas
    if(veces<=0){return;}
    var direcciones = [40, 38, 39, 37];
    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
    this.moverEnDireccion(direccion);
    var self = this;

    setTimeout(function(){
      Juego.mezclarPiezas(veces-1);
      // cada vez que se mezcla reseteo la cantidad de movimientos, para que solo decremente cuando el usuario intercambie las piezas
      self.contadorDeMovimientos = self.cantDeMovimientos();
    },100 / this.cantidadDePiezasPorLado);}, 
  
  chequearSiGano : function(){
    // Esta función va a chequear si el Rompecabezas está en la posición ganadora
    // Para chequear si gano comparo el array piezas y me fijo que las posiciones
    // acutales sean igual que las originales
    for(let i=0;i<this.piezas.length;i++){
      // si la pieza no tiene su posicion x e y original, el rompecabezas sigue desordenado
      if(this.piezas[i].xActual != this.piezas[i].xOriginal || this.piezas[i].yActual != this.piezas[i].yOriginal){
        return false;
      }
    }return true;}, 

  actualizarPosicionVacia : function(nuevaFila,nuevaColumna){ // Actualiza la posición de la pieza vacía
      this.posicionFilaVacia = nuevaFila;
      this.posicionColumnaVacia = nuevaColumna;},

  posicionValida : function(fila, columna){ 
    // Para chequear si la posicón está dentro de la grilla.
    if((fila < this.cantidadDePiezasPorLado && fila >= 0 ) && (columna < this.cantidadDePiezasPorLado && columna >= 0)){
      return true;
    } },
  
  iniciar : function(){
    if (this.rutaImagen != undefined){
    this.inicia(Juego.cantDeMovimientos());
    this.capturarTeclas();
    }
    else {
        swal("¡Seleccionar una Imagen!", 'Haz click en el boton "usar imagen prediseñada" ', "warning");
      }    
}
};
