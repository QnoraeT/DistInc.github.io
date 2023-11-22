function updateCoalGain(){
	tmp.fn.gain = ExpantaNum.pow(2, player.rf.min(inFC(5)?1:(1/0))).sub(1).max(player.rf.gt(0)?1:0).times(ExpantaNum.pow(tmp.fn1base, player.furnace.upgrades[0].times(tmp.fn.upgPow)));
	if (modeActive("extreme+hikers_dream")){
		if (player.achievements.includes(16) && tmp.hd.totalMotive) {
			let eff = tmp.hd.totalMotive.max(100).div(100)
			tmp.fn.gain = tmp.fn.gain.times(eff)
		}
		if (player.achievements.includes(26) && tmp.hd.enerUpgs[1]) {
			let eff = tmp.hd.enerUpgs[1].add(10).log10().pow(3)
			if (tmp.hd.enerUpgs[1].gt(250)) eff = eff.times(3)
			tmp.fn.gain = tmp.fn.gain.times(eff)
		}
	}
	if (player.tr.upgrades.includes(16) && !HCCBA("noTRU") && modeActive("extreme"))
		tmp.fn.gain = tmp.fn.gain.times((inFC(3)||inFC(5))?1:TR_UPGS[16].current());
	if (player.tr.upgrades.includes(33) && !HCCBA("noTRU") && (tmp.rockets?tmp.rockets.clPow:false)) 
		tmp.fn.gain = tmp.fn.gain.times(new ExpantaNum(tmp.rockets.clPow.max(1)||1).min(inFC(5)?1:(1/0)))
	if (inFC(2)) tmp.fn.gain = tmp.fn.gain.pow(0.075)
	if (extremeStadiumActive("flamis", 5)) tmp.fn.gain = tmp.fn.gain.pow(0.2)
	if (tmp.ach[131].has) tmp.fn.gain = tmp.fn.gain.times(100)
}

function updateFurnaceUpgradeCosts() {
	tmp.fn.upgs = {
		1: { base: new ExpantaNum(20) },
		2: { base: new ExpantaNum(100) },
		3: { base: new ExpantaNum(1.5e3) },
		4: { base: new ExpantaNum(1e100) },
		5: { base: new ExpantaNum("1e1000") },
	};
	
	for (let n = 1; n <= 5; n++) {
			let scalFN
			let specialScale = [2, 3, 1.1, 5, 7]
			scalFN = player.furnace.upgrades[n - 1]
			scalFN = doAllScaling(scalFN, "fn", false, specialScale)
			scalFN = ExpantaNum.pow(tmp.fn.upgs[n].base.div(10), scalFN.root(tmp.fn.bfEffRecip.div(2))).times(tmp.fn.upgs[n].base);
			tmp.fn.upgs[n].cost = scalFN
			scalFN = player.furnace.coal.div(tmp.fn.upgs[n].base).logBase(tmp.fn.upgs[n].base.div(10)).pow(tmp.fn.bfEffRecip.div(2));
			scalFN = doAllScaling(scalFN, "fn", true, specialScale)
			scalFN = scalFN.add(1).floor();
			tmp.fn.upgs[n].bulk = scalFN
		if (!tmp.fn.upgs[n].buy) tmp.fn.upgs[n].buy = function () {
			if (player.furnace.coal.lt(tmp.fn.upgs[n].cost)) return;
			player.furnace.coal = player.furnace.coal.sub(tmp.fn.upgs[n].cost);
			player.furnace.upgrades[n - 1] = player.furnace.upgrades[n - 1].add(1);
			updateFurnaceUpgradeCosts();
		};
		if (!tmp.fn.upgs[n].max) tmp.fn.upgs[n].max = function () {
			if (player.furnace.coal.lt(tmp.fn.upgs[n].cost)) return;
			if (tmp.fn.upgs[n].bulk.floor().lte(player.furnace.upgrades[n - 1])) player.furnace.upgrades[n - 1] = player.furnace.upgrades[n - 1].add(1);
			player.furnace.upgrades[n - 1] = player.furnace.upgrades[n - 1].max(tmp.fn.upgs[n].bulk.floor());
		};
	}
}

function updateBlueFlameEff() {
	let adj = new ExpantaNum(1);
	if (player.tr.upgrades.includes(17) && !HCCBA("noTRU") && modeActive("extreme"))
		adj = adj.times(TR_UPGS[17].current());
	if (player.tr.upgrades.includes(26) && !HCCBA("noTRU") && modeActive("extreme"))
		adj = adj.times(TR_UPGS[26].current());
	if (inFC(5)) adj = adj.times(0.725)
	if (extremeStadiumActive("quantron", 2)) adj = adj.times(0.95)
	tmp.fn.bfEff = ExpantaNum.div(1, player.furnace.blueFlame.add(tmp.fn.enh?tmp.fn.enh.eff:0).times(adj).div(4).add(1));
	tmp.fn.bfEffRecip = player.furnace.blueFlame.add(tmp.fn.enh?tmp.fn.enh.eff:0).times(adj).div(4).add(1)
	if (tmp.fn.bfEff.lt(0.0098)) tmp.fn.bfEff = tmp.fn.bfEff.cbrt().times(0.0098 ** (2/3));
	if (tmp.fn.bfEffRecip.gte(102.04)) tmp.fn.bfEffRecip = softcap(tmp.fn.bfEffRecip, "P", 1, 102.04, 3)
	if (inFC(1)) tmp.fn.bfEff = new ExpantaNum(1)
	if (inFC(1)) tmp.fn.bfEffRecip = new ExpantaNum(1)
	if (tmp.fn.bfEff==new Decimal(0) || tmp.fn.bfEffRecip==new Decimal(Infinity)) throw new Error("What the fuck? Blue Flame effectiveness is OP! [Hit Infinity]")
}

function updateFurnUpgEffs() {
	tmp.fn.upgPow = (player.elementary.times.gt(0) && tmp.fn.magma) ? tmp.fn.magma.eff : new ExpantaNum(1)
	if (inFC(6)) tmp.fn.upgPow = tmp.fn.upgPow.div(1e5)
		
	tmp.fn4base = new ExpantaNum(0.15)
	if (FCComp(5)) tmp.fn4base = tmp.fn4base.add(ExpantaNum.mul(0.0001, player.furnace.upgrades[0].times(tmp.fn.upgPow)))
	if (tmp.fn.enh) if (tmp.fn.enh.unl) {
		tmp.fn4base = tmp.fn4base.add(ExpantaNum.mul(tmp.fn.enh.upg3eff?tmp.fn.enh.upg3eff:0, player.furnace.enhancedUpgrades[2].add(tmp.fn.enh.upgs[3].extra)).times(tmp.fn.enh.upgPow))
		if (player.elementary.entropy.upgrades.includes(25)) tmp.fn4base = tmp.fn4base.times(ExpantaNum.pow(tmp.fn.enh.upg3eff?tmp.fn.enh.upg3eff:0, player.furnace.enhancedUpgrades[2].add(tmp.fn.enh.upgs[3].extra).times(.2)))
	}
	if (HCCBA("noTRU")||inAnyFC()) {
		if (player.tr.upgrades.includes(35)&&!HCCBA("noTRU")) tmp.fn4base = tmp.fn4base.add(1).sqrt().sub(1)
		else tmp.fn4base = new ExpantaNum(0)
	}
	if (extremeStadiumActive("flamis", 4) || extremeStadiumActive("nullum", 5) || extremeStadiumActive("quantron", 3)) tmp.fn4base = new ExpantaNum(0);
	
	tmp.fn1base = new ExpantaNum(inFC(4)?1:(new ExpantaNum(FCComp(2)?28:3).add(ExpantaNum.mul(tmp.fn4base, player.furnace.upgrades[3].times(tmp.fn.upgPow)))))
	if (player.elementary.entropy.upgrades.includes(25)) tmp.fn1base = tmp.fn1base.times(ExpantaNum.pow(tmp.fn4base, ExpantaNum.mul(player.furnace.upgrades[3], .2)))
	if (extremeStadiumActive("quantron", 4)) tmp.fn1base = ExpantaNum.sqrt(tmp.fn1base);
}

function updateCoalEff() {
	tmp.fn.eff = player.furnace.coal.add(1).log10().add(1).log10().mul(0.85);
	if (tmp.ach[35].has) tmp.fn.eff = tmp.fn.eff.times(2);
	if (player.tr.upgrades.includes(25) && !HCCBA("noTRU")) tmp.fn.eff = tmp.fn.eff.times(2);
	if (player.tr.upgrades.includes(31) && !HCCBA("noTRU")) tmp.fn.eff = tmp.fn.eff.times(1.8);
	if (hasMltMilestone(10)) tmp.fn.eff = tmp.fn.eff.pow(2);
	if (extremeStadiumActive("spectra", 2)) tmp.fn.eff = new ExpantaNum(0)
}

function updateBlueFlameCost() {
	tmp.fn.bfBase = inFC(4)?3.618:2
	tmp.fn.bfLB = inFC(4)?160:10
	if (inFC(6)) {
		tmp.fn.bfBase = ExpantaNum.pow(tmp.fn.bfBase, 2)
		tmp.fn.bfLB = ExpantaNum.pow(tmp.fn.bfLB, 3)
	}
	let scalBFlame;
	scalBFlame = player.furnace.blueFlame
	scalBFlame = doAllScaling(scalBFlame, "bf", false);
	scalBFlame = ExpantaNum.pow(tmp.fn.bfLB, ExpantaNum.pow(tmp.fn.bfBase, scalBFlame).sub(1)).times(1e6);
	tmp.fn.bfReq = scalBFlame;
	scalBFlame = player.furnace.coal.div(1e6).max(1).logBase(tmp.fn.bfLB).add(1).logBase(tmp.fn.bfBase).add(1);
	scalBFlame = doAllScaling(scalBFlame, "bf", true);
	scalBFlame = scalBFlame.add(1).floor();
	tmp.fn.bfBulk = scalBFlame;
}

function updateBlueFlameReset() {
	if (!tmp.fn.bfReset) tmp.fn.bfReset = function () {
		if (player.furnace.coal.lt(tmp.fn.bfReq)) return;
		player.furnace.coal = new ExpantaNum(0);
		player.furnace.upgrades = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)];
		player.furnace.blueFlame = player.furnace.blueFlame.add(1);
		updateFurnaceUpgradeCosts();
	};
}

function updateEnhFurnUpgPow() {
	tmp.fn.enh.upgPow = (player.elementary.times.gt(0) && tmp.fn.magma) ? tmp.fn.magma.eff : new ExpantaNum(1)
	if (inFC(6)) tmp.fn.enh.upgPow = tmp.fn.enh.upgPow.div(2)
}

function updateEnhCoalGain() {
	tmp.fn.enh.gain = ExpantaNum.pow(1.1, tmp.fn.enh.unl?player.furnace.blueFlame:0).sub(1).times(ExpantaNum.pow(tmp.fn.enh.upg1eff?tmp.fn.enh.upg1eff:1, player.furnace.enhancedUpgrades[0].add(tmp.fn.enh.upgs?tmp.fn.enh.upgs[1].extra:0).times(tmp.fn.enh.upgPow)))
	if (tmp.ach[116].has) tmp.fn.enh.gain = tmp.fn.enh.gain.times(ExpantaNum.pow(1.4, player.inf.pantheon.purge.power))
	if ((tmp.fn.enh.moltBr||new ExpantaNum(0)).gte(1)) tmp.fn.enh.gain = tmp.fn.enh.gain.times(tmp.fn.enh.moltBrEff||1)
	if (tmp.ach[131].has) tmp.fn.enh.gain = tmp.fn.enh.gain.times(100)
}

function updateEnhCoalEffs() {
	tmp.fn.enh.eff = tmp.fn.enh.unl?(player.furnace.enhancedCoal.add(1).log10().add(1).log10().add(1).log10().times(5)):new ExpantaNum(0)
	tmp.fn.enh.eff2exp = ExpantaNum.mul(player.furnace.enhancedUpgrades[12], tmp.fn.enh.upg13eff?tmp.fn.enh.upg13eff:0).times(tmp.fn.enh.upgPow).add(50)
	tmp.fn.enh.eff2 = tmp.fn.enh.unl?player.furnace.enhancedCoal.add(1).pow(tmp.fn.enh.eff2exp):new ExpantaNum(1)
}

function updateEnhFurnUpgCosts() {
	if (!tmp.fn.enh.upgs) tmp.fn.enh.upgs = {
		1: { base: new ExpantaNum(100) },
		2: { base: new ExpantaNum(250) },
		3: { base: new ExpantaNum(400) },
		4: { base: new ExpantaNum(1e4) },
		5: { base: new ExpantaNum(1.25e5) },
		6: { base: new ExpantaNum(1.6e6) },
		7: { base: new ExpantaNum(1e9) },
		8: { base: new ExpantaNum(6.25e10) },
		9: { base: new ExpantaNum(6.4e12) },
		10: { base: new ExpantaNum(1e32) },
		11: { base: new ExpantaNum(1e34) },
		12: { base: new ExpantaNum(1e36) },
		13: { base: new ExpantaNum(1e40) },
	};
	for (let n = 1; n <= 13; n++) {
		tmp.fn.enh.upgs[n].costAdj = new ExpantaNum(1);
		if (n==13) tmp.fn.enh.upgs[n].costAdj = new ExpantaNum(4/3);
		if (FCComp(6)) tmp.fn.enh.upgs[n].costAdj = tmp.fn.enh.upgs[n].costAdj.mul(tmp.fn.bfEffRecip.add(1).mul(1e10).log(1e10).sub(1).div(100).add(1).pow(100));
		if (inFC(6)) tmp.fn.enh.upgs[n].costAdj = tmp.fn.enh.upgs[n].costAdj.div(10);
		let scalEFN;
		scalEFN = player.furnace.enhancedUpgrades[n - 1];
		scalEFN = doAllScaling(scalEFN, "efn", false);
		scalEFN = ExpantaNum.pow(tmp.fn.enh.upgs[n].base.div(10), scalEFN.div(tmp.fn.enh.upgs[n].costAdj)).times(tmp.fn.enh.upgs[n].base);
		tmp.fn.enh.upgs[n].cost = scalEFN;
		scalEFN = player.furnace.enhancedCoal.div(tmp.fn.enh.upgs[n].base).logBase(tmp.fn.enh.upgs[n].base.div(10)).mul(tmp.fn.enh.upgs[n].costAdj);
		scalEFN = doAllScaling(scalEFN, "efn", true);
		scalEFN = scalEFN.add(1).floor();
		tmp.fn.enh.upgs[n].bulk = scalEFN;
		tmp.fn.enh.upgs[n].extra = (n<=9?((player.furnace.enhancedUpgrades[n+2]||new ExpantaNum(0)).add(tmp.fn.enh.upgs[n+3]?(tmp.fn.enh.upgs[n+3].extra?tmp.fn.enh.upgs[n+3].extra:0):0).times(tmp.fn.enh.upgPow)):new ExpantaNum(0)).times((n>6)?2:1)
		if (n<13) tmp.fn.enh.upgs[n].extra = tmp.fn.enh.upgs[n].extra.add(player.furnace.enhancedUpgrades[12].times(tmp.fn.enh.upgPow))
		if (!tmp.fn.enh.upgs[n].buy) tmp.fn.enh.upgs[n].buy = function () {
			if (player.furnace.enhancedCoal.lt(tmp.fn.enh.upgs[n].cost)) return;
			player.furnace.enhancedCoal = player.furnace.enhancedCoal.sub(tmp.fn.enh.upgs[n].cost);
			player.furnace.enhancedUpgrades[n - 1] = player.furnace.enhancedUpgrades[n - 1].add(1);
			updateTempFurnace();
		};
		if (!tmp.fn.enh.upgs[n].max) tmp.fn.enh.upgs[n].max = function () {
			if (player.furnace.enhancedCoal.lt(tmp.fn.enh.upgs[n].cost)) return;
			if (tmp.fn.enh.upgs[n].bulk.floor().lte(player.furnace.enhancedUpgrades[n - 1])) player.furnace.enhancedUpgrades[n - 1] = player.furnace.enhancedUpgrades[n - 1].add(1);
			player.furnace.enhancedUpgrades[n - 1] = player.furnace.enhancedUpgrades[n - 1].max(tmp.fn.enh.upgs[n].bulk.floor());
		};
	}
}

function updateEnhFurnUpgEffs() {
	let endMod = player.inf.endorsements.sub(25).max(0).root(1.57)
	tmp.fn.enh.upg1eff = ExpantaNum.pow(ExpantaNum.add(3, ExpantaNum.mul(0.1, endMod)), player.furnace.coal.add(1).log10().add(1).log10().add(1).log10().add(1)).times(ExpantaNum.pow(1.2, endMod))
	tmp.fn.enh.upg2eff = new ExpantaNum(0.9)
	tmp.fn.enh.upg3eff = new ExpantaNum(2.5)
	if (tmp.fn.pl) if (tmp.fn.pl.unl) {
		tmp.fn.enh.upg1eff = tmp.fn.enh.upg1eff.times(tmp.fn.pl.boosts[7])
		tmp.fn.enh.upg3eff = tmp.fn.enh.upg3eff.times(tmp.fn.pl.boosts[7])
	}
	tmp.fn.enh.upg13eff = ExpantaNum.add(30, endMod.div(3).floor().times(10).min(10))
	if (player.elementary.bosons.scalar.higgs.upgrades.includes("6;1;0")) tmp.fn.enh.upg13eff = tmp.fn.enh.upg13eff.add(player.furnace.enhancedUpgrades[12].pow(1.32))
	if (tmp.fn.pl) if (tmp.fn.pl.unl) tmp.fn.enh.upg13eff = tmp.fn.enh.upg13eff.times(tmp.fn.pl.boosts[8])
}

function updateMoltenBricks() {
	tmp.fn.enh.moltBrStart = player.elementary.theory.tree.unl?1e100:1e150
	tmp.fn.enh.moltBr = player.furnace.enhancedCoal.add(1).div(tmp.fn.enh.moltBrStart).pow(1/150)
	if (player.furnace.enhancedUpgrades[12].gte(6)) tmp.fn.enh.moltBr = tmp.fn.enh.moltBr.times(player.furnace.enhancedUpgrades[12].times(tmp.fn.enh.upgPow).sub(4).pow(0.6).max(1))
	if (player.elementary.times.gt(0) && tmp.fn.magma) tmp.fn.enh.moltBr = tmp.fn.enh.moltBr.times(tmp.fn.magma.eff2)
	if (player.elementary.bosons.scalar.higgs.upgrades.includes("0;1;6")) tmp.fn.enh.moltBr = tmp.fn.enh.moltBr.times(2)
	tmp.fn.enh.moltBrEffExp = player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;6")?1.25:1
	tmp.fn.enh.moltBrEff = ExpantaNum.pow(tmp.fn.enh.moltBr.gte(1)?tmp.fn.enh.moltBr.add(1):1, 27).pow(tmp.fn.enh.moltBrEffExp)
	tmp.fn.enh.moltBrEff2 = ExpantaNum.pow(tmp.fn.enh.moltBr.gte(1)?tmp.fn.enh.moltBr.add(1):1, 7).pow(ExpantaNum.pow(tmp.fn.enh.moltBrEffExp, 4))
}

function updateTempFurnace() {
	if (!tmp.fn) tmp.fn = {};
	updateBlueFlameEff();
	updateFurnUpgEffs();
	updateCoalGain();
	updateCoalEff();
	updateFurnaceUpgradeCosts();
	updateBlueFlameCost();
	updateBlueFlameReset();
	updateFNTabs();
	if (!tmp.fn.enh) tmp.fn.enh = {}
	tmp.fn.enh.unl = tmp.ach[111].has
	updateEnhFurnUpgPow();
	updateEnhCoalGain();
	updateEnhCoalEffs();
	updateEnhFurnUpgCosts();
	updateEnhFurnUpgEffs();
	updateMoltenBricks();
	
	updateTempMagma();
	updateTempPlasma();
}

function startFurnChall(x) {
	if (!modeActive("extreme")) return
	if (player.activeFC==x) {
		if (FCEnd() && !player.furnChalls.includes(x)) player.furnChalls.push(x)
		player.activeFC = 0
		if (x==6) tmp.elm.layer.reset(true)
		else tmp.collapse.layer.reset(true)
	} else {
		player.activeFC = x
		if (x==6) {
			tmp.elm.layer.reset(true)
			player.activeFC = x
		} else tmp.collapse.layer.reset(true)
	}
}

function FCEnd() {
	return player.furnace.blueFlame.gte(FC_GOAL[player.activeFC])
}

function inAnyFC() { return player.activeFC!=0&&modeActive("extreme") }

function inFC(x) { 
	let active = modeActive("extreme")?(player.activeFC==x):false 
	if (extremeStadiumActive("cranius")&&x<=5) active = true
	return active
}

function FCComp(x) {
	if (extremeStadiumActive("flamis")) return false
	return modeActive("extreme")?(player.furnChalls.includes(x)):false
}

const FC_GOAL = {
	0: new ExpantaNum(0),
	1: new ExpantaNum(11),
	2: new ExpantaNum(10),
	3: new ExpantaNum(10),
	4: new ExpantaNum(6),
	5: new ExpantaNum(12),
	6: new ExpantaNum(9),
}

// Furnace Tabs

const FN_TABBTN_SHOWN = {
	nfn: function() { return true },
	efn: function() { return tmp.ach[111].has },
	magma: function() { return tmp.ach[131].has },
	plasma: function() { return tmp.ach[171].has },
}

function isFNTabShown(name) {
	return fnTab == name;
}

function getFNTabBtnsShown() {
	let btns = [];
	for (j = 0; j < Object.keys(FN_TABBTN_SHOWN).length; j++)
		if (Object.values(FN_TABBTN_SHOWN)[i]()) btns.push(Object.keys(FN_TABBTN_SHOWN)[i]);
	return btns;
}

function updateFNTabs() {
	var tabs = document.getElementsByClassName("furnaceTab");
	for (i = 0; i < tabs.length; i++) {
		var el = new Element(tabs[i].id);
		el.setDisplay(isFNTabShown(tabs[i].id));
		var elT = new Element(tabs[i].id + "tabbtn");
		elT.changeStyle("visibility", getFNTabBtnsShown().includes(tabs[i].id)?"visible":"hidden");
	}
}

function showFurnaceTab(name) {
	fnTab = name;
}