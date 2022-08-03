const Ship = (name, coords) => {
    const shipCoords = coords; // ["x,y", ...]
    const hitCoords = new Set(); // ["x,y", ...]
    
    const getName = () => name;
    const getCoords = () => coords;

    const hit = (x, y) => {
        if (shipCoords.has(`${x},${y}`)){
            hitCoords.add(`${x},${y}`);
        };
    };

    const isSunk = () => {
        if (shipCoords.size > 0) {
            return shipCoords.size === hitCoords.size;
        };
    };

    return { getCoords, getName, hit, isSunk, hitCoords, shipCoords };
};