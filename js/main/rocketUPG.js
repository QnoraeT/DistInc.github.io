function getRUPGEffective(x) {
    if (nerfActive("noRUs")) return new Decimal(0)
    let eff = player.rocketUPG[x].bought.mul(rUPGstrength(x, 1)).add(ROCKET_UPGS[x].extra().mul(rUPGstrength(x, 2))).mul(rUPGstrength(x, 0))
    return eff
}

function rUPGstrength(x, type = 0) {
    // type 0 = overall, 1 = bought, 2 = extra
    let str = new Decimal(1)
    if (!(type === 0 || type === 1 || type === 2)) throw new Error("type " + type + " is not valid!")
    switch(x){
        case 1:
            if (type == 0){

            } else if (type == 1){

            } else if (type == 2){
                
            }
            break;
        default:
            throw new Error("rocketUPG " + x + " does not exist!")
    }
    return str
}