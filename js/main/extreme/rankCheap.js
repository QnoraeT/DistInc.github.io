function getRankCheapEff() {
	if (extremeStadiumActive("flamis")) return new ExpantaNum(1)
	return player.rankCheap
		.times(tmp.rankCheap.manPow)
		.add(tmp.rankCheap.free)
		.times(tmp.rankCheap.pow)
		.sqrt()
		.add(1);
}

function getRankCheapEff2() {
	if (extremeStadiumActive("flamis")) return new ExpantaNum(1)
	return softcap(ExpantaNum.pow(
		2,
		player.rankCheap.times(tmp.rankCheap.manPow).add(tmp.rankCheap.free).times(tmp.rankCheap.pow)
	), "EP", 1, 1e100, 2.5);
}

function updateTempRankCheapCost(){
	tmp.rankCheap.fp = new ExpantaNum(1);
	if (extremeStadiumComplete("spectra")) tmp.rankCheap.fp = tmp.rankCheap.fp.times(EXTREME_STADIUM_DATA.spectra.effect())
	tmp.rankCheap.bc = new ExpantaNum(30);
		let scal;
		scal = player.rankCheap;
		scal = doAllScaling(scal, "rankCheap", false);
		scal = new ExpantaNum(tmp.rankCheap.bc).times(ExpantaNum.pow(2, scal.div(tmp.rankCheap.fp).max(1).sub(1).pow(2)));
		tmp.rankCheap.req = scal;
		scal = player.distance.div(tmp.rankCheap.bc).logBase(2).sqrt().add(1).times(tmp.rankCheap.fp);
		scal = doAllScaling(scal, "rankCheap", true);
		scal = scal.add(1).floor();
		tmp.rankCheap.bulk = scal;
}

function updateTempRankCheap() {
	if (!tmp.rankCheap) tmp.rankCheap = {};
	tmp.rankCheap.free = new ExpantaNum(0);
	if (tmp.ach[21].has) tmp.rankCheap.free = tmp.rankCheap.free.add(player.tier);
	if (tmp.ach[34].has) tmp.rankCheap.free = tmp.rankCheap.free.add(1);
	if (player.rf.gt(0)) tmp.rankCheap.free = tmp.rankCheap.free.add(player.furnace.upgrades[1].times(tmp.fn ? tmp.fn.upgPow : 1));
	if (extremeStadiumActive("cranius", 2)) tmp.rankCheap.free = tmp.rankCheap.free.div(10).floor();
	updateTempRankCheapCost()
	tmp.rankCheap.can = player.distance.gte(tmp.rankCheap.req);
	tmp.rankCheap.layer = new Layer("rankCheap", tmp.rankCheap.can, "semi-forced");
	tmp.rankCheap.pow = new ExpantaNum(1);
	if (tmp.ach[12].has) tmp.rankCheap.pow = tmp.rankCheap.pow.add(ExpantaNum.mul(0.5, player.achievements.length));
	if (player.tr.upgrades.includes(22) && !HCCBA("noTRU") && modeActive("extreme"))
		tmp.rankCheap.pow = tmp.rankCheap.pow.times(TR_UPGS[22].current());
	tmp.rankCheap.manPow = new ExpantaNum(1);
	if (tmp.fn) if (tmp.fn.enh.unl) tmp.rankCheap.manPow = tmp.rankCheap.manPow.add(ExpantaNum.mul(tmp.fn.enh.upg2eff, player.furnace.enhancedUpgrades[1].add(tmp.fn.enh.upgs[2].extra).times(tmp.fn.enh.upgPow)))
	tmp.rankCheap.eff = getRankCheapEff();
	tmp.rankCheap.eff2 = getRankCheapEff2();
	if (!tmp.rankCheap.onReset) tmp.rankCheap.onReset = function(prev) {
		if (tmp.ach[112].has) {
			player.distance = prev.distance;
			player.velocity = prev.velocity;
		}
	};
	if (!tmp.rankCheap.updateOnReset) tmp.rankCheap.updateOnReset = function() { updateTempRankCheapCost(); }
}