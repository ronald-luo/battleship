const EventLoader = (() => {
    let plan = PlanPhase(Player(crypto.randomUUID()));

    const startPlanning = (() => {
        plan.renderData();

        document.addEventListener('click', () => {
            plan.renderData()
        })
    })();

    const rotateShip = (() => {
        document.querySelector('.rotate-button').addEventListener('click', plan.rotateShip);
    })();

    const returnHome = (() => {
        document.querySelector('h1').addEventListener('click', () => {
            window.location = '/';
        });
    })();

    return {
        startPlanning, rotateShip, returnHome,
    }

})();