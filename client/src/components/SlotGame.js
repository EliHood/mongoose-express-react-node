import React, { useState } from 'react';
import Container from "react-bootstrap/Container";

function SlotGame() {
    var input = ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon'];
    var coins = 20, i = 0;
    var [cherryIndex, setCherryIndex] = useState(0);
    var [appleIndex, setAppleIndex] = useState(0);
    var [bananaIndex, setBananaIndex] = useState(0);
    var [lemonIndex, setLemonIndex] = useState(0);

    function getResult() {
        input.sort(() => Math.random() - 0.5)
        coins--;
        if (i == input.length) {
            console.log("reset input");
            i = 0;
            coins = 20;
            setCherryIndex(cherryIndex = 0)
            setAppleIndex(appleIndex = 0);
            setLemonIndex(lemonIndex = 0);
            setBananaIndex(bananaIndex = 0);
            console.log("i set to 0")
        }
        if (input[i] == 'cherry') {
            setCherryIndex(prevCherry => prevCherry + 1)
            setAppleIndex(appleIndex = 0);
            setLemonIndex(lemonIndex = 0);
            setBananaIndex(bananaIndex = 0);
            if (cherryIndex == 2) coins += 40;
            if (cherryIndex == 3) coins += 50;

        } else if (input[i] == 'apple') {
            setCherryIndex(cherryIndex = 0)
            setLemonIndex(lemonIndex = 0);
            setBananaIndex(bananaIndex = 0);
            setAppleIndex(prevApple => prevApple + 1)
            if (appleIndex == 2) coins += 10;
            if (appleIndex == 3) coins += 20;
        } else if (input[i] == 'banana') {
            setCherryIndex(cherryIndex = 0)
            setBananaIndex(prevBanana => prevBanana + 1)
            setLemonIndex(lemonIndex = 0);
            setAppleIndex(appleIndex = 0);
            if (bananaIndex == 2) coins += 15;
            if (bananaIndex == 3) coins += 5;
        } else if (input[i] == 'lemon') {
            setCherryIndex(cherryIndex = 0);
            setBananaIndex(bananaIndex = 0);
            setLemonIndex(prevBanana => prevBanana + 1);
            setAppleIndex(appleIndex = 0);
            if (lemonIndex == 3) coins += 3;
        }
        i++;
        console.log(coins);
    }
    return (
        <Container>
            <p>Keep clicking the play button</p>
            {cherryIndex == 3 ? <p className="border">3 cherries in a row: won 50 coins</p> : <p></p>}
            {cherryIndex == 2 ? <p className="border">2 cherries in a row: won 40 coins</p> : <p></p>}
            {appleIndex == 3 ? <p className="border">3 Apples in a row: won 20 coins</p> : <p></p>}
            {appleIndex == 2 ? <p className="border">2 Apples in a row: won 10 coins</p> : <p></p>}
            {bananaIndex == 3 ? <p className="border">3 Bananas in a row: won 15 coins</p> : <p></p>}
            {bananaIndex == 2 ? <p className="border">2 Bananas in a row: won 5 coins</p> : <p></p>}
            {lemonIndex == 3 ? <p className="border">3 lemons in a row: won 3 coins</p> : <p></p>}
            <button onClick={getResult}>Play</button>
        </Container>
    )
}

export default SlotGame
