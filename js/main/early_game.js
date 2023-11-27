function calcAcceleration() {
	let thisName = "Acceleration"
	clearMultiList(thisName)
	let eff
	tmp.acc = new ExpantaNum(0.1);
	if (modeActive("hard")) {
		tmp.acc = tmp.acc.div(3);
		setMultiList(thisName, "Hard Mode Nerf", `${showNum(1 / 3)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (modeActive("easy")) {
		tmp.acc = tmp.acc.mul(2);
		setMultiList(thisName, "Easy Mode Buff", `${showNum(2)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.rank.gt(2)) {
		eff = rankEffects(2)
		tmp.acc = tmp.acc.mul(eff);
		setMultiList(thisName, "Rank 2 Reward", `1.1^${showNum(player.rank)} = ${showNum(eff)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.rank.gt(3)) {
		tmp.acc = tmp.acc.mul(2);
		setMultiList(thisName, "Rank 3 Reward", `${showNum(2)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.tier.gt(1) && player.rank.gte(3)) {
		tmp.acc = tmp.acc.mul(2);
		setMultiList(thisName, "Tier 1 Reward", `${showNum(2)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.rank.gt(4)) {
		eff = rankEffects(4)
		tmp.acc = tmp.acc.mul(eff);
		setMultiList(thisName, "Rank 4 Reward", `3^${showNum(player.tier)} = ${showNum(eff)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.rank.gt(5)) {
		eff = rankEffects(5)
		tmp.acc = tmp.acc.mul(eff);
		setMultiList(thisName, "Rank 5 Reward", `1.975^${showNum(player.rank)} = ${showNum(eff)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.rank.gt(10)) {
		tmp.acc = tmp.acc.mul(2);
		setMultiList(thisName, "Rank 10 Reward", `${showNum(2)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.tier.gt(3)) {
		tmp.acc = tmp.acc.mul(3);
		setMultiList(thisName, "Tier 3 Reward", `${showNum(3)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.rank.gt(14)) {
		eff = rankEffects(14)
		tmp.acc = tmp.acc.mul(eff);
		setMultiList(thisName, "Rank 14 Reward", `(${showNum(player.rf)} + 1)^1.6 = ${showNum(eff)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.rank.gt(15)) {
		tmp.acc = tmp.acc.mul(4);
		setMultiList(thisName, "Rank 15 Reward", `${showNum(4)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.tier.gt(5)) {
		tmp.acc = tmp.acc.mul(5);
		setMultiList(thisName, "Tier 5 Reward", `${showNum(5)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.rank.gt(25)) {
		tmp.acc = tmp.acc.mul(10);
		setMultiList(thisName, "Rank 25 Reward", `${showNum(10)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.rank.gt(50)) {
		tmp.acc = tmp.acc.mul(15);
		setMultiList(thisName, "Rank 50 Reward", `${showNum(15)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.tier.gt(8)) {
		tmp.acc = tmp.acc.mul(10);
		setMultiList(thisName, "Tier 8 Reward", `${showNum(10)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.tier.gt(10)) {
		tmp.acc = tmp.acc.mul(15);
		setMultiList(thisName, "Tier 10 Reward", `${showNum(15)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.rank.gt(75)) {
		tmp.acc = tmp.acc.mul(25);
		setMultiList(thisName, "Rank 75 Reward", `${showNum(25)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (player.tier.gt(15)) {
		tmp.acc = tmp.acc.mul(25);
		setMultiList(thisName, "Tier 15 Reward", `${showNum(25)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.ach) if (tmp.ach[12].has) {
		tmp.acc = tmp.acc.mul(1.1);
		setMultiList(thisName, "Achievement 12 Reward", `${showNum(1.1)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.ach) if (tmp.ach[22].has) {
		tmp.acc = tmp.acc.mul(1.05);
		setMultiList(thisName, "Achievement 22 Reward", `${showNum(1.05)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.ach) if (tmp.ach[23].has) {
		tmp.acc = tmp.acc.mul(1.2);
		setMultiList(thisName, "Achievement 23 Reward", `${showNum(1.2)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.ach) if (tmp.ach[14].has) {
		tmp.acc = tmp.acc.mul(1.5);
		setMultiList(thisName, "Achievement 14 Reward", `${showNum(1.5)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.ach) if (tmp.ach[32].has) {
		tmp.acc = tmp.acc.mul(1.8);
		setMultiList(thisName, "Achievement 32 Reward", `${showNum(1.8)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.ach) if (tmp.ach[35].has) {
		tmp.acc = tmp.acc.mul(1.8);
		setMultiList(thisName, "Achievement 35 Reward", `${showNum(1.8)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.ach) if (tmp.ach[105].has) {
		tmp.acc = tmp.acc.mul(4);
		setMultiList(thisName, "Achievement 105 Reward", `${showNum(4)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.ach) if (tmp.ach[24].has && modeActive("extreme")) {
		eff = ExpantaNum.pow(2, player.achievements.filter(x => x.toString().charAt(x.toString().length - 1) == 4).length)
		tmp.acc = tmp.acc.mul(eff);
		setMultiList(thisName, "Achievement 24 Reward", `${showNum(eff)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.maxVel && tmp.inf) if (tmp.inf.upgs.has("6;6")) {
		eff = INF_UPGS.effects["6;6"]()
		tmp.acc = tmp.acc.mul(eff);
		setMultiList(thisName, "Infinity Upgrade 6;6 Effect", `${showNum(eff)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.inf && tmp.timeSpeed) if (tmp.inf.upgs.has("4;7")) {
		eff = INF_UPGS.effects["4;7"]()
		tmp.acc = tmp.acc.mul(eff);
		setMultiList(thisName, "Infinity Upgrade 4;7 Effect", `${showNum(eff)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.rockets) {
		eff = tmp.rockets.accPow
		tmp.acc = tmp.acc.mul(eff);
		setMultiList(thisName, "Rocket Effect", `${showNum(eff)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (nerfActive("nerfAccel")) {
		tmp.acc = tmp.acc.pow(0.1);
		setMultiList(thisName, "Nerfed Acceleration", `^${showNum(0.1)}`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.inf && player.inf.derivatives.unl) {
		eff = (player.inf.derivatives.amts.acceleration
			? player.inf.derivatives.amts.acceleration
			: new ExpantaNum(0)
		).max(1)
		tmp.acc = tmp.acc.mul(eff);
		setMultiList(thisName, "Acceleration Derivative Bonus", `${showNum(eff)}x`, `${formatDistance(tmp.acc)}`)
	}
	if (modeActive("extreme") && tmp.acc.gte(4.4e126)) {
		eff = tmp.acc
		tmp.acc = softcap(tmp.acc, "P", 1, 4.4e126, 1.5)
		setMultiList(thisName, "Extreme Mode Softcap 1", `${formatDistance(eff)} at ${formatDistance(4.4e126)} is divided by ${showNum(eff.div(tmp.acc))} with ${showNum(100)}% power`, `${formatDistance(tmp.acc)}`)
	}
	if (modeActive("extreme") && tmp.acc.gte(Decimal.mul(Number.MAX_VALUE, DISTANCES.uni))) {
		eff = tmp.acc
		tmp.acc = softcap(tmp.acc, "P", 1, Decimal.mul(Number.MAX_VALUE, DISTANCES.uni), 2.5)
		setMultiList(thisName, "Extreme Mode Softcap 2", `${formatDistance(eff)} at ${formatDistance(Decimal.mul(Number.MAX_VALUE, DISTANCES.uni))} is divided by ${showNum(eff.div(tmp.acc))} with ${showNum(100)}% power`, `${formatDistance(tmp.acc)}`)
	}
	if (modeActive("extreme") && tmp.acc.gte("4.4e10026")) {
		eff = tmp.acc
		tmp.acc = softcap(tmp.acc, "P", 1, "4.4e10026", 2)
		setMultiList(thisName, "Extreme Mode Softcap 3", `${formatDistance(eff)} at ${formatDistance("1e10000")} is divided by ${showNum(eff.div(tmp.acc))} with ${showNum(100)}% power`, `${formatDistance(tmp.acc)}`)
	}
	if (extremeStadiumActive("nullum")) {
		tmp.acc = ExpantaNum.pow(10, tmp.acc.log10().mul(0.4 - 0.05 * (extremeStadDiffLevel("nullum") - 1)))
	}
	if (modeActive("hikers_dream") && tmp.hd) {
		tmp.acc = tmp.acc.pow(tmp.hd.inclineRed)
		setMultiList(thisName, "Hiker's Dream Penalty", `^${showNum(tmp.hd.inclineRed)}`, `${formatDistance(tmp.acc)}`)
	}
	if (tmp.acc.gte(Decimal.pow(DISTANCES.mlt, 10000000))) {
		tmp.acc = softcap(tmp.acc, "EP", 1, Decimal.pow(DISTANCES.mlt, 10000000), 4)
		setMultiList(thisName, "Softcap 1", `${formatDistance(tmp.acc)} at ${formatDistance(Decimal.pow(DISTANCES.mlt, 10000000))} is dilated by ^${showNum(tmp.acc.log(eff))} with ${showNum(100)}% power`, `${formatDistance(tmp.acc)}`)
	}
}

function calcMaxVelocity() {
	tmp.maxVel = new ExpantaNum(1);
	if (player.rank.gt(1)) tmp.maxVel = tmp.maxVel.add(1);
	if (modeActive("hard")) tmp.maxVel = tmp.maxVel.div(2);
	if (modeActive("easy")) tmp.maxVel = tmp.maxVel.mul(3);
	if (player.rank.gt(2)) tmp.maxVel = tmp.maxVel.mul(rankEffects(2));
	if (player.tier.gt(1) && player.rank.gte(3)) tmp.maxVel = tmp.maxVel.mul(5);
	if (player.rank.gt(4)) tmp.maxVel = tmp.maxVel.mul(rankEffects(4));
	if (player.rank.gt(5)) tmp.maxVel = tmp.maxVel.mul(rankEffects(5));
	if (player.rank.gt(8)) tmp.maxVel = tmp.maxVel.mul(rankEffects(8));
	if (player.rank.gt(14)) tmp.maxVel = tmp.maxVel.mul(rankEffects(14));
	if (player.rank.gt(55)) tmp.maxVel = tmp.maxVel.mul(rankEffects(55));
	if (player.tier.gt(9)) tmp.maxVel = tmp.maxVel.mul(tierEffects(9));
	if (tmp.pathogens && player.pathogens.unl) tmp.maxVel = tmp.maxVel.mul(tmp.pathogens[4].eff());
	if (tmp.ach) if (tmp.ach[21].has) tmp.maxVel = tmp.maxVel.mul(1.1);
	if (tmp.ach) if (tmp.ach[14].has) tmp.maxVel = tmp.maxVel.mul(1.5);
	if (tmp.ach) if (tmp.ach[24].has) tmp.maxVel = tmp.maxVel.mul(1.25);
	if (tmp.ach) if (tmp.ach[41].has) tmp.maxVel = tmp.maxVel.mul(1.5);
	if (tmp.ach) if (tmp.ach[51].has) tmp.maxVel = tmp.maxVel.mul(1.5);
	if (tmp.ach) if (tmp.ach[61].has) tmp.maxVel = tmp.maxVel.mul(1.6);
	if (tmp.inf && tmp.timeSpeed) if (tmp.inf.upgs.has("4;7")) tmp.maxVel = tmp.maxVel.mul(INF_UPGS.effects["4;7"]());
	if (tmp.inf) if (tmp.inf.upgs.has("7;7")) tmp.maxVel = tmp.maxVel.mul(INF_UPGS.effects["7;7"]()["ve"]);
	if (tmp.rockets) tmp.maxVel = tmp.maxVel.mul(tmp.rockets.mvPow);
	if (nerfActive("nerfMaxVel")) tmp.maxVel = tmp.maxVel.pow(0.1);
	if (extremeStadiumActive("nullum", 2)) tmp.maxVel = ExpantaNum.pow(10, tmp.maxVel.log10().mul(0.9 - 0.02 * (extremeStadDiffLevel("nullum") - 2)))
	if (modeActive("hikers_dream") && tmp.hd) tmp.maxVel = tmp.maxVel.pow(tmp.hd.inclineRed)
	if (mltActive(2)) tmp.maxVel = tmp.maxVel.root(1.3);
}

function calcAccelerationEnergy() {
	tmp.accEn = new ExpantaNum(0);
	if (tmp.inf) if (tmp.inf.upgs.has("7;7")) tmp.accEn = tmp.accEn.add(1).mul(INF_UPGS.effects["7;7"]()["ae"]);
	if (tmp.inf) if (tmp.inf.upgs.has("8;2")) tmp.accEn = tmp.accEn.mul(INF_UPGS.effects["8;2"]()["energy"]);
	if (tmp.inf) if (tmp.inf.upgs.has("9;1")) tmp.accEn = tmp.accEn.mul(INF_UPGS.effects["9;1"]());
	if (tmp.inf) if (tmp.inf.upgs.has("10;2")) tmp.accEn = tmp.accEn.mul(INF_UPGS.effects["10;2"]());
	if (tmp.inf && tmp.rockets) if (tmp.inf.upgs.has("5;8")) tmp.accEn = tmp.accEn.mul(tmp.rockets.accEnPow);
}

function updateTempEarlyGame() {
	calcAcceleration()
	calcMaxVelocity()
	calcAccelerationEnergy()
}
