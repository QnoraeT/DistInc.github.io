function updateTempTimeSpeed() {
	let thisName = "Time Speed"
	clearMultiList(thisName)
	let eff
	tmp.timeSpeed = new ExpantaNum(1);
	if (modeActive("hard")) {
		tmp.timeSpeed = tmp.timeSpeed.mul(0.75);
		setMultiList(thisName, "Hard Mode Nerf", `${showNum(0.75)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (modeActive("easy")) {
		tmp.timeSpeed = tmp.timeSpeed.mul(2);
		setMultiList(thisName, "Easy Mode Buff", `${showNum(2)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (modeActive("extreme")) {
		tmp.timeSpeed = tmp.timeSpeed.div(0.75);
		setMultiList(thisName, "Extreme Mode Buff", `${showNum(4 / 3)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tr.upgrades.includes(2) && !HCCBA("noTRU")) {
		eff = tr2Eff()
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Time Reversal Upgrade 2", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tr.upgrades.includes(7) && !HCCBA("noTRU")) {
		eff = tr7Eff()
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Time Reversal Upgrade 7", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tr.upgrades.includes(18) && !HCCBA("noTRU") && modeActive("extreme")) {
		eff = TR_UPGS[18].current()
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Time Reversal Upgrade 18", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tr.upgrades.includes(23) && !HCCBA("noTRU") && modeActive("extreme")) {
		eff = TR_UPGS[23].current()
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Time Reversal Upgrade 23", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.ach[17].has) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.01);
		setMultiList(thisName, "Achievement 17 Reward", `${showNum(1.01)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.ach[27].has) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.1);
		setMultiList(thisName, "Achievement 27 Reward", `${showNum(1.1)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.ach[47].has) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
		setMultiList(thisName, "Achievement 47 Reward", `${showNum(1.5)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.ach[18].has) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
		setMultiList(thisName, "Achievement 18 Reward", `${showNum(1.5)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.ach[52].has) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.2);
		setMultiList(thisName, "Achievement 52 Reward", `${showNum(1.2)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.ach[57].has) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.1);
		setMultiList(thisName, "Achievement 57 Reward", `${showNum(1.1)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.ach[67].has) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.111);
		setMultiList(thisName, "Achievement 67 Reward", `${showNum(1.111)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(35)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
		setMultiList(thisName, "Rank 35 Reward", `${showNum(1.5)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(45)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.8);
		setMultiList(thisName, "Rank 45 Reward", `${showNum(1.8)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(70)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.4);
		setMultiList(thisName, "Rank 70 Reward", `${showNum(1.4)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(80)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
		setMultiList(thisName, "Rank 80 Reward", `${showNum(1.5)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(90)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.75);
		setMultiList(thisName, "Rank 90 Reward", `${showNum(1.75)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(125)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
		setMultiList(thisName, "Rank 125 Reward", `${showNum(1.5)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(150)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.55);
		setMultiList(thisName, "Rank 150 Reward", `${showNum(1.55)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(175)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.6);
		setMultiList(thisName, "Rank 175 Reward", `${showNum(1.6)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(200)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.7);
		setMultiList(thisName, "Rank 200 Reward", `${showNum(1.7)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(250)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.8);
		setMultiList(thisName, "Rank 250 Reward", `${showNum(1.8)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(300)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.9);
		setMultiList(thisName, "Rank 300 Reward", `${showNum(1.9)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(500)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.95);
		setMultiList(thisName, "Rank 500 Reward", `${showNum(1.95)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(1000)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.98);
		setMultiList(thisName, "Rank 1000 Reward", `${showNum(1.98)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.rank.gt(10000)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(2);
		setMultiList(thisName, `Rank ${showNum(10000)} Reward`, `${showNum(2)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tier.gt(6)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
		setMultiList(thisName, "Tier 6 Reward", `${showNum(1.5)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tier.gt(7)) {
		eff = tierEffects(7)
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Tier 7 Reward", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tier.gt(16)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.6);
		setMultiList(thisName, "Tier 16 Reward", `${showNum(1.6)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tier.gt(18)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(1.8);
		setMultiList(thisName, "Tier 18 Reward", `${showNum(1.8)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tier.gt(20)) {
		tmp.timeSpeed = tmp.timeSpeed.mul(2);
		setMultiList(thisName, "Tier 20 Reward", `${showNum(2)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (getCadaverEff().gt(1)) {
		eff = getCadaverEff();
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Cadaver Effect", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (hasCollapseMilestone(1)) {
		eff = collapseMile1Eff()
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		new ExpantaNum(100).div(player.distance.plus(1).pow(0.06989).plus(1).min(50))
		setMultiList(thisName, "Cadaver Milestone 1 Effect", `100 / min(50, 1 + ${showNum(player.distance)}^0.06989) = ${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (hasCollapseMilestone(2)) {
		eff = modeActive("extreme") ? 2 : 5
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Cadaver Milestone 2 Effect", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.inf.upgs.has("1;1")) {
		eff = INF_UPGS.effects["1;1"]()
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Infinity Upgrade 1;1 Effect", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.inf.upgs.has("7;7")) {
		eff = INF_UPGS.effects["7;7"]()["ts"]
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Infinity Upgrade 7;7 Effect", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.inf.upgs.has("9;4")) {
		eff = INF_UPGS.effects["9;4"]()
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Infinity Upgrade 9;4 Effect", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.inf.stadium.completed("eternity")) {
		eff = STADIUM_REWARDS.effects.eternity()
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Eternity's Completion Effect", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tr.upgrades.includes(34) && !HCCBA("noTRU") && modeActive("extreme")) {
		eff = TR_UPGS[34].current()
		tmp.timeSpeed = tmp.timeSpeed.mul(eff)
		setMultiList(thisName, "Time Reversal Upgrade 34", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (nerfActive("nerfTS")) {
		tmp.timeSpeed = tmp.timeSpeed.pow(0.1);
		setMultiList(thisName, "Nerfed Time Speed", `^${showNum(0.1)}`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.tr.upgrades.includes(30) && !HCCBA("noTRU") && modeActive("extreme")) {
		eff = TR_UPGS[30].current()
		tmp.timeSpeed = tmp.timeSpeed.pow(eff);
		setMultiList(thisName, "Time Reversal Upgrade 30", `log(10(1 + log(${showNum(player.pathogens.amount.add(1))}))) ^ 0.3 = ^${showNum(eff)}`, `${showNum(tmp.timeSpeed)}`)
	}
	if (tmp.rockets && tmp.inf.upgs.has("10;3")) {
		eff = tmp.rockets.tsPow
		tmp.timeSpeed = tmp.timeSpeed.mul(eff)
		setMultiList(thisName, "Rocket Effect", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (player.mlt.times.gt(0) && tmp.mlt) {
		eff = tmp.mlt.quilts[1].eff
		tmp.timeSpeed = tmp.timeSpeed.mul(eff);
		setMultiList(thisName, "Multiverse Quilt 1 Effect", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (modeActive("extreme") && tmp.timeSpeed.gte(Number.MAX_VALUE)) {
		eff = tmp.timeSpeed
		tmp.timeSpeed = softcap(tmp.timeSpeed, "P", (player.tr.upgrades.includes(31) && !HCCBA("noTRU")) ? 0.45 : 1, Number.MAX_VALUE, 2)
		setMultiList(thisName, "Extreme Mode Softcap 1", `${showNum(eff)} at ${showNum(Number.MAX_VALUE)} is divided by ${showNum(eff.div(tmp.timeSpeed))} with ${showNum(100 * ((player.tr.upgrades.includes(31) && !HCCBA("noTRU")) ? 0.45 : 1))}% power`, `${showNum(tmp.timeSpeed)}`)
	}
	if (modeActive("extreme")) if (tmp.fn && tmp.fn.enh.eff2.gt(1)) {
		eff = tmp.fn.enh.eff2
		tmp.timeSpeed = tmp.timeSpeed.mul(eff)
		setMultiList(thisName, "Enhanced Coal Effect 2", `${showNum(eff)}x`, `${showNum(tmp.timeSpeed)}`)
	}
	if (((player.elementary.theory.active && player.elementary.theory.depth.gte(player.modes == [] ? 25 : 20)) || HCTVal("tv").gte(player.modes == [] ? 25 : 20)) && tmp.elm) {
		tmp.timeSpeed = tmp.timeSpeed.pow(tmp.elm.theory.nerf)
		setMultiList(thisName, "Theory Nerf", `^${showNum(tmp.elm.theory.nerf)}`, `${showNum(tmp.timeSpeed)}`)
	}
	if (mltActive(2)) {
		tmp.timeSpeed = tmp.timeSpeed.root(1.3);
		setMultiList(thisName, "Multiverse 2 Nerf", `^${showNum(1 / 1.3)}`, `${showNum(tmp.timeSpeed)}`)
	}
	if (mltActive(5)) {
		tmp.timeSpeed = tmp.timeSpeed.root(modeActive("extreme") ? Math.PI : 3.6);
		setMultiList(thisName, "Multiverse 5 Nerf", `^${showNum(1 / (modeActive("extreme") ? Math.PI : 3.6))}`, `${showNum(tmp.timeSpeed)}`)
	}
	if (modeActive("extreme") && tmp.timeSpeed.gte(ExpantaNum.pow(DISTANCES.mlt, 300))) {
		eff = tmp.timeSpeed
		let mlt300 = ExpantaNum.pow(DISTANCES.mlt, 300);
		tmp.timeSpeed = softcap(tmp.timeSpeed, "EP", 1, mlt300, 5)
		setMultiList(thisName, "Extreme Mode Harsh Softcap 1", `exponential softcap(${showNum(eff)} at ${showNum(mlt300)}, ${showNum(20)}% Power)`, `${showNum(tmp.timeSpeed)}`)
	}
	showMultiList(thisName, !tmp.timeSpeed.eq(1))
}
