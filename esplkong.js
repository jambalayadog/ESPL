function buytb(amount) {
    if (amount == 'pack1') {
        player.purchases[0] = 0;
        player.purchases[1] = 0;
        player.purchases[2] = 0;
        player.purchaseBoostMultiplier = 1;
    } else if (amount == 'pack2') {
        player.purchases[1] += 1;
        player.purchaseBoostMultiplier = 1e10;
    } else if (amount == 'pack3') {
        player.purchases[2] += 1;
        player.purchaseBoostMultiplier += 5600;
    } else {
        console.log('error');
    }
    saveGame();
    console.log(amount, player.purchaseBoostMultiplier, player.purchases);
    let ele = document.getElementById('purchasedBoostMultiplier');
    ele.innerHTML = player.purchaseBoostMultiplier + 'x';
}