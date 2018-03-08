// Muestra el contador de movimientos
Juego.mostarContador = function(){
	$("#mov-restantes").text(this.contadorDeMovimientos);
	$(".mov p").show();
    $('#mov-restantes').show();
}
$("#lightbox").click(function(){
	$(this).fadeOut();
})
$("#elegir-imagen .btn").click(function(){
	$("#lightbox").fadeIn();
});
$('.container-image img').click(function(e){		
	Juego.rutaImagen = e.target.src;
	$("#lightbox").fadeOut();
})
