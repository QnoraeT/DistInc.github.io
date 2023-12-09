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

function setupRocketUPGs() {
/**
 * 					<td id="rcupg1" class="furnChall"><br><b>Blue Flame does nothing.</b><br>Goal: <span id="fnc1goal"></span> Blue Flame<br><button id="fns1" class="btn fn" onclick="startFurnChall(1)"></button><br><br>Reward: Superscaled & Hyper Furnace Upgrade scalings are 90% weaker.<br><br></td>
 * 
 * 
 * 
 * function setupMltMilestoneTable() {
	let milestones = new Element("mltMilestoneTable");
	let data = "<table>";
	for (let r=1;r<=MLT_MILESTONE_NUM;r++) {
		let id = r-1;
		data += "<tr><td id='mltMil"+r+"1' class='mltTD'>Req: "+showNum(MLT_MILESTONES[id].req)+" Total Multiversal Energy</td>"
		data += "<td id='mltMil"+r+"2' class='mltTD'><span id='mltMil"+r+"desc'></span>"
		if (MLT_MILESTONES[id].effectDesc) data += "<br><br><span id='mltMil"+r+"effDesc'></span>"
		data += "</td>"
	}
	data += "</table>"
	milestones.setHTML(data);
}

* 	<button
        id="fnu3"
        class="btn locked"
        onclick="tmp.fn.upgs[3].buy()"
        style="min-height: 100px; max-height: 100px;"
    >
        Double Rocket gain<br />Cost: <span id="fnu3cost"></span> Coal<br /><span
            id="fnu3name"
        ></span
        >Level: <span id="fnu3lvl"></span>
    </button>
 */
}
