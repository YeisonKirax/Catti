$(function(){
    var audio = $('audio');
    function Grab(){
        $.ajax({
            url: '/escuchar',
            async: true

        }).done(function(grabaciones){
            var lista = $('.lista-grabaciones');
            lista.empty();
            grabaciones.forEach(function(grabacion){
                var nuevagrab =$('<li class="grabacion"'+' href='+grabacion.ruta +'download='+grabacion.nombre+'>'+grabacion.nombre+'</li>');
                nuevagrab
                    .on('click', grabacion, play)
                    .appendTo(lista);

            })

        }).fail(function(){
            alert('No se pudieron cargar las grabaciones');
        })
    }
    function play(evento){
        audio[0].pause();
        audio.attr('src', '/escuchar/' + evento.data.nombre);
        var playPromise = audio[0].play();
        if (playPromise !== undefined) {
            playPromise.then(function() {
                // Automatic playback started!
            }).catch(function(error) {
                // Automatic playback failed.
                // Show a UI element to let the user manually start playback.
            });
        }

    }
    Grab();
});