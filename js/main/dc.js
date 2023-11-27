function updateTempDarkCoreCost() {
	let nAmt = player.dc.cores;
	let bcMult = modeActive("extreme") ? 0.25 : 10
	let scalDc;
	scalDc = nAmt;
	scalDc = doAllScaling(scalDc, "darkCore", false, [2, 3, 1.03, 4, 5]);
	scalDc = ExpantaNum.pow(10, ExpantaNum.pow(10, scalDc.div(50).plus(1))).mul(bcMult);
	tmp.dc.coreCost = scalDc;
	scalDc = player.collapse.cadavers.div(bcMult).max(1).log10().max(1).log10().sub(1).mul(50);
	scalDc = doAllScaling(scalDc, "darkCore", true, [2, 3, 1.03, 4, 5]);
	scalDc = scalDc.plus(1).round();
	tmp.dc.bulk = scalDc;
}

function calcDarkFlow() {
	let thisName = "Dark Flow"
	let eff
	let txt
	clearMultiList(thisName)
	showMultiList(thisName, player.dc.unl)
	tmp.dc.flow = new ExpantaNum(1);
	if (tmp.ach[75].has) {
		tmp.dc.flow = tmp.dc.flow.mul(1.1);
		setMultiList(thisName, "Achievement 75 Reward", `${showNum(1.1)}x`, `${showNum(tmp.dc.flow)}`)
	}
	if (tmp.ach[83].has) {
		tmp.dc.flow = tmp.dc.flow.mul(1.2);
		setMultiList(thisName, "Achievement 83 Reward", `${showNum(1.2)}x`, `${showNum(tmp.dc.flow)}`)
	}
	if (tmp.ach[131].has) {
		tmp.dc.flow = tmp.dc.flow.mul(1.5);
		setMultiList(thisName, "Achievement 131 Reward", `${showNum(1.5)}x`, `${showNum(tmp.dc.flow)}`)
	}
	if (player.tr.upgrades.includes(11) && !HCCBA("noTRU")) {
		eff = tr11Eff()["dcf"]
		tmp.dc.flow = tmp.dc.flow.mul(eff);
		txt = `1 + (log(${showNum(player.tr.cubes.add(1))}) / 75)`
		if (tr11Pow().gt(1)) {
			txt += ` ^ (1 + 11.5 * (log2e23(${showNum(tmp.accEn ? tmp.accEn : new ExpantaNum(0))})) ^ 0.1)`
		}
		if (player.rank.gte(7500)) {
			txt += ` ^ ((${showNum(player.rank)} / 7500) ^ 7.5)`
		}
		setMultiList(thisName, "Time Reversal Upgrade 11", `${txt} = ${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
	}
	if (player.tr.upgrades.includes(12) && !HCCBA("noTRU")) {
		eff = tr12Eff()
		tmp.dc.flow = tmp.dc.flow.mul(eff);
		if (player.rank.gt(7500)) {
			txt = `10^(${showNum(tmp.dc.allComp)} ^ ((${showNum(player.rank)} / 7500) ^ 1/3 / 2))`
		} else {
			txt = `sqrt(${showNum(tmp.dc.allComp.add(1))})`
		}
		setMultiList(thisName, "Time Reversal Upgrade 12", `${txt} = ${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
	}
	if (tmp.inf) {
		if (tmp.inf.asc.perkEff(1).gt(1)) {
			eff = tmp.inf.asc.perkEff(1)
			tmp.dc.flow = tmp.dc.flow.mul(eff);
			setMultiList(thisName, "Godhood Perk", `${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
		}
		if (tmp.inf.upgs.has("4;1")) {
			tmp.dc.flow = tmp.dc.flow.mul(2);
			setMultiList(thisName, "Infinity Upgrade 4;1 Effect", `${showNum(2)}x`, `${showNum(tmp.dc.flow)}`)
		}
		if (tmp.inf.upgs.has("5;1")) {
			tmp.dc.flow = tmp.dc.flow.mul(2);
			setMultiList(thisName, "Infinity Upgrade 5;1 Effect", `${showNum(2)}x`, `${showNum(tmp.dc.flow)}`)
		}
		if (tmp.inf.upgs.has("4;6")) {
			tmp.dc.flow = tmp.dc.flow.mul(2);
			setMultiList(thisName, "Infinity Upgrade 4;6 Effect", `${showNum(2)}x`, `${showNum(tmp.dc.flow)}`)
		}
		if (tmp.inf.upgs.has("5;5")) { // i'm tired of this i'm just gonna display the values now, i will do them later
			eff = INF_UPGS.effects["5;5"]()
			tmp.dc.flow = tmp.dc.flow.mul(eff);
			setMultiList(thisName, "Infinity Upgrade 5;5 Effect", `${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
		}
		if (tmp.inf.upgs.has("7;2")) {
			eff = INF_UPGS.effects["7;2"]()["flow"]
			tmp.dc.flow = tmp.dc.flow.mul(eff);
			setMultiList(thisName, "Infinity Upgrade 7;2 Effect", `${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
		}
		if (tmp.inf.upgs.has("7;6")) {
			eff = INF_UPGS.effects["7;6"]()
			tmp.dc.flow = tmp.dc.flow.mul(eff);
			setMultiList(thisName, "Infinity Upgrade 7;6 Effect", `${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
		}
		if (tmp.inf.upgs.has("7;8")) {
			eff = INF_UPGS.effects["7;8"]()
			tmp.dc.flow = tmp.dc.flow.mul(eff);
			setMultiList(thisName, "Infinity Upgrade 7;8 Effect", `${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
		}
		if (tmp.inf.upgs.has("10;5")) {
			eff = INF_UPGS.effects["10;5"]()
			tmp.dc.flow = tmp.dc.flow.mul(eff);
			setMultiList(thisName, "Infinity Upgrade 10;5 Effect", `${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
		}
		if (tmp.inf.upgs.has("10;10")) {
			eff = INF_UPGS.effects["10;10"]()
			tmp.dc.flow = tmp.dc.flow.mul(eff);
			setMultiList(thisName, "Infinity Upgrade 10;10 Effect", `${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
		}
	}
	if (tmp.elm) {
		if (player.elementary.times.gt(0)) {
			tmp.dc.flow = tmp.dc.flow.mul(tmp.elm.bos.z2.max(1));
		}
		if (player.elementary.sky.unl && tmp.elm.sky.pionEff[5].gt(1)) {
			eff = tmp.elm.sky.pionEff[5]
			tmp.dc.flow = tmp.dc.flow.mul(eff);
			setMultiList(thisName, `Pion Upgrade 5 Effect`, `${txt} = ${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
		}
	}
	if (player.rank.gte(1.5e4)) {
		eff = rankEffects(1.5e4)
		tmp.dc.flow = tmp.dc.flow.mul(eff)
		txt = `${showNum(player.rank)}`
		if (player.rank.gte(45000)) {
			txt += ` dilated by 12`
		}
		txt = `(10^10^((3 * log3(${txt} / ${showNum(15000)})) ^ 2)) / 100`
		setMultiList(thisName, `Rank ${showNum(1.5e4)} Reward`, `${txt} = ${showNum(eff)}x`, `${showNum(tmp.dc.flow)}`)
	}
	if (tmp.dc.flow.gte("ee11")) {
		eff = tmp.dc.flow
		tmp.dc.flow = softcap(tmp.dc.flow, 'EP', 1, "ee11", 4)
		setMultiList(thisName, "Softcap 1", `${showNum(eff)} at ${showNum("ee11")} is raised by ${showNum(eff.log(tmp.dc.flow))} with ${showNum(100)}% power`, `${showNum(tmp.dc.flow)}`)
	}
	if (extremeStadiumActive("quantron", 5)) {
		tmp.dc.flow = tmp.dc.flow.pow(0.95);
		setMultiList(thisName, "Infinity Upgrade 4;6 Effect", `${showNum(2)}x`, `${showNum(tmp.dc.flow)}`)
	}
	if (nerfActive("noDarkFlow")) tmp.dc.flow = new ExpantaNum(0);
}

function calcDarkCircleBonus() {
	tmp.dc.power = new ExpantaNum(1);
	if (player.tr.upgrades.includes(15) && !HCCBA("noTRU")) tmp.dc.power = tmp.dc.power.mul(tr15Eff());
	if (tmp.inf) if (tmp.inf.stadium.completed("reality") && mltRewardActive(1)) tmp.dc.power = tmp.dc.power.mul(8);
	tmp.dc.dmEff = player.dc.matter.mul(tmp.dc.flow).plus(1).pow(ExpantaNum.mul(0.1, tmp.dc.power));
	tmp.dc.deEff = player.dc.energy.mul(tmp.dc.flow).plus(1).pow(ExpantaNum.mul(0.125, tmp.dc.power));
	if (tmp.inf && tmp.inf.upgs.has("6;8")) {
		tmp.dc.dmEff = tmp.dc.dmEff.max(
			player.dc.matter
				.mul(tmp.dc.flow)
				.plus(1)
				.pow(
					ExpantaNum.mul(
						ExpantaNum.pow(2, player.dc.matter.plus(10).slog(10).sub(1)).div(10),
						// TODO: remove this slog
						tmp.dc.power
					)
				)
				.pow(5)
		);
		tmp.dc.deEff = tmp.dc.deEff.max(
			player.dc.energy
				.mul(tmp.dc.flow)
				.plus(1)
				.pow(
					ExpantaNum.mul(
						ExpantaNum.pow(2, player.dc.energy.plus(10).slog(10).sub(1)).div(8),
						// TODO: remove this slog
						tmp.dc.power
					)
				)
				.pow(10)
		);
	}
	tmp.dc.dfEff = extremeStadiumActive("spectra", 4) ? new ExpantaNum(0) : (player.dc.fluid.mul(tmp.dc.flow).plus(1).log10().plus(1).log10().mul(tmp.dc.power));
}

function calcDarkCircleGain() {
	tmp.dc.dmGain = ExpantaNum.pow(2, player.dc.cores).sub(1).mul(player.dc.fluid.plus(1).log10().plus(1)).max(0);
	tmp.dc.deGain = player.dc.matter.plus(1).log10();
	tmp.dc.dfGain = player.dc.energy.plus(1).log10();
	if (tmp.inf && tmp.inf.upgs.has("8;1")) {
		let fp = new ExpantaNum(1);
		if (tmp.inf.upgs.has("8;8")) fp = fp.mul(INF_UPGS.effects["8;8"]());
		tmp.dc.dmGain = ExpantaNum.pow(2, player.dc.cores)
			.sub(1)
			.mul(
				player.dc.fluid
					.plus(1)
					.log10()
					.plus(1)
					.mul(player.dc.fluid.plus(1).pow(ExpantaNum.mul(0.2, fp)))
			)
			.max(0);
		tmp.dc.deGain = player.dc.matter
			.plus(1)
			.log10()
			.mul(player.dc.matter.plus(1).pow(ExpantaNum.mul(0.2, fp)));
		tmp.dc.dfGain = player.dc.energy
			.plus(1)
			.log10()
			.mul(player.dc.energy.plus(1).pow(ExpantaNum.mul(0.2, fp)));
	}
}

function calcDarkCircleAllComp() {
	tmp.dc.allComp = player.dc.matter.plus(1).log10()
		.plus(player.dc.energy.plus(1).log10())
		.plus(player.dc.fluid.plus(1).log10())
		.plus(player.dc.cores);
}

function calcDarkCircleCoreEff() {
	tmp.dc.coreEff =
		player.dc.cores.gte(modeActive("extreme") ? 21 : 12)
			? player.dc.cores.pow(7).div(ExpantaNum.pow(modeActive("extreme") ? 21 : 12, 6).mul(8)).plus(1).log10().plus(1).logBase(modeActive("extreme") ? 1e3 : 10)
			: new ExpantaNum(0);
}

function updateTempDC() { // 339 Normal Mode
	if (!tmp.dc) tmp.dc = {};

	tmp.dc.lrm = new ExpantaNum(modeActive("extreme") ? 1e-28 : 1);

	calcDarkCircleGain()
	calcDarkCircleAllComp()
	calcDarkFlow()
	calcDarkCircleBonus()
	calcDarkCircleCoreEff()

	updateTempDarkCoreCost()
	if (!tmp.dc.buyCore) tmp.dc.buyCore = function (manual = false) {
		if (manual) updateTempDarkCoreCost()
		if (player.collapse.cadavers.lt(tmp.dc.coreCost) || nerfActive("noDarkCores")) return;
		if (!player.dc.unl) return;
		if (!tmp.ach[92].has) player.collapse.cadavers = player.collapse.cadavers.sub(tmp.dc.coreCost);
		player.dc.cores = player.dc.cores.plus(1);
	};
	if (!tmp.dc.maxCores) tmp.dc.maxCores = function () {
		if (player.collapse.cadavers.lt(tmp.dc.coreCost) || nerfActive("noDarkCores")) return;
		if (!player.dc.unl) return;
		if (!tmp.ach[92].has) player.collapse.cadavers = player.collapse.cadavers.sub(tmp.dc.coreCost);
		player.dc.cores = player.dc.cores.max(tmp.dc.bulk.floor().max(0)).max(player.dc.cores.plus(1));
	};
	if (!tmp.dc.tick) tmp.dc.tick = function (diff) {
		player.dc.matter = player.dc.matter.plus(adjustGen(tmp.dc.dmGain, "dc").mul(diff).mul(tmp.dc.flow));
		player.dc.energy = player.dc.energy.plus(adjustGen(tmp.dc.deGain, "dc").mul(diff).mul(tmp.dc.flow));
		player.dc.fluid = player.dc.fluid.plus(adjustGen(tmp.dc.dfGain, "dc").mul(diff).mul(tmp.dc.flow));
	};
}