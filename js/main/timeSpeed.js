function updateTempTimeSpeed() {
	tmp.timeSpeed = new ExpantaNum(1);
	if (modeActive("hard")) tmp.timeSpeed = tmp.timeSpeed.mul(0.75);
	if (modeActive("easy")) tmp.timeSpeed = tmp.timeSpeed.mul(2);
	if (modeActive("extreme")) tmp.timeSpeed = tmp.timeSpeed.div(0.75);
	if (player.tr.upgrades.includes(2) && !HCCBA("noTRU")) tmp.timeSpeed = tmp.timeSpeed.mul(tr2Eff());
	if (player.tr.upgrades.includes(7) && !HCCBA("noTRU")) tmp.timeSpeed = tmp.timeSpeed.mul(tr7Eff());
	if (player.tr.upgrades.includes(18) && !HCCBA("noTRU") && modeActive("extreme"))
		tmp.timeSpeed = tmp.timeSpeed.mul(TR_UPGS[18].current());
	if (player.tr.upgrades.includes(23) && !HCCBA("noTRU") && modeActive("extreme"))
		tmp.timeSpeed = tmp.timeSpeed.mul(TR_UPGS[23].current());
	if (tmp.ach[17].has) tmp.timeSpeed = tmp.timeSpeed.mul(1.01);
	if (tmp.ach[27].has) tmp.timeSpeed = tmp.timeSpeed.mul(1.1);
	if (tmp.ach[47].has) tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
	if (tmp.ach[18].has) tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
	if (tmp.ach[52].has) tmp.timeSpeed = tmp.timeSpeed.mul(1.2);
	if (tmp.ach[57].has) tmp.timeSpeed = tmp.timeSpeed.mul(1.1);
	if (tmp.ach[67].has) tmp.timeSpeed = tmp.timeSpeed.mul(1.111);
	if (player.rank.gt(35)) tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
	if (player.rank.gt(45)) tmp.timeSpeed = tmp.timeSpeed.mul(1.8);
	if (player.rank.gt(70)) tmp.timeSpeed = tmp.timeSpeed.mul(1.4);
	if (player.rank.gt(80)) tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
	if (player.rank.gt(90)) tmp.timeSpeed = tmp.timeSpeed.mul(1.75);
	if (player.rank.gt(125)) tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
	if (player.rank.gt(150)) tmp.timeSpeed = tmp.timeSpeed.mul(1.55);
	if (player.rank.gt(175)) tmp.timeSpeed = tmp.timeSpeed.mul(1.6);
	if (player.rank.gt(200)) tmp.timeSpeed = tmp.timeSpeed.mul(1.7);
	if (player.rank.gt(250)) tmp.timeSpeed = tmp.timeSpeed.mul(1.8);
	if (player.rank.gt(300)) tmp.timeSpeed = tmp.timeSpeed.mul(1.9);
	if (player.rank.gt(500)) tmp.timeSpeed = tmp.timeSpeed.mul(1.95);
	if (player.rank.gt(1000)) tmp.timeSpeed = tmp.timeSpeed.mul(1.98);
	if (player.rank.gt(10000)) tmp.timeSpeed = tmp.timeSpeed.mul(2);
	if (player.tier.gt(6)) tmp.timeSpeed = tmp.timeSpeed.mul(1.5);
	if (player.tier.gt(7)) tmp.timeSpeed = tmp.timeSpeed.mul(tierEffects(7));
	if (player.tier.gt(16)) tmp.timeSpeed = tmp.timeSpeed.mul(1.6);
	if (player.tier.gt(18)) tmp.timeSpeed = tmp.timeSpeed.mul(1.8);
	if (player.tier.gt(20)) tmp.timeSpeed = tmp.timeSpeed.mul(2);
	tmp.timeSpeed = tmp.timeSpeed.mul(getCadaverEff().max(1));
	if (hasCollapseMilestone(1)) tmp.timeSpeed = tmp.timeSpeed.mul(collapseMile1Eff());
	if (hasCollapseMilestone(2)) tmp.timeSpeed = tmp.timeSpeed.mul(modeActive("extreme")?2:5);
	if (tmp.inf.upgs.has("1;1")) tmp.timeSpeed = tmp.timeSpeed.mul(INF_UPGS.effects["1;1"]());
	if (tmp.inf.upgs.has("7;7")) tmp.timeSpeed = tmp.timeSpeed.mul(INF_UPGS.effects["7;7"]()["ts"]);
	if (tmp.inf.upgs.has("9;4")) tmp.timeSpeed = tmp.timeSpeed.mul(INF_UPGS.effects["9;4"]());
	if (tmp.inf.stadium.completed("eternity")) tmp.timeSpeed = tmp.timeSpeed.mul(STADIUM_REWARDS.effects.eternity());
	if (player.tr.upgrades.includes(34) && !HCCBA("noTRU") && modeActive("extreme")) tmp.timeSpeed = tmp.timeSpeed.mul(TR_UPGS[34].current())
	if (nerfActive("nerfTS")) tmp.timeSpeed = tmp.timeSpeed.pow(0.1);
	if (player.tr.upgrades.includes(30) && !HCCBA("noTRU") && modeActive("extreme")) tmp.timeSpeed = tmp.timeSpeed.pow(TR_UPGS[30].current());
	if (tmp.rockets) tmp.timeSpeed = tmp.timeSpeed.mul(tmp.rockets.tsPow)
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.timeSpeed = tmp.timeSpeed.mul(tmp.mlt.quilts[1].eff);
	if (modeActive("extreme") && tmp.timeSpeed.gte(Number.MAX_VALUE)) {
		tmp.timeSpeed = softcap(tmp.timeSpeed, "P", (player.tr.upgrades.includes(31) && !HCCBA("noTRU"))?0.45:1, Number.MAX_VALUE, 2)
	}
	if (modeActive("extreme")) if (tmp.fn) tmp.timeSpeed = tmp.timeSpeed.mul(tmp.fn.enh.eff2)
	if (((player.elementary.theory.active&&player.elementary.theory.depth.gte(player.modes==[]?25:20))||HCTVal("tv").gte(player.modes==[]?25:20)) && tmp.elm) tmp.timeSpeed = tmp.timeSpeed.pow(tmp.elm.theory.nerf)
	if (mltActive(2)) tmp.timeSpeed = tmp.timeSpeed.root(1.3);
	if (mltActive(5)) tmp.timeSpeed = tmp.timeSpeed.root(modeActive("extreme")?Math.PI:3.6);
	if (modeActive("extreme") && tmp.timeSpeed.gte(ExpantaNum.pow(DISTANCES.mlt, 300))) {
		let mlt300 = ExpantaNum.pow(DISTANCES.mlt, 300);
		tmp.timeSpeed = softcap(tmp.timeSpeed, "EP", 1, mlt300, 5)
	}
}
