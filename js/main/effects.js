function ach63SC() {
	let sc = new ExpantaNum(1e25);
	if (tmp.inf) if (tmp.inf.upgs.has("8;4")) sc = sc.mul(player.inf.pantheon.purge.power.add(1).pow(17));
	return sc;
}

function ach63Pow() {
	let pow = new ExpantaNum(1);
	if (tmp.ach) if (tmp.ach[74].has) pow = pow.mul(1.75);
	if (modeActive("easy")) pow = pow.mul(2);
	if (player.tr.upgrades.includes(24) && !HCCBA("noTRU") && modeActive("extreme")) pow = pow.mul(1.75);
	return pow;
}

function ach63Eff() {
	let sc = ach63SC();
	let pow = ach63Pow();
	let eff = tmp.timeSpeed ? tmp.timeSpeed.pow(0.025).pow(pow) : new ExpantaNum(1);
	if (eff.gte(sc)) eff = ExpantaNum.pow(10, softcap(eff.log(10), "EP", 1, sc.log(10), 4)); // exponent^2 rooted by 4
	if (player.elementary.sky.unl && tmp.elm) eff = eff.pow(tmp.elm.sky.pionEff[9]);
	return eff;
}

function ach112Pow() {
	let pow = new ExpantaNum(1);
	if (tmp.inf) if (tmp.inf.upgs.has("4;10")) pow = pow.mul(INF_UPGS.effects["4;10"]().max(1));
	return pow;
}

function ach112Eff() {
	let pow = ach112Pow()
	let eff = tmp.timeSpeed ? tmp.timeSpeed.log10().add(1).log10().add(1).pow(0.1).pow(pow) : new ExpantaNum(1);
	if (tmp.ach) if (tmp.ach[123].has) eff = tmp.timeSpeed ? tmp.timeSpeed.log10().add(1).pow(0.02).pow(pow).max(eff) : new ExpantaNum(1);
	if (eff.gte(1e160)) eff = softcap(eff, "E", 1, 1e160);
	if (eff.gte(Number.MAX_VALUE)) eff = softcap(eff, "EP", 1, Number.MAX_VALUE, 2);
	return eff;
}

function ach152Eff() {
	let eff = new ExpantaNum(1)
	if (tmp.ach) if (tmp.ach[152].has) eff = eff.mul(player.elementary.hc.best.add(1).pow(0.15));
	if (player.elementary.entropy.upgrades.includes(26) && tmp.elm.entropy) eff = eff.pow(tmp.elm.entropy.upgEff[26]);
	if (modeActive("extreme+hikers_dream")) {
		if (tmp.ach[196].has && tmp.mlt) eff = eff.mul(tmp.mlt.quilts[3].eff2)
	}
	return eff;
}
