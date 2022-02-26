

    const mute = document.getElementById('mute')
    const voice = document.getElementById('volume')

    const btnAudio = document.getElementById('btnAudio')

    let generalGameAudio = new Audio('./audio/assets_theme.mp3')

    

    voice.addEventListener('click', e => {
        generalGameAudio.play()
    })
    
    mute.addEventListener('click', e => {
        generalGameAudio.muted = true
    })
  
    

    let rotateAudio = new Audio('./audio/samples_rotate.mp3')
    let audioOver = new Audio('./audio/samples_gameover.mp3')
    let lineAudio = new Audio('./audio/samples_line.mp3')
    let landAudio = new Audio('./audio/samples_land.mp3')



    const boardWidth = 10 // constante de columnas del tablero
    const boardHeight = 20 // constante de filas del tablero


    let score = 0
    let displayNextRandom = 0


    const main = document.createElement('main'); // contenedor main
    // document.body.appendChild(main)
    // main.classList.add('main')

    const boardContainer = document.createElement('div') // constante contenedora de
    main.appendChild(boardContainer)
    boardContainer.classList.add('boardContainer')


    const displayContainer = document.createElement('div') //
    main.appendChild(displayContainer)
    displayContainer.classList.add('displayContainer')

    let squares = [];


    function generateBoardBlock() {
        const divGrid = document.createElement('div')
        divGrid.classList.add('divGrid')
        boardContainer.appendChild(divGrid)
        const divGridSon = document.createElement('div')
        divGridSon.classList.add('divGridSon')
        divGrid.appendChild(divGridSon)
    }

    function drawBoard(containerClass, width, height) {
        document.body.appendChild(containerClass)
        containerClass.classList.add('main')
        for (let i = 0; i < width * height; i++) {
            generateBoardBlock()
            squares.push(generateBoardBlock())
        }
    }

    function drawBoardFreeze() {
        for (i = 0; i < 10; i++) {
            const freezeDiv = document.createElement('div');
            freezeDiv.classList.add('freeze');
            const boardContainer = document.querySelector('.boardContainer')
            boardContainer.appendChild(freezeDiv)
        }
    }





    drawBoard(main, 10, 10)
    drawBoardFreeze()

    const tetrominioI = [
        [1, boardWidth + 1, boardWidth * 2 + 1, boardWidth * 3 + 1],
        [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth + 3],
        [1, boardWidth + 1, boardWidth * 2 + 1, boardWidth * 3 + 1],
        [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth + 3,],

    ]

    const tetrominioJ = [

        [1, boardWidth + 1, boardWidth * 2 + 1, 2],
        [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth * 2 + 2],
        [1, boardWidth + 1, boardWidth * 2 + 1, boardWidth * 2],
        [boardWidth, boardWidth * 2, boardWidth * 2 + 1, boardWidth * 2 + 2],

    ]

    const tetrominioS = [
        [boardWidth + 1, boardWidth + 2, boardWidth * 2, boardWidth * 2 + 1],
        [0, boardWidth, boardWidth + 1, boardWidth * 2 + 1],
        [boardWidth + 1, boardWidth + 2, boardWidth * 2, boardWidth * 2 + 1],
        [0, boardWidth, boardWidth + 1, boardWidth * 2 + 1],
    ]


    const tetrominioZ = [
        [boardWidth, boardWidth + 1, boardWidth * 2 + 1, boardWidth * 2 + 2],
        [2, boardWidth + 2, boardWidth + 1, boardWidth * 2 + 1],
        [boardWidth, boardWidth + 1, boardWidth * 2 + 1, boardWidth * 2 + 2],
        [2, boardWidth + 2, boardWidth + 1, boardWidth * 2 + 1],
    ]

    const tetrominioL = [
        [0,boardWidth,boardWidth *2, boardWidth * 2 +1],
        [0, 1, boardWidth + 1, boardWidth * 2 + 1],
        [boardWidth * 2, boardWidth * 2 + 1, boardWidth * 2 + 2, boardWidth + 2],
        [0, boardWidth, boardWidth * 2, boardWidth * 2 + 1],
    ]

    const tetrominioO = [
        [0, 1, boardWidth, boardWidth + 1],
        [0, 1, boardWidth, boardWidth + 1],
        [0, 1, boardWidth, boardWidth + 1],
        [0, 1, boardWidth, boardWidth + 1],
    ]


    const tetrominioT = [
        [boardWidth, boardWidth + 1, boardWidth + 2, 1],
        [boardWidth + 1, +1, boardWidth + 2, boardWidth * 2 + 1],
        [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth * 2 + 1],
        [boardWidth, boardWidth + 1, 1, boardWidth * 2 + 1],
    ]




    const tetrominos = [tetrominioJ, tetrominioI, tetrominioS, tetrominioZ, tetrominioL, tetrominioO, tetrominioT];





    let squaresSelection = Array.from(document.querySelectorAll('.boardContainer > div'));  // NECESITO METER LOS DIVS EN UN ARRAY PARA PODER BORRAR LAS FILAS DESPUES

    let currentPos = 4 // POSICION EN LA QUE SE INICIA LA PIEZA EN EL TABLERO
    let currentRotation = 0 // ROTACION EN LA QUE SE INICIA LA PIEZA EN EL TABLERO

    let random = Math.floor(Math.random() * tetrominos.length) //FUNCION QUE ELIGE UN TETROMINO RANDOM
    let current = tetrominos[random][currentRotation] // TETROMINO ELEGIDO DEL RANDOM CON SU ROTACION
    console.log(current)

    function drawTetromino() { // FUNCION QUE DIBUJA EL TETROMINO EN EL TABLERO
        current.forEach(index => {  // RECORRO CADA TETROMINO Y LO PONGO EN LA POSICION QUE LE CORRESPONDE EN EL TABLERO Y LE AÑADO UNA CLASE PARA PODER PODER PINTAR EL TETROMINO DANDOLE LA OPACIDAD
            squaresSelection[currentPos + index].classList.add('tetronimoDrawed')
        })
    }

    drawTetromino()

    function undrawTetromino() { // FUNCION IGUAL QUE LA DE DIBUJAR PERO ESTA BORRA, EN VEZ DE AÑADIR LA CLASE PINTADA LAS BORRA, SERVIRA PARA PODER HACER QUE EL TETROMINO PUEDA BAJAR POR EL TABLERO SIN PINTAR EL TABLERO ENTERO
        current.forEach(index => {
            squaresSelection[currentPos + index].classList.remove('tetronimoDrawed')
        })
    }

    function createDisplayContain() { // FUNCION QUE CREA EL MINI DISPLAY
        const displayContaiener = document.querySelector('.displayContainer')

        const header = document.createElement('header');
        header.classList.add('header-mini');


        const divHeader = document.createElement('div');
        divHeader.classList.add('score-title')
        const pDiv = document.createElement('p');
        pDiv.textContent = "Score"




        const div2Header = document.createElement('div');
        div2Header.classList.add('score')
        const pDiv2 = document.createElement('p')
        pDiv2.setAttribute('id', 'score')
        pDiv2.textContent = "0";


        const miniBoardContainer = document.createElement('div')
        miniBoardContainer.classList.add('mini-board-container')

        const footer = document.createElement('footer')
        footer.classList.add('footer-display');

        const divFooter = document.createElement('div')
        divFooter.classList.add('flechas-move')
        const pFooter = document.createElement('p');
        pFooter.textContent = "flechas move"

        const div2footer = document.createElement('div')
        div2footer.classList.add('flechas-rotate');
        const p2footer = document.createElement('div')
        p2footer.textContent = "flechas rotate"

        header.appendChild(divHeader)
        header.appendChild(div2Header)
        divHeader.appendChild(pDiv)
        div2Header.appendChild(pDiv2)

        footer.appendChild(divFooter)
        footer.appendChild(div2footer)
        divFooter.appendChild(pFooter)
        div2footer.appendChild(p2footer)

        displayContaiener.appendChild(header);
        displayContaiener.appendChild(miniBoardContainer)
        displayContaiener.appendChild(footer)

        const main = document.querySelector('.main');
        main.appendChild(displayContaiener)

    }


    function createDivsDisplay() { // FUNCION QUE CREA LOS DIVS DONDE SE VAN A MOSTRAR LOS SIGUIENTES

        for (i = 0; i < 16; i++) {
            const miniBoardContainer = document.querySelector('.mini-board-container')
            const divs = document.createElement('div')
            divs.classList.add('divGrid');

            const divInDisplay = document.createElement('div');
            divInDisplay.classList.add('divGridSon')
            divs.appendChild(divInDisplay)

            miniBoardContainer.appendChild(divs)
        }
    }

    createDisplayContain()
    createDivsDisplay()


    const miniDisplay = document.querySelectorAll('.mini-board-container > div') // SELECCIONO TODOS LOS DIVS DE LA PANTAÑÑA

    let displayWidth = 4 
    let displayIndex = 0


    const displayTetrominos = [ // ESTOS SON LOS TETROMINOS DE LA PANTALLA PEQUEÑA
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // Tetromino I
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], // Tetromino J
        [displayWidth + 1, displayWidth + 2, displayWidth * 2, displayWidth * 2 + 1], // Tetromino S
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // Tetromino Z
        [0,displayWidth,displayWidth *2, displayWidth * 2 +1], // TETROMINO L
        [0, 1, , displayWidth, , displayWidth + 1], // Tetromino O
        [1, , displayWidth + 1, displayWidth + 2, displayWidth], // Tetromino T  
    ]

    function drawNext() { // FUNCION QUE ME DIBUJA EL SIGUIENTE TETROMINO, ESTA FUNCION LA LLAMO EN EL IS GAME OVER
        miniDisplay.forEach(square => { // RECORRO LOS DIVS DEL DISPLAY Y LES TENGO QUE BORRAR LA CLASE DEL TEROMINO PINTADO PARA PODER ACTUALIZAR LA PANTALLA
            square.classList.remove('tetronimoDrawed');
        })
        displayTetrominos[displayNextRandom].forEach(index => { //ESTO ES LO MISMO QUE LA FUNCION DE PINTAR EL TETROMINO, LA DIFERENCIA ES QUE CREO UNA NUEVA VARIABLE QUE ME VA A INDICAR EL SIGUIENTE TETROMINO RANDOM
            miniDisplay[displayIndex + index].classList.add('tetronimoDrawed') // Y AQUI SE DIBUJA EL TETROMINO AÑADIENDO LA CLASE PINTADO
        })
    }

   
    
        

    function gameLoop() {
        

        timerId = setInterval(moveDown, 1000) // TIMER QUE TIENE LA FUNCION MOVEDOWN QUE HACE QUE LA PIEZA CAIGA HASTA ABAJO DEL TODO EN 1000MS

        function control(e) { // FUNCIONES QUE DAN FUNCIONALIDAD A LAS TECLAS Y PODER MOVER EL TETROMINO
            if (e.keyCode === 40) { 
                moveDown()
            } else if (e.keyCode === 39) {
                moveRight()
            } else if (e.keyCode === 37) {
                moveLeft()
            } else if (e.keyCode === 38) {
                rotation()
            }
        }

        document.addEventListener('keydown', control)

        function moveDown() { // FUNCION PARA MOVER HACIA ABAJO
            undrawTetromino() // HAY QUE BORRAR EL TETROMINO PRIMERO PARA QUE NO SE PINTE TODO EL TABLERO
            currentPos += boardWidth // LUEGO SE LE SUMA 10 A LA POSICION ACTUAL, ES 10 PORQUE EL TABLERO MIDE 10 DIVS DE ANCHO(SI LA POSICION INICIAL ES 4, CUANDO BAJE VA A SER 14, LUEGO 24, ASI SUCCESIVAMENTE)
            drawTetromino()//SE VUELVE A DIBUJAR EL TETROMINO
            isGameOver() // Y SE AÑADE LA FUNCION PARA QUE HAGA TOPE 

        }



        function moveRight() {
            undrawTetromino()
            const rightEdge = current.some(index => (currentPos + index) % boardWidth === boardWidth - 1) // CONSTANTE QUE DETECTA QUE SI HA LLEGO AL LADO DERECHO DEL TABLERO NO PUEDE AVANZAR MAS

            if (!rightEdge) currentPos += 1 // SI NO ES ASI, SE SUMA 1 LA POSICION HACIA LA DERECHA

            if (current.some(index => squaresSelection[currentPos + index].classList.contains('freeze'))) {
                currentPos -= 1 // TAMBIEN DETECTA SI ALGUN TETROMINO TIENE LA CLASE QUE CONGELA LA PIEZA TAMPOCO PUEDE MOVERSE
            }
            drawTetromino()
        }

        function moveLeft() {
            undrawTetromino()
            const leftEdge = current.some(index => (currentPos + index) % boardWidth === 0) // LO MISMO QUE LA DERECHA PERO ALREVES

            if (!leftEdge) currentPos -= 1

            if (current.some(index => squaresSelection[currentPos + index].classList.contains('freeze'))) {
                currentPos += 1
            }
            drawTetromino()
        }

        function rotation() {
            undrawTetromino() 
            currentRotation++ // SI LE DAS A LA TECLA DE ROTAR, SE SUMA 1 A LA ROTACION, EMPIEZA EN 0

            if (currentRotation === current.length) {  // SI YA SE HA SUMADO HASTA QUE ES IGUAL QUE EL NUMERO DE ROTACIONES, SE ESTABLEZE OTRA VEZ EN 0
                currentRotation = 0
            }

            current = tetrominos[random][currentRotation] // AQUI SE DIBUJA EL TETROMINO CON SU RESPECTIVA ROTACION

            drawTetromino()

            rotateAudio.play()
        }

        function isGameOver() { // FUNCION QUE DEJA LAS PIEZAS CLAVADAS
            if (current.some(index => squaresSelection[currentPos + index + boardWidth].classList.contains('freeze'))) { // SI ALGUN TETROMINO ENTRA EN CONTACTO CON UN DIV CON LA CLASE FREEZE, YA NO AVANZA MAS
                current.forEach(index => squaresSelection[currentPos + index].classList.add('freeze')) // ENTONCES SI SE CUMPLE SE LE AÑADE LA CLASE QUE LO VA A DEJAR PARADO
    
                random = displayNextRandom // CUANDO LA PIEZA YA SE LE HA AÑADIDO LA CLASE Y SE HA PARADO, SE GENERA OTRO TETROMINO RANDOM COMO SE HA HECHO ANTES INDICANDOLE LA POSICION INICIAL
                displayNextRandom = Math.floor(Math.random() * tetrominos.length) 
                current = tetrominos[random][currentRotation]
                currentPos = 4
    
                drawTetromino() 
                drawNext()
                updateTetrisBoard()
                gameOver()
                lvlUp()
                landAudio.play()
            }
    
        }

        function updateTetrisBoard() {
            for (i = 0; i < 199; i += boardWidth) { // AQUI I VA A VALER EL ANCHO DEL BOARD HASTA 199, QUE ES LA ULTIMA FILA
                const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9] // CONSTANTE QUE INDICA QUE ES UNA FILA 
                const rowFour = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9, i + 10, i + 11, i + 12, i + 13, i + 14, i + 15, i + 16, i + 17, i + 18, i + 19, i + 20, i + 21, i + 22, i + 23, i + 24, i + 25, i + 26, i + 27, i + 28, i + 29, i + 30, i + 31, i + 32, i + 33, i + 34, i + 35, i + 36, i + 37, i + 38, i + 39]

                if (row.every(index => squaresSelection[index].classList.contains('freeze'))) { // SI TODA LA FILA CONTIENE LA CLASE FREEZE PASA LO SIGUIENTE
                    score += 50 // SE SUMA EL SCORE 50 PUNTOS
                    const scoreNumber = document.getElementById('score');
                    const scoreContent = `
                        <p>${score}</p>
                    `
                    scoreNumber.innerHTML = scoreContent // INTRODUZCO EL SCRORE DENTRO DEL HTML
                    row.forEach(index => {
                        squaresSelection[index].classList.remove('freeze'); // A CADA FILA LE BORRO SU CLASE FREEZE
                        squaresSelection[index].classList.remove('tetronimoDrawed') // Y TAMBIEN LE BORRO LA CLASE PINTADA
                    })
                    const squareRemoved = squaresSelection.splice(i, boardWidth) // ESTO VA A SELECCIONAR UNA FILA COMPLETA Y CON EL SPLICE REEMPLAZAMOS LE FILA BORRADA POR EL ARRAY QUE NO ESTA BORRADO EN ESTE CASO ENCIMA
                    squaresSelection = squareRemoved.concat(squaresSelection) // AQUI A LA FILA SELECCIONADA LA BORRA
                    squaresSelection.forEach(c => boardContainer.appendChild(c)) // Y AQUI QUEREMOS QUE LA FILA BORRADA,SEA OCUPADA OTRA VEZ, ASI QUE SELECCIONO TODAS Y LES HAGO HIJOS DEL CONTENEDOR
    
                    lineAudio.play()
                }else if (rowFour.every(index => squaresSelection[index].classList.contains('freeze'))){
                    score += 1000
                    const scoreNumber = document.getElementById('score');
                    const scoreContent = `
                        <p>${score}</p>
                    `
                    scoreNumber.innerHTML = scoreContent
                    rowFour.forEach(index => {
                        squaresSelection[index].classList.remove('freeze');
                        squaresSelection[index].classList.remove('tetronimoDrawed')
                    })
                 
                }
            }
        }
    
        updateTetrisBoard()
    
        function lvlUp() {
            if (score > 50) {
                timerId = setInterval(moveDown, 980)
            } else if (score > 150) {
                timerId = setInterval(moveDown, 970)
            } else if (score > 300) {
                timerId = setInterval(moveDown, 960)
            } else if (score > 500) {
                timerId = setInterval(moveDown, 950)
            }
    
        }
    
    
    
    
    
        function gameOver() { //FUNCION QUE ACABA EL JUEGO
            if (current.some(index => squaresSelection[currentPos + index].classList.contains('freeze'))) { // SI DONDE SE INICIA LA PIEZA EN EL TABLERO, CONTIENE LA CLASE QUE PARA EL TETROMINO SE ACABA EL JUEGO
    
                const scoreNumber = document.getElementById('score');
                const scoreContent = `<p>End</p>` // SE PONE EN LA PANTALLA PEQUEÑA QUE HA ACABADO EL JUEGO
                scoreNumber.innerHTML = scoreContent 
                clearInterval(timerId) // SE LIMPIA EL INTERVAL
                audioOver.play()
                landAudio.muted = true
                generalGameAudio.muted = true
    
            }
        }
    
        
    }
    gameLoop()










    //.score





   






