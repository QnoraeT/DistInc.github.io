function getFuelPow() {
	let pow = new ExpantaNum(1);
	if (player.tr.upgrades.includes(5) && !HCCBA("noTRU")) pow = pow.times(1.1);
	return pow
}

function getFreeFuel() {
	return tmp.tr ? tmp.tr.eff : new ExpantaNum(0);
}

function getFuelEff() {
	let rf = player.rf;
	if (modeActive("extreme") && rf.gte(10) && !player.rank.gt(2500)) rf = rf.log10().times(10);
	let trf = rf.plus(getFreeFuel()).times(getFuelPow());
	let eff 
	if (player.rank.gt(2500)) {
		eff = trf.add(1).root(7.5)
	} else {
		eff = trf.plus(1)
		.logBase(2)
		.plus(1)
		.pow(0.05);
	}
	// if (tmp.inf ? (tmp.inf.stadium.completed("infinity") && mltRewardActive(1)) : false) eff = eff.max(trf.plus(1).pow(0.1));
	if (modeActive("hard")) eff = eff.sub(0.08);
	if (modeActive('easy')) eff = eff.plus(0.012);
	if (tmp.inf) if (tmp.inf.stadium.completed("infinity")) eff = eff.sub(1).times(mltRewardActive(1)?10:2).add(1);
	if (nerfActive("noRF")) eff = new ExpantaNum(1);
	return eff;
}

function getFuelEff2() {
	let eff
	if (player.rank.gt(2500)) {
		eff = Decimal.pow(1.1, player.rf.pow(1.5).div(50)).mul(player.rf.add(1).pow(2))
	} else {
		eff = player.rf.sqrt().div(2).min(player.rockets.plus(1).times(10));
	}
	if (nerfActive("noRF")) eff = new ExpantaNum(0);
	return eff;
}

function updateTempRF() {
	if (!tmp.rf) tmp.rf = {};
	tmp.rf.bc = new ExpantaNum(25);
	if (modeActive("extreme")) tmp.rf.bc = new ExpantaNum(8);
	tmp.rf.fp = new ExpantaNum(1);
	let scalRF;
	scalRF = player.rf;
	scalRF = doAllScaling(scalRF, "rf", false);
	scalRF = tmp.rf.bc.times(ExpantaNum.pow(5, scalRF.div(tmp.rf.fp).pow(ROCKET_UPGS[1].eff()[0]))).round();
	tmp.rf.req = scalRF;
	scalRF = player.rockets.div(tmp.rf.bc).max(1).logBase(5).pow(Decimal.div(1, ROCKET_UPGS[1].eff()[0])).times(tmp.rf.fp);
	scalRF = doAllScaling(scalRF, "rf", true);
	scalRF = scalRF.plus(1).floor();
	tmp.rf.bulk = scalRF;
	tmp.rf.can = player.rockets.gte(tmp.rf.req);
	if (extremeStadiumActive("aqualon", 2)) tmp.rf.can = false;
	tmp.rf.layer = new Layer("rf", tmp.rf.can, "semi-forced");
	if (!tmp.rf.onReset) tmp.rf.onReset = function (prev) {
		if (player.tr.upgrades.includes(17) && !HCCBA("noTRU") && modeActive("extreme")) player.rockets = new ExpantaNum(prev.rockets);
		else if (tmp.ach[58].has) player.rockets = prev.rockets.div(2).max(10);
		else if (hasCollapseMilestone(3)) player.rockets = new ExpantaNum(10);
	};
	if (!tmp.rf.updateOnReset) tmp.rf.updateOnReset = function() { updateTempRF(); }
}
