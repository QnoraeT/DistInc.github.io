function updateTheoryTabs() {
	if (!tmp.elm.theory.updateTabs) tmp.elm.theory.updateTabs = function () {
		let tabs = Element.allFromClass("theorytab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(thTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(TH_TABS[tabs[i].id]());
		}
	};
	if (!tmp.elm.theory.showTab) tmp.elm.theory.showTab = function (name) {
		if (thTab == name) return;
		thTab = name;
		tmp.elm.theory.updateTabs();
	};
	tmp.elm.theory.updateTabs();
}

function updateTempTheoriverse() {
	tmp.elm.theory.subbed = new ExpantaNum(0)
	if (player.elementary.theory.tree.unl) tmp.elm.theory.subbed = tmp.elm.theory.subbed.add(TREE_UPGS[4].effect(player.elementary.theory.tree.upgrades[4]||0))
	tmp.elm.theory.nerf = (player.elementary.theory.depth.minus(tmp.elm.theory.subbed).max(0).eq(0)?new ExpantaNum(0.88):ExpantaNum.pow(0.8, player.elementary.theory.depth.minus(tmp.elm.theory.subbed).max(1).cbrt()))
	if (player.elementary.theory.depth.minus(tmp.elm.theory.subbed).gte(4)) tmp.elm.theory.nerf = tmp.elm.theory.nerf.pow(player.elementary.theory.depth.minus(tmp.elm.theory.subbed).max(0).sub(3))
	if (HCTVal("tv").gt(-1)) {
		let d = HCTVal("tv")
		tmp.elm.theory.nerf = (d.minus(tmp.elm.theory.subbed).max(0).eq(0)?new ExpantaNum(0.88):ExpantaNum.pow(0.8, d.minus(tmp.elm.theory.subbed).max(1).cbrt()))
		if (d.minus(tmp.elm.theory.subbed).gte(4)) tmp.elm.theory.nerf = tmp.elm.theory.nerf.pow(d.minus(tmp.elm.theory.subbed).max(0).sub(3))
	}
	if (modeActive("extreme")) {
		if (player.elementary.theory.depth.lt(4)) tmp.elm.theory.nerf = tmp.elm.theory.nerf.pow(0.75)
		if (player.elementary.theory.depth.gte(5)) tmp.elm.theory.nerf = tmp.elm.theory.nerf.pow(1.25)
	}
	if (modeActive("hikers_dream")) {
		tmp.elm.theory.nerf = tmp.elm.theory.nerf.pow(4 / 3)
		if (player.elementary.theory.depth.gte(4)) tmp.elm.theory.nerf = tmp.elm.theory.nerf.pow(9 / 8)
		if (player.elementary.theory.depth.gte(7)) tmp.elm.theory.nerf = tmp.elm.theory.nerf.pow((modeActive("extreme+hikers_dream")?2.675:4) / 3)
	}
	if (modeActive("easy")) tmp.elm.theory.nerf = tmp.elm.theory.nerf.pow(5/6);
	if (!tmp.elm.theory.start) tmp.elm.theory.start = function() {
		if (!player.elementary.theory.unl) return
		if (hasMltMilestone(4)) return
		if (HCTVal("tv").gt(-1)) return
		tmp.elm.layer.reset(true)
		player.elementary.theory.active = !player.elementary.theory.active
	}
	tmp.elm.theory.gainMult = new ExpantaNum(1)
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.elm.theory.gainMult = tmp.elm.theory.gainMult.mul(tmp.mlt.quilts[2].eff2);
	tmp.elm.theory.gain = ExpantaNum.pow(2, player.elementary.theory.depth).mul(tmp.elm.theory.gainMult).round();
}

function updateTempSupersymmetry() {
	if (!tmp.elm.theory.ss) tmp.elm.theory.ss = {}
	if (!tmp.elm.theory.ss.unl) tmp.elm.theory.ss.unl = function() {
		if (!player.elementary.theory.unl) return
		if (player.elementary.theory.supersymmetry.unl) return
		if (player.elementary.theory.points.lt(1)) return
		player.elementary.theory.points = player.elementary.theory.points.sub(1).max(0)
		player.elementary.theory.supersymmetry.unl = true
	}
	for (let i=0;i<4;i++) {
		let type = ["squark", "slepton", "neutralino", "chargino"][i]
		tmp.elm.theory.ss[type+"Gain"] = ExpantaNum.mul((4-i)/4, tmp.elm.theory.speed)
		if (player.elementary.theory.tree.unl) {
			tmp.elm.theory.ss[type+"Gain"] = tmp.elm.theory.ss[type+"Gain"].mul(TREE_UPGS[1].effect(player.elementary.theory.tree.upgrades[1]||0))
			tmp.elm.theory.ss[type+"Gain"] = tmp.elm.theory.ss[type+"Gain"].mul(TREE_UPGS[5].effect(player.elementary.theory.tree.upgrades[5]||0))
			tmp.elm.theory.ss[type+"Gain"] = tmp.elm.theory.ss[type+"Gain"].mul(getStringEff(1))
			if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.theory.ss[type+"Gain"] = tmp.elm.theory.ss[type+"Gain"].mul(tmp.elm.qf.boost9)
			if (player.elementary.sky.unl && tmp.elm.sky) tmp.elm.theory.ss[type+"Gain"] = tmp.elm.theory.ss[type+"Gain"].mul(tmp.elm.sky.spinorEff[5])
		}
		tmp.elm.theory.ss[type+"Eff"] = player.elementary.theory.supersymmetry[type+"s"].add(1)
		if (tmp.elm.theory.ss[type+"Eff"].gte(1e9)) tmp.elm.theory.ss[type+"Eff"] = tmp.elm.theory.ss[type+"Eff"].cbrt().mul(1e6)
		if (HCCBA("sprsym")) tmp.elm.theory.ss[type+"Eff"] = new ExpantaNum(1);
	}
	if (hasDE(5)) for (let i=2;i>=0;i--) {
		let type = ["squark", "slepton", "neutralino", "chargino"][i]
		let next = ["squark", "slepton", "neutralino", "chargino"][i+1]
		if ((player.elementary.theory.tree.upgrades[i+22]||new ExpantaNum(0)).gte(1)) tmp.elm.theory.ss[type+"Gain"] = tmp.elm.theory.ss[type+"Gain"].mul(tmp.elm.theory.ss[next+"Eff"])
	}
	tmp.elm.theory.ss.wavelength = player.elementary.theory.supersymmetry.squarks.mul(player.elementary.theory.supersymmetry.sleptons).mul(player.elementary.theory.supersymmetry.neutralinos).mul(player.elementary.theory.supersymmetry.charginos).pow(1/5)
	tmp.elm.theory.ss.waveEff = tmp.elm.theory.ss.wavelength.add(1).pow(2.25)
	if (tmp.elm.theory.ss.waveEff.gte(1e13)) tmp.elm.theory.ss.waveEff = softcap(tmp.elm.theory.ss.waveEff, "P", (player.tier.gt(72))?0.4:1, 1e13, ExpantaNum.sub(4, ExpantaNum.div(3, tmp.elm.theory.ss.waveEff.log(1e13).pow((player.tier.gt(72))?0.1:2).max(1))))
	if (HCCBA("sprsym")) tmp.elm.theory.ss.waveEff = new ExpantaNum(1);
}

function updateTempTheoryTree() {
	if (!tmp.elm.theory.tree) tmp.elm.theory.tree = {}
	if (!tmp.elm.theory.tree.unl) tmp.elm.theory.tree.unl = function() {
		if (!player.elementary.theory.unl) return
		if (!player.elementary.theory.supersymmetry.unl) return
		if (player.elementary.theory.tree.unl) return
		if (player.elementary.theory.points.lt(1)) return
		player.elementary.theory.points = player.elementary.theory.points.sub(1).max(0)
		player.elementary.theory.tree.unl = true
	}
	tmp.elm.theory.tree.bought = function(i) { return new ExpantaNum(player.elementary.theory.tree.upgrades[i]||0) }
	if (!tmp.elm.theory.tree.buy) tmp.elm.theory.tree.buy = function(x, max=false) {
		if (!player.elementary.theory.unl) return
		if (!player.elementary.theory.tree.unl) return
		if (HCCBA("tree")) return;
		let bought = tmp.elm.theory.tree.bought(x)
		let cap = getTreeUpgCap(x)
		if (bought.gte(cap)) return
		let cost = TREE_UPGS[x].cost(bought.div(tmp.elm.theory.tree.costScaling)).div(tmp.elm.theory.tree.costReduc).round()
		if (player.elementary.theory.points.lt(cost)) return
		if (tmp.ach[modeActive("extreme+hikers_dream")?143:162].has && (outerShiftDown||max) && TREE_UPGS[x].target!==undefined) {
			let pts = player.elementary.theory.points
			if (pts.eq(0)&&cost.eq(0)) pts = new ExpantaNum(.99)
			let target = TREE_UPGS[x].target(pts.mul(tmp.elm.theory.tree.costReduc)).mul(tmp.elm.theory.tree.costScaling).max(0).min(cap);
			if (target.lte(bought)||target.lt(1)) return;
			let newCost = TREE_UPGS[x].cost(target.sub(1).div(tmp.elm.theory.tree.costScaling)).div(tmp.elm.theory.tree.costReduc).round();
			if (!player.elementary.entropy.upgrades.includes(13)) {
				player.elementary.theory.points = player.elementary.theory.points.sub(newCost).max(0);
				player.elementary.theory.tree.spent = player.elementary.theory.tree.spent.add(newCost);
			}
			player.elementary.theory.tree.upgrades[x] = bought.max(target)
			updateTheoryTreeHTMLPerSec();
		} else {
			if (!player.elementary.entropy.upgrades.includes(13)) {
				player.elementary.theory.points = player.elementary.theory.points.sub(cost).max(0)
				player.elementary.theory.tree.spent = player.elementary.theory.tree.spent.add(cost)
			}
			player.elementary.theory.tree.upgrades[x] = bought.add(1)
			updateTheoryTreeHTMLPerSec();
		}
	}
	tmp.elm.theory.tree.costScaling = 1;
	if (player.elementary.entropy.upgrades.includes(26)) tmp.elm.theory.tree.costScaling = 2;
tmp.elm.theory.tree.costReduc = ach152Eff()
	if (player.elementary.theory.inflatons.unl) tmp.elm.theory.tree.costReduc = tmp.elm.theory.tree.costReduc.mul(getInflatonEff1())
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.theory.tree.costReduc = tmp.elm.theory.tree.costReduc.mul(tmp.elm.qf.boost8)
}

function updateTempTheories() {
	if (!tmp.elm.theory) tmp.elm.theory = {}

	tmp.elm.theory.speed = new ExpantaNum(1)
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.elm.theory.speed = tmp.elm.theory.speed.mul(tmp.mlt.quilts[1].eff2);
	updateTheoryTabs()
	updateTempTheoriverse();
	updateTempSupersymmetry();
	updateTempTheoryTree();
}

function resetTheoryTree(force=false, noReset=false) {
	if (!force) {
		if (!player.elementary.theory.unl) return
		if (!player.elementary.theory.tree.unl) return
		if (!confirm("Are you sure you want to reset your tree to get Theory Points back?")) return
	}
	player.elementary.theory.points = player.elementary.theory.points.add(player.elementary.theory.tree.spent)
	player.elementary.theory.tree.spent = new ExpantaNum(0)
	player.elementary.theory.tree.upgrades = {}
	if (!noReset) elmReset(true)
}

// Strings

function unlockStrings() {
	if (!player.elementary.theory.unl) return
	if (!player.elementary.theory.tree.unl) return
	if (player.elementary.theory.strings.unl) return
	if (player.elementary.theory.points.lt(7)) return
	if (player.mlt.times.eq(0)) if (!confirm("Are you sure you want to unlock Strings? You will not be able to get your Theory Points back!")) return
	player.elementary.theory.points = player.elementary.theory.points.sub(7).max(0)
	player.elementary.theory.strings.unl = true
}

function getStringEff(n) {
	if (!player.elementary.theory.unl || !player.elementary.theory.strings.unl) return new ExpantaNum(1)
	if (HCCBA("string")) if (HCTVal("string").gt(UNL_STR()-n)) return new ExpantaNum(1);
	let ret = player.elementary.theory.strings.amounts[n-1].add(1).pow(3/n)
	if (ret.gte(1e6)) ret = softcap(ret, "P", 1, 1e6, 3)
	if (n==1 && ret.gte(1e9)) ret = softcap(ret, "P", 1, 1e9, 10)
	if (n==1 && player.elementary.entropy.upgrades.includes(18)) ret = ret.pow(5);
	let finalExp = new ExpantaNum(1)
	let ettu = player.elementary.theory.tree.upgrades
	if (hasDE(8) && n==1) finalExp = finalExp.add(1);
	if (hasDE(5) && n==2) finalExp = finalExp.add(TREE_UPGS[14].effect(ettu[14]||0))
	if (hasDE(5) && n==3) finalExp = finalExp.add(TREE_UPGS[15].effect(ettu[15]||0))
	if (hasDE(5) && n==4) finalExp = finalExp.add(TREE_UPGS[16].effect(ettu[16]||0))
	if (hasDE(5) && n==5) finalExp = finalExp.add(TREE_UPGS[17].effect(ettu[17]||0))
	if (hasDE(5) && n==6) finalExp = finalExp.add(TREE_UPGS[18].effect(ettu[18]||0))
	if (hasDE(5) && n==7) finalExp = finalExp.add(TREE_UPGS[19].effect(ettu[19]||0))
	if (hasDE(9) && n>7) finalExp = finalExp.add(1);
	return ret.pow(finalExp)
}

function getStringGain(n) {
	if (!player.elementary.theory.strings.unl) return new ExpantaNum(0)
	if (n>1) if (!(player.elementary.theory.strings.amounts[n-2].gte(STR_REQS[n])&&(UNL_STR()>=n))) return new ExpantaNum(0)
	let gain = new ExpantaNum(0.02).mul(1/Math.sqrt(n))
	if (n<TOTAL_STR) gain = gain.mul(getStringEff(n+1))
	gain = gain.mul(getEntangleEff())
	if (tmp.ach[144].has) gain = gain.mul(1.25)
	if (tmp.ach[157].has) gain = gain.mul(2)
	if (player.elementary.foam.unl && tmp.elm.qf) gain = gain.mul(tmp.elm.qf.boost15)
	if (tmp.elm) gain = gain.mul(tmp.elm.theory.speed)
	return gain
}

function getEntangleGain() {
	let base = new ExpantaNum(1)
	player.elementary.theory.strings.amounts.forEach(x => function() { base = base.mul(ExpantaNum.add(x, 1)) }())
	let gain = base.pow(1/7).sqrt()
	if (gain.gte(1e7)) gain = softcap(gain, "P", 1, 1e7, 3)
	if (gain.gte(1e9)) gain = softcap(gain, "EP", (player.tier.gt(72))?0.75:1, 1e9, 2)
	gain = gain.mul(TREE_UPGS[6].effect(player.elementary.theory.tree.upgrades[6]||0))
	gain = gain.mul(TREE_UPGS[30].effect(player.elementary.theory.tree.upgrades[30]||0))
	if (player.elementary.foam.unl && tmp.elm.qf) gain = gain.mul(tmp.elm.qf.boost3)
	return gain
}

function getEntangleEff() {
	let eff = player.elementary.theory.strings.entangled.add(1).pow(1.5)
	return eff
}

function entangleStrings() {
	let lastStr = player.elementary.theory.strings.amounts.findIndex(x => new ExpantaNum(x).eq(0))+1
	if (lastStr<3&&lastStr!=0) return
	player.elementary.theory.strings.entangled = player.elementary.theory.strings.entangled.add(getEntangleGain())
	player.elementary.theory.strings.amounts = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)]
}

// Preons

function unlockPreons() {
	if (!player.elementary.theory.unl) return
	if (!player.elementary.theory.strings.unl) return
	if (player.elementary.theory.preons.unl) return
	if (player.elementary.theory.points.lt(10)) return
	if (player.mlt.times.eq(0)) if (!confirm("Are you sure you want to unlock Preons? You will not be able to get your Theory Points back!")) return
	player.elementary.theory.points = player.elementary.theory.points.sub(10).max(0)
	player.elementary.theory.preons.unl = true
}

function getPreonGain() {
	if (!player.elementary.theory.preons.unl) return new ExpantaNum(0)
	let gain = player.elementary.theory.strings.amounts[0].add(1).log10().div(10)
	gain = gain.mul(TREE_UPGS[9].effect(player.elementary.theory.tree.upgrades[9]||0))
	if (tmp.elm) gain = gain.mul(tmp.elm.theory.speed)
	return gain
}

function getTBCost() {
	let b = new ExpantaNum(player.elementary.theory.preons.boosters)
	if (b.gte(4)) b = b.pow(2).div(4)
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[40]||0, 1) && hasDE(6)) b = b.mul(TREE_UPGS[40].effect(player.elementary.theory.tree.upgrades[40]||0))
	let base = new ExpantaNum(2)
	if (hasDE(5)) base = base.pow(0.1)
	let cost = new ExpantaNum(20).mul(ExpantaNum.pow(base, b))
	cost = cost.div(TREE_UPGS[10].effect(player.elementary.theory.tree.upgrades[10]||0))
	return cost
}

function getTBTarg() {
	let base = new ExpantaNum(2)
	if (hasDE(5)) base = base.pow(0.1)
	let targ = player.elementary.theory.preons.amount.mul(TREE_UPGS[10].effect(player.elementary.theory.tree.upgrades[10]||0)).div(20).max(1).logBase(base)
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[40]||0, 1) && hasDE(6)) targ = targ.div(TREE_UPGS[40].effect(player.elementary.theory.tree.upgrades[40]||0))
	if (targ.gte(4)) targ = targ.mul(4).sqrt()
	return targ.add(1).floor();
}

function getTBGain(bulk=1) {
	if (player.elementary.entropy.upgrades.includes(17)) {
		if (bulk==1) return player.elementary.theory.preons.boosters.add(1).pow(5)
		else {
			let s = player.elementary.theory.preons.boosters.add(1)
			let t = ExpantaNum.add(bulk, s)
			return ExpantaNum.div(s.pow(6).mul(-2).add(s.pow(5).mul(6)).sub(s.pow(4).mul(5)).add(s.pow(2)).add(t.pow(2).mul(t.add(1).pow(2)).mul(t.pow(2).mul(2).add(t.mul(2)).sub(1))), 12).round();
		}
	} else {
		if (bulk==1) return player.elementary.theory.preons.boosters.add(1)
		else {
			let a = player.elementary.theory.preons.boosters.add(1)
			let n = ExpantaNum.add(bulk, a)
			let d = 1
			return n.div(2).mul(a.mul(2).add(n.sub(1).mul(d))).round();
		}
	}
}

function theoryBoost(max=false) {
	if (!player.elementary.theory.unl) return
	if (!player.elementary.theory.preons.unl) return
	if (HCCBA("preontb")) return;
	if (player.elementary.theory.preons.amount.lt(getTBCost())) return
	let targ;
	if (max) {
		targ = getTBTarg();
		if (targ.sub(player.elementary.theory.preons.boosters).lt(1)) return;
	}
	player.elementary.theory.preons.amount = player.elementary.theory.preons.amount.sub(getTBCost())
	if (max) {
		let bulk = targ.sub(player.elementary.theory.preons.boosters).max(1);
		player.elementary.theory.points = player.elementary.theory.points.add(getTBGain(bulk));
		player.elementary.theory.preons.boosters = player.elementary.theory.preons.boosters.add(bulk);
	} else {
		player.elementary.theory.points = player.elementary.theory.points.add(getTBGain())
		player.elementary.theory.preons.boosters = player.elementary.theory.preons.boosters.add(1)
	}
}

// Accelerons

function unlockAccelerons() {
	if (!player.elementary.theory.unl) return
	if (!player.elementary.theory.preons.unl) return
	if (player.elementary.theory.accelerons.unl) return
	if (player.elementary.theory.points.lt(84)) return
	if (player.mlt.times.eq(0)) if (!confirm("Are you sure you want to unlock Accelerons? You won't be able to get your Theory Points back!")) return
	player.elementary.theory.points = player.elementary.theory.points.sub(84).max(0)
	player.elementary.theory.accelerons.unl = true
}

function getAccelGain() {
	if (!player.elementary.theory.accelerons.unl) return new ExpantaNum(0)
	let gain = tmp.acc.add(1).log10().div(1e6).sqrt()
	gain = gain.mul(TREE_UPGS[12].effect(player.elementary.theory.tree.upgrades[12]||0))
	if (gain.gte(1e6)) gain = softcap(gain, "P", 1, 1e6, 3)
	if (tmp.elm) gain = gain.mul(tmp.elm.theory.speed)
	if (hasMltMilestone(19)) {
		if (modeActive("extreme")) {
			gain = gain.mul(Array.from(Array(UNL_STR()).keys()).map(x => getStringEff(x+1)).reduce((a,c) => ExpantaNum.mul(a,c)));
			for (let i=1;i<=4;i++) {
				let type = ["squark", "slepton", "neutralino", "chargino"][i-1]
				gain = gain.mul(tmp.elm.theory.ss[type+"Eff"]||1);
			}
		}
		else gain = gain.mul(getStringEff(1));
	}
	return gain
}

function getAccelEff() {
	if (!player.elementary.theory.accelerons.unl) return new ExpantaNum(1)
	let eff = player.elementary.theory.accelerons.amount.add(1).pow(0.04)
	if (eff.gte(2)) eff = softcap(eff, "E", (player.tier.gt(72))?0.9:1, 2)
	if (eff.gte(250)) eff = softcap(eff, "EP", 1, 250, 2.5)
	return eff
}

function getMaxDEs() {
	if (mltRewardActive(3)) return MAX_DARK_EXPANDERS_MLT_3
	return MAX_DARK_EXPANDERS
}

function darkExpand() {
	if (!player.elementary.theory.accelerons.unl) return
	if (player.elementary.theory.accelerons.expanders.gte(getMaxDEs())) return
	let cost = (modeActive("extreme")&&EXTREME_DE_COSTS[player.elementary.theory.accelerons.expanders.add(1).toNumber()])?EXTREME_DE_COSTS[player.elementary.theory.accelerons.expanders.add(1).toNumber()]:((modeActive("hikers_dream")&&HD_DE_COSTS[player.elementary.theory.accelerons.expanders.add(1).toNumber()])?HD_DE_COSTS[player.elementary.theory.accelerons.expanders.add(1).toNumber()]:DARK_EXPANDER_COSTS[player.elementary.theory.accelerons.expanders.add(1).toNumber()]);
	if (player.elementary.theory.accelerons.amount.lt(cost)) return
	player.elementary.theory.accelerons.amount = player.elementary.theory.accelerons.amount.sub(cost)
	player.elementary.theory.accelerons.expanders = player.elementary.theory.accelerons.expanders.add(1)
}

function buyGluon3(col, max=false) {
	if (!hasDE(1)) return
	if (player.elementary.bosons.gauge.gluons[col].amount.lt(tmp.elm.bos.gluonCost(col, 3))) return
	let bulk = new ExpantaNum(1)
	if (max) bulk = tmp.elm.bos.gluonTarg(col, 3).sub(player.elementary.bosons.gauge.gluons[col].upgrades[2]).max(1)
	player.elementary.bosons.gauge.gluons[col].amount = player.elementary.bosons.gauge.gluons[col].amount.sub(tmp.elm.bos.gluonCost(col, 3))
	player.elementary.bosons.gauge.gluons[col].upgrades[2] = (player.elementary.bosons.gauge.gluons[col].upgrades[2]||new ExpantaNum(0)).add(bulk)
	player.elementary.theory.points = player.elementary.theory.points.add(ExpantaNum.mul(10, bulk))
}

function hasDE(n) {
	if (HCCBA("de")) {
		let lim = mltCompleted(3)?MAX_DARK_EXPANDERS_MLT_3:MAX_DARK_EXPANDERS;
		if (HCTVal("de").gt(lim-n)) return false;
	}
	return player.elementary.theory.accelerons.expanders.gte(n)&&player.elementary.theory.accelerons.unl
}

// Tree Export/Import functions
function exportTree() {
	let upgs = player.elementary.theory.tree.upgrades
	let parsedUpgs = {}
	for (let i=0;i<Object.keys(upgs).length;i++) {
		let key = Object.keys(upgs)[i]
		parsedUpgs[key] = upgs[key].toString();
	}
	let tree = JSON.stringify(parsedUpgs)
	notifier.info("Tree exported!")
	copyToClipboard(tree)
}

function importTree() {
	let input = prompt("Paste your exported Theory Tree here.")
	try {
		let upgs = JSON.parse(input)
		let plyr = player.elementary.theory.tree.upgrades
		for (let i=0;i<Object.keys(upgs).length;i++) {
			let key = Object.keys(upgs)[i]
			upgs[key] = new ExpantaNum(upgs[key])
			if (upgs[key].lte(plyr[key])) continue
			else {
				let cap = getTreeUpgCap(key)
				let costs = Array.from({length: Math.min(upgs[key].toNumber(), cap.toNumber())}, (v,i) => TREE_UPGS[key].cost(new ExpantaNum(i).div(tmp.elm.theory.tree.costScaling)).div(tmp.elm.theory.tree.costReduc).round())
				let totalCost = costs.reduce((x,y) => ExpantaNum.add(x, y))
				if (tmp.ach[modeActive("extreme+hikers_dream")?143:162].has) totalCost = TREE_UPGS[key].cost(upgs[key].div(tmp.elm.theory.tree.costScaling)).div(tmp.elm.theory.tree.costReduc).min(totalCost).round()
				if (player.elementary.theory.points.gte(totalCost)) {
					if (!player.elementary.entropy.upgrades.includes(13)) {
						player.elementary.theory.points = player.elementary.theory.points.sub(totalCost).max(0)
						player.elementary.theory.tree.spent = player.elementary.theory.tree.spent.add(totalCost)
					}
					player.elementary.theory.tree.upgrades[key] = ExpantaNum.min(upgs[key], cap)
				} else notifier.warn("You could not afford some of your requested Tree upgrades!")
			}
		}
	} catch(e) {
		notifier.error("Invalid tree")
	}
}

// Inflatons
function unlockInflatons() {
	if (!player.elementary.theory.unl) return
	if (modeActive("extreme+hikers_dream")) {
		if (!(player.elementary.foam.unl&&player.elementary.theory.accelerons.unl)) return;
	} else if (!(player.elementary.hc.unl&&player.elementary.theory.accelerons.unl)) return;
	if (player.elementary.theory.inflatons.unl) return
	if (player.elementary.theory.points.lt(1600)) return
	if (player.mlt.times.eq(0)) if (!confirm("Are you sure you want to unlock Inflatons? You won't be able to get your Theory Points back!")) return
	player.elementary.theory.points = player.elementary.theory.points.sub(1600).max(0)
	player.elementary.theory.inflatons.unl = true
}

function getInflatonState() {
	let x = player.elementary.theory.inflatons.amount.add(1).log10()
	if (x.gte(5.5)) x = softcap(x, "P", 1, 5.5, 2)
	if (x.gte(1e6)) return 1
	return -1*Math.cos(x.toNumber())
}

function getInflatonGain() {
	let gain = player.elementary.theory.inflatons.amount.add(1).pow(0.6)
	gain = gain.mul(player.elementary.theory.inflatons.amount.add(1).pow((tmp.elm.hc.infState+1)/6))
	if (gain.gte(5e4)) gain = softcap(gain, "P", 1, 5e3, 2)
	if (player.elementary.foam.unl && tmp.elm.qf) gain = gain.mul(tmp.elm.qf.boost4)
	return gain
}

function getInflatonEff1() {
	let eff = player.elementary.theory.inflatons.amount.add(1).log10().sqrt().add(1)
	if (player.elementary.entropy.upgrades.includes(20)) eff = eff.mul(player.elementary.theory.inflatons.amount.add(1).pow(0.01))
	return eff
}

function getInflatonEff2() {
	let amt = player.elementary.theory.inflatons.amount
	let eff = new ExpantaNum(0)
	// wtf was the previous code bruh :skull:
	eff = amt.div(1e2).log(10).floor().min(4).max(0)
	if (player.elementary.entropy.upgrades.includes(13)) eff = eff.add(amt.div(1e6).max(1).log10())
	eff = eff.add(amt.add(1).log10().add(1).log10())
	if (player.elementary.sky.unl && tmp.elm.sky) eff = eff.mul(tmp.elm.sky.spinorEff[13])
	return eff.floor()
}

/*
function getInfatonEff2NextAt(){
	let cur = getInflatonEff2()
	if (cur.lt(4)) return new ExpantaNum(1e3).mul(ExpantaNum.pow(10, cur))
	//idk lol this function sucks maybe just use an alg
	! no
}
*/

function getTreeUpgCap(x) {
	x = parseInt(x+"")
	let cap = new ExpantaNum(TREE_UPGS[x].cap)
	if (player.elementary.foam.unl && tmp.elm.qf && QFB17_TARGETS.includes(x)) cap = cap.add(tmp.elm.qf.boost17)
	if (hasMltMilestone(13) && x>=14 && x<=19) cap = cap.add(5);
	return cap;
}
