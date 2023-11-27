function updateTempTR() {
	if (tmp.tr===undefined) tmp.tr = {};
	tmp.tr.txt = player.tr.active ? "Bring Time back to normal." : "Reverse Time.";
	tmp.tr.esc = new ExpantaNum(1e20);
	cubes = player.tr.cubes;
	if (cubes.gte(tmp.tr.esc)) cubes = softcap(cubes, "P", 1, tmp.tr.esc, 3)
	tmp.tr.eff = cubes.add(1).log10().add(1).logBase(2);
	if (tmp.inf) if (tmp.inf.stadium.completed("reality")) tmp.tr.eff = tmp.tr.eff.mul(mltRewardActive(1)?8:3);
}

function getTimeCubeGain() {
	let thisName = "Time Cube Gain"
	clearMultiList(thisName)
	showMultiList(thisName, player.tr.unl)
	let eff
	let gain = new ExpantaNum(1);
	if (modeActive("hard")) {
		gain = gain.div(3);
		setMultiList(thisName, "Hard Mode Nerf", `${showNum(1/3)}x`, `${showNum(gain)}`)
	}
	if (modeActive("easy")) {
		eff = player.pathogens.amount.add(1).mul(5)
		gain = gain.mul(eff);
		setMultiList(thisName, "Easy Mode Buff", `${showNum(eff)}x`, `${showNum(gain)}`)
	}
	if (player.tr.upgrades.includes(1) && !HCCBA("noTRU")) {
		eff = tr1Eff()
		gain = gain.mul(eff);
		let txt
		if (player.rank.gt(7500)) {
			txt = `(${showNum(1.1)} ^ (${showNum(player.rank)} / 7500)) ^ ((${showNum(player.rank)} + ${showNum(player.tier)}) ^ ((${showNum(player.rank)} / 7500) ^ ${showNum(1/2.35)}))`
		} else {
			txt = `${showNum(1.02)}^(${showNum(player.rank)} + ${showNum(player.tier)})`
		}
		setMultiList(thisName, "Time Reversal Upgrade 1", `${txt} = ${showNum(eff)}x`, `${showNum(gain)}`)
	}
	if (player.tr.upgrades.includes(4) && !HCCBA("noTRU")) {
		eff = tr4Eff()
		gain = gain.mul(eff);
		setMultiList(thisName, "Time Reversal Upgrade 4", `${showNum(eff)}x`, `${showNum(gain)}`)
	}
	if (tmp.ach[55].has) {
		gain = gain.mul(1.1);
		setMultiList(thisName, "Achievement 55 Reward", `${showNum(1.1)}x`, `${showNum(gain)}`)
	}
	if (tmp.ach[72].has && modeActive("extreme")) {
		let exp = ExpantaNum.add(5, player.dc.cores.sqrt().mul(5));
		eff = player.furnace.coal.add(1).log10().add(1).pow(exp)
		gain = gain.mul(eff);
		setMultiList(thisName, "Achievement 72 Reward", `(1 + log(${showNum(player.furnace.coal.add(1))})) ^ 5(1 + sqrt(${showNum(player.dc.cores)})) = ${showNum(eff)}x`, `${showNum(gain)}`)
	}
	if (tmp.ach[86].has && modeActive("extreme+hikers_dream")) {
		eff = player.pathogens.amount.add(1)
		gain = gain.mul(eff)
		setMultiList(thisName, "Achievement 86 Reward", `${showNum(eff)}x`, `${showNum(gain)}`)
	}
	if (player.tr.upgrades.includes(16) && !HCCBA("noTRU") && modeActive("extreme")) {
		eff = TR_UPGS[16].current().tc
		gain = gain.mul(eff);
		setMultiList(thisName, "Time Reversal Upgrade 16", `${showNum(eff)}x`, `${showNum(gain)}`)
	}
	if (tmp.pathogens && player.pathogens.unl) {
		eff = tmp.pathogens[3].eff()
		gain = gain.mul(eff);
		setMultiList(thisName, "Pathogen Upgrade 3 Effect", `${showNum(eff)}x`, `${showNum(gain)}`)
	}
	if (tmp.dc) if (player.dc.unl) {
		eff = tmp.dc.deEff
		gain = gain.mul(eff);
		setMultiList(thisName, "Dark Energy Effect", `${showNum(eff)}x`, `${showNum(gain)}`)
	}
	if (tmp.dc) if (player.tr.upgrades.includes(11)) {
		eff = tr11Eff()["cg"]
		gain = gain.mul(eff);
		setMultiList(thisName, "Time Reversal Upgrade 11", `${showNum(eff)}x`, `${showNum(gain)}`)
	}
	if (tmp.inf) if (tmp.inf.upgs.has("2;3")) {
		eff = INF_UPGS.effects["2;3"]()["cubes"]
		gain = gain.mul(eff);
		setMultiList(thisName, "Infinity Upgrade 2;3 Effect", `${showNum(eff)}x`, `${showNum(gain)}`)
	}
	return gain
}

function reverseTime(force = false) {
	if (!player.tr.unl) return;
	player.tr.active = !player.tr.active;
}

function buyTRUpg(n) {
	if (player.tr.upgrades.includes(n)) return;
	if (player.tr.cubes.lt(TR_UPGS[n].cost())) return;
	player.tr.cubes = player.tr.cubes.sub(TR_UPGS[n].cost());
	player.tr.upgrades.push(n);
}


function tr1Eff() {
	return !player.rank.gt(7500)
		?ExpantaNum.pow(modeActive("extreme")?1.02:1.1, player.rank.add(player.tier))
		:ExpantaNum.pow(Decimal.pow(1.1, player.rank.div(7500).max(1)), player.rank.add(player.tier).pow(player.rank.div(7500).max(1).root(2.35)));
}

function tr2Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.pathogens && player.pathogens.unl) pow = pow.mul(tmp.pathogens[1].eff());
	return pow
}

function tr2Eff() {
	let pow = tr2Pow()
	let eff = player.tr.cubes.add(1).log10().add(1).pow(pow)
	return eff
}

function tr4Eff() {
	let r = player.rockets
	if (!player.rank.gt(7500)) if (r.gte(1e10)) r = softcap(r, "EP", 1, 1e10, 1.5) // exponent ^2/3 after 1e10
	return !player.rank.gt(7500)
			?ExpantaNum.pow(modeActive("extreme")?1.1:1.33, r.add(1).log10())
			:ExpantaNum.pow(Decimal.pow(1.33, player.rank.div(7500).max(1)), r.add(1).log10())
}

function tr6Eff() {
	return ExpantaNum.pow(1.1, player.tr.cubes.add(1).log10().pow(player.rank.div(7500).max(1).log(10).add(1).root(2)))
}

function tr7Eff() {
	return ExpantaNum.pow(1.05, new Decimal(player.achievements.length).pow(player.rank.div(7500).max(1)))
}

function getTR89Mod() {
	let mod = new ExpantaNum(1)
	if (modeActive("hard")) mod = mod.div(((tmp.ach?tmp.ach[105].has:false)&&modeActive("extreme"))?0.9:2)
	if (modeActive("easy")) mod = mod.mul(3)
	return mod
}

function tr8Eff() {
	return ExpantaNum.div(4, (tmp.auto ? tmp.auto.rankbot.interval.max(1e-10) : 1)).pow(getTR89Mod().div(3)).max(1)
}

function tr9Eff() {
	return ExpantaNum.div(5, (tmp.auto ? tmp.auto.tierbot.interval.max(1e-10) : 1)).pow(getTR89Mod().div(5)).max(1)
}

function tr10Eff() {
	let cubes = player.tr.cubes
	if (!player.rank.gt(7500)) if (cubes.gte(1e100)) cubes = softcap(cubes, "EP", 1, 1e100, 1.25)
	return ExpantaNum.pow(1.1, cubes.add(1).log10())
}

function tr11Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.inf) if (tmp.inf.upgs.has("1;8")) pow = pow.mul(INF_UPGS.effects["1;8"]())
	return pow
}

function tr11Eff() {
	return {
		cg: tmp.dc ? softcap(tmp.dc.flow.pow(tmp.dc.flow.add(10).log10().add(1).log(2).mul(5)).pow(tr11Pow()).pow(player.rank.div(7500).max(1).pow(5)), "EP", 1, "ee9", 4) : new ExpantaNum(1),
		dcf: player.tr.cubes.add(1).log10().div(75).add(1).pow(tr11Pow()).pow(player.rank.div(7500).max(1).pow(7.5))
	}
}

function tr12Eff() {
	return tmp.dc ? 
	!player.rank.gt(7500)
		?tmp.dc.allComp.add(1).sqrt() 
		:Decimal.pow(10, tmp.dc.allComp.pow(player.rank.div(7500).max(1).root(3).div(2)))
	: new ExpantaNum(1)
}

function tr13Eff() {
	return tmp.dc ? 
	!player.rank.gt(7500)
		?tmp.dc.allComp.add(1).slog(2).pow(0.1).sub(1).max(0)
		// TODO: remove this slog
		:tmp.dc.allComp.add(1).log(2).pow(player.rank.div(7500).max(1).root(2).sub(1).div(2).max(0.1)).sub(1).max(0)
	: new ExpantaNum(0)
}

function tr14Eff() {
	return {
		cd: !player.rank.gt(7500)
				? player.tier.add(1).pow(1.25)
				: softcap(
					Decimal.pow(2, player.tier.add(1).pow(player.rank.div(7500).max(1).root(2).mul(2)))
					, "EP", 1, "ee11", 6.5),
		ss: !player.rank.gt(7500)
			?player.dc.cores.add(1).log10().add(1).log10().mul(7.5)
			:player.dc.cores
	}
}

function tr15Eff() {
	let eff = ExpantaNum.pow(1.2, player.dc.cores.pow(player.rank.div(7500).max(1).root(3).sub(1).div(4).add(1)))
	if (!player.rank.gt(7500)) if (eff.gte(10)) eff = softcap(eff, "P", 1, 10, 3.5)
	if (eff.gte(100)) eff = Decimal.pow(10, softcap(eff.log(10), "EP", 1, 2, 6))
	return eff
}

function tr19Eff() {
	if (!modeActive("extreme")) return new ExpantaNum(1)
	let eff = ExpantaNum.div(4.5, tmp.auto ? tmp.auto.rankCheapbot.interval.max(1e-10) : 1).pow(getTR89Mod().mul(0.3)).max(1);
	if (showNum(eff) === undefined || !eff.isFinite()) eff = new ExpantaNum(1)
	return eff
}