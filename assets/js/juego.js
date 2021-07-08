//Patron Modulo seguridad para mi codigo de JS
const miModulo = (() => {
    'use-strict'; 

    const cambiarNombreJP = () => {
        const nombreJugador = prompt("Nombre del Jugador", "Jugador");
        const h1Jugador = document.querySelector("#jp");
        h1Jugador.innerHTML = nombreJugador;
    }
    
    const cambiarNombreCPU = () =>{
        const jugadores = ['Pepe', 'Juan', 'Melissa', 'Julieta', 'Miguel', 'Pablo', 'Ricardo', 'Hernan', 'Fabio', 'Lucas'];
    
        const nombreCPU = jugadores[Math.floor(Math.random() * 8)];
        const h1Computadora = document.querySelector("#cpu");
        h1Computadora.innerHTML = nombreCPU;
    }
    
    cambiarNombreCPU();
    
    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];
    
    //Rferencias del HTML
    
    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          puntajeHTML = document.querySelectorAll('small');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          cambiarNombreJugador = document.querySelector('#cambiarNombreJugador');

    //Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) =>{

     deck = crearDeck();
     puntosJugadores = [];
     for(let i = 0; i < numJugadores; i++){
         puntosJugadores.push(0);
     }
        puntajeHTML.forEach(elemento => elemento.innerText = 0)
        divCartasJugadores.forEach(elemento => elemento.innerHTML = '');
    
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        cambiarNombreCPU();

    }
    
    //Esta funcion crea una nueva baraja
    const crearDeck = () =>{

        deck = [];
    
        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
        }
    
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
       
        return _.shuffle(deck);
    
    }
    
    //Esta funcion me permite tomar una carta
    const perdirCarta = () =>{
    
        if( deck.lenght === 0){
            throw 'No hay cartas en el deck';
        }
        
        return deck.pop();
    }
    
    //Esta funcion sirve para obtener el valor de la carta
    const valorCarta = ( carta ) => {
        //cortar el string
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
               (valor === 'A') ? 11 : 10
               : valor * 1;
    }


    //Turno: 0 = primer Jugador y el ultimo se´ra la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntajeHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) =>{

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/img/${carta}.png`;
        imgCarta.classList = 'carta';
        divCartasJugadores[turno].append(imgCarta);
    
    }

    const determinarGanador = () =>{

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout( () => {
            if(puntosMinimos === puntosComputadora){
                alert('Empate');
            }
            else if((puntosMinimos === 21 && puntosComputadora < 21) || (puntosMinimos <= 21 && puntosComputadora > 21)){
                alert('Haz ganado');
            }else{
                alert('Perdiste')
            }
        }, 100);
    }

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) =>{

        let puntosComputadora = 0;
    
        do{
        const carta = perdirCarta();
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
        crearCarta(carta, puntosJugadores.length - 1);
    
        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    
    }
    
  
    
    //Eventos
    btnPedir.addEventListener('click', () =>{

        const carta = perdirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
       crearCarta(carta, 0);
    
        if(puntosJugador > 21){
            alert('Te pasaste de 21');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0]);
        }else if (puntosJugador === 21){
            alert('Haz logrado el 21, Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0]);
        }
    
    });
    
    btnDetener.addEventListener('click', ()=>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        
        turnoComputadora(puntosJugadores[0]);
    });
    
    
    btnNuevo.addEventListener('click', ()=>{
      
        inicializarJuego();
      
        
    });

cambiarNombreJugador.addEventListener('click', ()=>{
    cambiarNombreJP();
});
//Retornas funciones que quieren que sea publicas 
// return {
//     nuevoJuego : inicializarJuego,
// }

})();