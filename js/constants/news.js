var eheheTimes = 0;
var eheheResetAmt = 0;
var eheheResetReq = 1000;
var ehehe = function() { 
	eheheTimes+=eheheResetAmt+1;
	if (eheheTimes>=eheheResetReq) return 'EHEHE '+eheheTimes+': Copy paste the following to prestige: console.log(ehehePrestige())'
	else return 'EHEHE '+eheheTimes+': Copy paste the following into the console and press enter: console.log(ehehe())' 
}
var ehehePrestige = function() {
	if (eheheTimes<eheheResetReq) return "NOT ENOUGH EHEHE, YOU NEED "+eheheResetReq;
	else {
		eheheTimes = 0
		eheheResetReq = Math.round(eheheResetReq*1.2);
		eheheResetAmt++;
		return "EHEHE PRESTIGE POINTS: "+eheheResetAmt+": Multiply EHEHE gain by "+(eheheResetAmt+1)+" (copy paste the following into the console: console.log(ehehe()))"
	}
}

// const NEWS_DATA = {
// 	// No Conditions
// 	m1: ["Welcome to the truest of travels."},
// 	m2: ["We of the news ticker committee say hi."},
// 	m3: ["Accelerate from here to the end of the universe."},
// 	m4: ["Maximum Velocity is the scourge of the multiverse."},
// 	m5: ["Cancer notation has been kept away for now..."},
// 	m6: ["Try to win without achievements"},
// 	m7: ["You have probably ran over at least 1 snail so far on your journey"},
// 	m8: ["If you want to be cursed, try Engineering Notation"},
// 	m9: ["There is no True Infinity here"},
// 	m10: ["Try a byte of binary notation!"},
// 	m11: ["Pentation is for the weak"},
// 	m12: ["If you can see this, you are officially Canadian"},
// 	m13: ["5 lighthours until the update"},
// 	m14: ["You should try Absurd Mode, you might have fun"},
// 	m15: ["Never gonna give you down, never gonna let you up - Ack Ristley"},
// 	m16: ["We report that there is a very fast man Naruto-running towards Area 51, but 5 months too late"},
// 	m17: ["This game was inspired by Antimatter Dimensions by Hevipelle (and its mods, especially NG+++)"},
// 	m18: ["Offline progression is weak here, but only because we don't want you to leave :("},
// 	m19: ["People say that this is unbalanced, but really it's just that all the other games are too balanced."},
// 	m20: ["The mysterious virus of Corvid Twenty has been dealt with (at least for now)"},
// 	m21: ["Why progress when you can revert back to square one?"},
// 	m22: ["The high gods are looking down at you (or up, maybe you're further than I thought)"},
// 	m23: ["If I'm not mistaken, the current date is "+new Date().toISOString().substring(0, 10)+"."},
// 	m24: ["Egg is the next mechanic"},
// 	m25: ["This game doesn't lag, your eyeballs are just too dilated."},
// 	m26: ["Please don't disable the news, it's my only way to get my voice heard..."},
// 	m27: ["Now that we use OmegaNum, we have become ordinals."},
// 	m28: ["There is a timewall coming up, I can just sense it."},
// 	m29: ["Bad testing"},
// 	m30: ["Click <a href='https://www.youtube.com/watch?v=lXMskKTw3Bc' style='color: grey;'>here</a> to unlock something special..."},
// 	m31: ['"Can you make this a news ticker?" - The guy who made Tree Game'},
// 	m32: ['"Ya like jazz?" - BBB'},
// 	m33: ["Remember to export often!"},
// 	m34: ["Gotta wonder what you're using to travel this far"},
// 	m35: ["BREAKING NEWS: Florida Man goes out for a jog: becomes High God of the Omniverse"},
// 	m36: ["This feature is definitely not a ripoff of anything else..."},
// 	m37: ["This is not the 69th news ticker"},
// 	m38: ["If you saw the loading screen, I know, it's really creative."},
// 	m39: ["If you can see this, get back to playing the game"},
// 	m40: ["There is a news ticker entry out there that has apparently tried to rick roll people. So far only they have 1 known victim."},
// 	m41: ["What if you wanted to go to heaven, but god said <span class='sc'>(softcapped)</span>"},
// 	m42: ["Softcapped: the game"},
// 	m43: ['"Playing the game 5 times is fun" - Bugged out Ink'},
// 	m44: ['"Gaming." - Danny DeVito'},
// 	m45: ['"I need a raise" - Ink after wasting his life actually enjoying something'},
// 	m46: ["And the winner is, Leonardo DiCaprio"},
// 	m47: ['"But thats just a theory, a game theory!"- Matpat'},
// 	m48: ['"But thats just a theory, a film theory!"- Matpat'},
// 	m49: ['"But thats just a theory, a food theory!"- Patmat'},
// 	m50: ['"Nont" - Jacorb after 5 hours has passed'},
// 	m51: ["The most recent feature of Distance Incremental is not a ripoff, or at least you can't prove that in court"},
// 	m52: ["I should make a mod of Antimatter Dimensions that releases Reality before Hevipelle does..."},
// 	m53: ["Maybe you're actually Slabdrill and just don't realize it"},
// 	m54: ["Kirb is still faster than you"},
// 	m55: ["Hotkeys are the latest fashion trend"},
// 	m56: ["Mom, look! I'm on the news!"},
// 	m57: ["Are we getting paid for this?"},
// 	m58: ['"If you stare too long at the ticker, the ticker stares back at you" - Some guy that played Antimatter Dimensions'},
// 	m59: ["Are you the real Slim Shady? If so, get out of your chair as soon as you feasibly can."},
// 	m60: ["Click <a href='https://www.youtube.com/watch?v=xfr64zoBTAQ' style='color: grey;'>this</a> to walk 1 extra micrometer, whatever that means..."},
// 	m61: ['"Wait... Its all softcapped?"   "Always has been."   *Gets shot by (softcapped)*'},
// 	m62: ["Click <a href='#' onclick='return false;'>here</a> to make nothing happen"},
// 	m63: ["Due to a recent influx of news stories we have decided to make the news ticker <span class='sc'>(softcapped)</span>"},
// 	m64: ['"I wonder if my lore will ever catch up to the most recent update" -CRG'},
// 	m65: ["This message has been (softcapped) so you can't re-"},
// 	m66: ["Maybe try getting some distance in real life? It's just a suggestion..."},
// 	m67: ['"The engineers have invaded Distance Incremental and have invented their own notation! Get out while you still can!" - A Scientist'},
// 	m68: ['"I heard that Absurd Mode is fun, might try it out later" - Some new player who just finished normal mode'},
// 	m69: ['"Nice." - The guy who made the 69th news ticker message'},
// 	m70: ["A softcapped is you!"},
// 	m71: ['"Absurd mode is just dumb." - A reddit user'},
// 	m72: ['I tried looking for some inflation, but suddenly I heard a quiet yet scary noise: "softcapped"'},
// 	m73: ["1 Star Rating: Egg isn't the next mechanic"},
// 	m74: ["Crackle comes in the egg update in 5 minutes"},
// 	m75: ["Does fome even exist?"},
// 	m76: ["There are at least 2 rick rolls in the news... can you collect them all???"},
// 	m77: ["&quot;It's Siivagunner, not Silvagunner&quot; - somebody that once told me that they were gonna give me up"},
// 	m78: ["Breaking News: Florida man starts speaking French after another news ticker tells him that he's officially Canadian"},
// 	m79: ["I'm gonna add some new news ticker messages, so I need ideas"},
// 	m80: ["Jacorbian balancing is liked now, but in 10 years, incremental games will be completable in under 3 minutes."},
// 	m81: ["Maybe this is a meta joke. Maybe this is a bored game dev running out of news ticker ideas. Who knows!"},
// 	m82: ["This game is brought to you by Jacorb, the incremental game dev who has no idea what he's doing"},
// 	m83: ["In an alternate universe, all the (softcapped) are replaced with (obscured), the scalings have no names, and Distance Incremental has weeklong timewalls."},
// 	m84: ["I wonder if you can escape the multiverse..."},
// 	m85: ['"Darn it, I have to restart my lore because we are not even at the thing after multiverse!" -CRG'},
// 	m86: ['"Canada does not exist..." -Him'},
// 	m87: ["Jacorb only created Hiker's Dream because he doesn't exercise."},
// 	m88: ["You may have noticed that there's a donate button. If you didn't, well you have noticed now!"},
// 	m89: ["For all the tickers saying you are Canadian: Canadian or not, you are enjoying this game."},
// 	m90: ["In 2073, we will be at v193.6, with over 200 prestige layers, and the game will cost over $20.00"},
// 	m91: ["Well yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually -INFINITE LOOP-"},
// 	m92: ["Check the console after pressing <a href='#' onclick='console.log(ehehe()); return false;'>here</a>..."},
// 	m93: ["Hello puny mortals. I have come back in time to tell you that this game will be dead in two days... or maybe I've come back too far?"},
// 	m94: ['"If I edit a message to ping, will it actually ping the user?" - New Discord User'},
// 	m95: ['"Sea urchins, malt? Whats next, cream pie?" - A food nerd'},
// 	m96: ["Jacorb finds it mind-boggling that DI was first released publicly on May 1st 2020. You'd better remember that, you might see it in a Kahoot!"},
// 	m97: ["Ticker: Ticker: Ticker: Ticker: Ticker: Ticker: Ticker: T- go to #spam please :)"},
// 	m98: ["Paradoxes 101: This statement is false."},
// 	m99: ["Paradoxes 201: The following statement is false. The previous statement is true."},
// 	m100: ["Paradoxes 301: The following statement is false. The following statement is false. The first statement is false."},
// 	m101: ["Jacorb's mental instability is increasing quite quickly. If he reaches 100% mental instability, the multiverse implodes."},
// 	m102: ["Has this game been abandoned by its developer? "+((Math.random()>0.5)?"Obviously yes.":"Definitely not.")},
// 	m103: ['"When is the egg update coming?" - The Almighty Orb about his own game'},
// 	m104: ["We're lucky that our universes were never infected, I'm sure there's some parallel multiverse out there where that's an issue..."},
// 	m105: ["Some people say that each multiverse does not have its own High Gods. Those people tend not to survive very long around here."},
// 	m106: ["Some people say that there is only one set of High Gods. Those people tend not to survive very long around here."},
// 	m107: ["What in the world is this mod?"},
// 	m108: ["It has become a tradition to mod Distance Incremental"},
// 	m109: ["SuperLog is a bad thing !!!!"},
// 	m110: ["Unfortunately, Pelle wasn't so good at decision making. During the final stage of Antimatter Dimensions, The [Spoiler] [Spoiler] [Spoiler] [Spoiler] [Spoiler] [Spoiler] [Spoiler] ... And then you get a lot of antimatter and you win!"},
// 	m111: ["🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍 - Almost every single BadBoyHalo donation back in 2019-2020"},
// 	m112: ["Not like other lore based incrementals."},
// 	m113: ["You have been " + ["Scaled", "Superscaled", "Hyper Scaled", "Atomic Scaled", "Trolled"][Math.floor(Math.random()*5)] + "."},
// 	m114: ["Hey at least its not like Incremental Mass Rewritten (and it's forks) where its like: \"Due to Massive Meme overflow, we've decided to take away your admin powers, reducing your meme exponent count by ^0.74590.\"  Wait. Why am I making news? "},
// 	m115: ["Oh hey! I can swear here! f*ck f*ck f*ck!"},

// 	// Distance-based Conditions
// 	d1: [
// 		"You've travelled more than me today",
// 		function () {
// 			return player.distance.gte(500);
// 		}
// 	},
// 	d2: [
// 		"The world is your pebble",
// 		function () {
// 			return player.distance.gte(DISTANCES.ly);
// 		}
// 	},
// 	d3: [
// 		"I guess multiple universes exist then",
// 		function () {
// 			return player.distance.gte(DISTANCES.uni);
// 		}
// 	},
// 	d4: [
// 		"To Infinity and beyond!",
// 		function () {
// 			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, Number.MAX_VALUE));
// 		}
// 	},
// 	d5: [
// 		"You are a very dedicated addict",
// 		function () {
// 			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e100000"));
// 		}
// 	},
// 	d6: [
// 		"Stop grinding or you'll go insane within the next 5 hours!",
// 		function () {
// 			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e2000000"));
// 		}
// 	},
// 	d7: [
// 		"Uni sounds like a prestige currency",
// 		function () {
// 			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, 5));
// 		}
// 	},
// 	d8: [
// 		"Welcome to the Fome Club...",
// 		function() {
// 			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e42000000"));
// 		}
// 	},
// 	d9: [
// 		"Heya. You've been busy, huh? So, i've got a question for ya. Do you think even the worst person can change? That everybody can be a good person, if they just try? Heh heh heh he... All right. Well here's a better question. Do you wanna have a bad time? 'Cause if you take another step forward... You are REALLY not going to like what happens next. Welp. Sorry, old lady. This is why i never make promises.",
// 		function() {
// 			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e108000000"));
// 		}
// 	},
// 	d10: [
// 		"The multiverse isn't enough for you, is it?",
// 		function() { return player.distance.gte(DISTANCES.mlt) },
// 	},

// 	// Mode-based Conditions
// 	mod1: [
// 		"How could you do this to yourself??",
// 		function () {
// 			return player.modes.includes("hard");
// 		}
// 	},
// 	mod2: [
// 		"No more achievement grinding for you, buddy",
// 		function () {
// 			return player.modes.includes("aau");
// 		}
// 	},
// 	mod3: [
// 		"This mode is the most boring...",
// 		function () {
// 			return player.modes.includes("na");
// 		}
// 	},
// 	mod4: [
// 		"This is illegal! You cannot do this to your game!",
// 		function () {
// 			return player.modes.includes("easy");
// 		}
// 	},
// 	mod5: [
// 		"The oyster is your oyster is your oyster is your oyster is your oyster",
// 		function () {
// 			return player.modes.includes("extreme");
// 		}
// 	},
// 	mod6: [
// 		"How can you even read this?",
// 		function () {
// 			return player.modes.includes("absurd");
// 		}
// 	},
// 	mod7: [
// 		"If you're really a hiker, then go for a hike.",
// 		function () {
// 			return player.modes.includes("hikers_dream")
// 		}
// 	},
// 	mod8: [
// 		"Hiker's Dream was brought to you by ~reda~ (if you're angry about anything in this mode, it's his fault)",
// 		function () {
// 			return player.modes.includes("hikers_dream")
// 		}
// 	},

// 	// Chance-based Conditions
// 	c1: [
// 		"This is a rare news ticker! You win a negligible amount of minor satisfaction!",
// 		function () {
// 			return Math.random() < 0.25;
// 		}
// 	},
// 	c2: [
// 		"This is a super rare news ticker! You win a decent amount of satisfaction...",
// 		function () {
// 			return Math.random() < 0.1;
// 		}
// 	},
// 	c3: [
// 		"This is an ultra rare news ticker! You win an obscene amount of happiness!",
// 		function () {
// 			return Math.random() < 0.0025;
// 		}
// 	},
// 	c4: [
// 		"All your smarts are no chance for dumb luck (How tf did you get a 0.00000001% chance news ticker??)",
// 		function () {
// 			return Math.random() < 1e-9;
// 		}
// 	},
// 	c5: [
// 		"Your luck skills have broke the universe (How tf did you get a 0.00000000000001% chance news ticker??)",
// 		function () {
// 			return Math.random() < 1e-15;
// 		}
// 	},
// 	c6: [
// 		"Your luck skills have broke the multiverse, and everything within it  (brooooooooooooooooooooooooooooo you're cheating somehow this is a 1e-28% chance news ticker brooooooooooooooooooooooooooooo you're cheating somehow this is a 1e-28% chance news ticker brooooooooooooooooooooooooooooo you're cheating somehow this is a 1e-28% chance news ticker i extended this a lot because you don't wanna miss it lol)",
// 		function() {
// 			return Math.random() < 1e-30;
// 		}
// 	},
// 	c7: [
// 		"If you went through 1 news ticker every planck time, and waited until the end of the universe's life, you still should not see this. (you lived)",
// 		function() {
// 			return Math.random() < 1e-80;
// 		}
// 	},

// 	// Achievement-based Conditions
// 	a1: [
// 		"You're a superstar in this world of false light",
// 		function () {
// 			return player.achievements.length >= 5;
// 		}
// 	},
// 	a2: [
// 		"Wow, you are slightly dedicated",
// 		function () {
// 			return player.achievements.length >= 10;
// 		}
// 	},
// 	a3: [
// 		"Out to the world beyond the rocket",
// 		function () {
// 			return player.achievements.length >= 20;
// 		}
// 	},
// 	a4: [
// 		"Fueling from here to the grave",
// 		function () {
// 			return player.achievements.length >= 30;
// 		}
// 	},
// 	a5: [
// 		"Reversing time since 2116",
// 		function () {
// 			return player.achievements.length >= 40;
// 		}
// 	},
// 	a6: [
// 		"Death is the new life",
// 		function () {
// 			return player.achievements.length >= 50;
// 		}
// 	},
// 	a7: [
// 		"Nice",
// 		function () {
// 			return player.achievements.length == 69;
// 		}
// 	},
// 	a8: [
// 		"There is no discord in the options menu. Don't look for it please...",
// 		function () {
// 			return player.achievements.length >= 80;
// 		}
// 	},
// 	a9: [
// 		"Get back here in Absurd Mode, I dare you",
// 		function () {
// 			return player.achievements.length >= 96 && !player.modes.includes("absurd");
// 		}
// 	},

// 	// Special Conditions
// 	s1: [
// 		"Patcail thought Jacorb took his collapse feature. But if he did then I guess Patcail should name his game Ordinal Dimensions. - NiceManKSP",
// 		function () {
// 			return player.collapse.unl;
// 		}
// 	},
// 	s2: [
// 		"Pathogens more like coronavirus",
// 		function () {
// 			return player.pathogens.unl;
// 		}
// 	},
// 	s3: [
// 		"The universe was calm, but then the Pathogen Nation attacked.",
// 		function () {
// 			return player.elementary.times.gt(0);
// 		}
// 	},
// 	s4: [
// 		"Leptons sound like a soft drink - Mark's Rival's Rival",
// 		function () {
// 			return player.elementary.times.gt(0);
// 		}
// 	},
// 	s5: [
// 		"The Bosons will Gauge out your eyes",
// 		function () {
// 			return player.elementary.times.gt(0);
// 		}
// 	},
// 	s6: [
// 		"The news ticker committee notice that you are starting to move. They are not quite afraid just yet.",
// 		function () {
// 			return player.inf.endorsements.gt(0);
// 		}
// 	},
// 	s7: [
// 		"We released the Higgs Update before Aarex! Yay!",
// 		function () {
// 			return player.elementary.times.gt(0);
// 		}
// 	},
// 	s8: [
// 		"Weren't we already using those?",
// 		function () {
// 			return player.rockets.gt(0);
// 		}
// 	},
// 	s9: [
// 		"It's time to grind some Elementaries!",
// 		function () {
// 			return player.elementary.times.gte(3);
// 		}
// 	},
// 	s10: [
// 		"NASA can't afford to fund you anymore.",
// 		function () {
// 			return player.tr.cubes.gt(0);
// 		}
// 	},
// 	s11: [
// 		'"1/5 no botbot" - Guy after unlocking the Auto-Robots Automator',
// 		function () {
// 			return player.automators["robots"]
// 		}
// 	},
// 	s12: [
// 		'"To elementary, and beyond!" - Buzz e600k uni',
// 		function () {
// 			return player.distance.gte("1e600027")
// 		}
// 	},
// 	s13: [
// 		'"I want more PP" - Guy who completes the game and sees no Pantheon Boosts',
// 		function () {
// 			return player.inf.pantheon.unl
// 		}
// 	},
// 	s14: [
// 		"What if crackle is an affiliate of Slabdrill?",
// 		function () {
// 			return player.inf.derivatives.unl
// 		},
// 	},
// 	s15: [
// 		"Accelerons were your biggest mistake",
// 		function () {
// 			return player.elementary.theory.accelerons.unl
// 		},
// 	},
// 	s16: [
// 		"We were originally planning on giving a pg-3 rating for this game, but after Cadavers were added, we have decided to up it to 18+",
// 		function () {
// 			return player.collapse.cadavers.gt(0)
// 		},
// 	},
// 	s17: [
// 		"You have achieved true lightspeed!",
// 		function () {
// 			return player.bestV.gte(299792458)
// 		},
// 	},
// 	s18: [
// 		"Physics can no longer hold me down!",
// 		function () {
// 			return player.bestV.gte(299792459)
// 		},
// 	},
// 	s19: [
// 		'"But where are the replicants?" - NG+++ fan after unlocking preons',
// 		function () {
// 			return player.elementary.theory.preons.unl
// 		}
// 	},
// 	s20: [
// 		"This is a crime against Reality.",
// 		function () {
// 			return player.inf.pantheon.purge.active && !player.inf.stadium.current=="reality"
// 		}
// 	},
// 	s21: [
// 		'"Help" - People who realized that Cadavers are just bodies',
// 		function () {
// 			return player.collapse.cadavers.gt(0)
// 		}
// 	},
// 	s22: [
// 		"Wait, Ordinal Dimensions is taken?",
// 		function () {
// 			return player.collapse.unl;
// 		}
// 	},
// 	s23: [
// 		"Fome does exist!",
// 		function() { return player.elementary.foam.unl },
// 	},
// 	s24: [
// 		"Time to refoam your protofoam.",
// 		function() { return player.elementary.foam.maxDepth.gte(5) },
// 	},
// 	s25: [
// 		"Entropy is the arrow of time, leading you to the future (hopefully it doesn't take you too far into the future)",
// 		function() { return player.elementary.entropy.unl },
// 	},
// 	s26: [
// 		"I guess it's time to sacrifice your Fermions into Skyrmions!",
// 		function() { return player.elementary.sky.unl },
// 	},
// 	s27: [
// 		"This isn't an Aarex game, there is no Elementary News Ticker...",
// 		function() { return player.elementary.particles.gt(0) },
// 	},
// 	s28: [
// 		"Believe it or not, the news ticker is this game's only source of RNG.",
// 		function() { return player.distance.gte(1e86)&&player.distance.lte("1e10000") },
// 	},
// 	s29: [
// 		"This message started at the exact moment you reached the end of the multiverse!",
// 		function() { return !player.ended&&player.distance.gte(DISTANCES.mlt) },
// 	},
// 	s30: [
// 		"Wow you completed TV20, a completely meaningless quest that got you no reward. How do you feel now?",
// 		function() { return player.elementary.theory.depth.gt(20) },
// 	},
// 	s31: [
// 		"Gonna transfoam myself to Skyrmions!",
// 		function() { return player.elementary.sky.unl },
// 	},
// 	s32: [
// 		"Florida Man tried to reach the end of multiverse, but dissolved into 3 quantum fields.",
// 		function() { return player.elementary.foam.unl },
// 	},
// 	s33: [
// 		'"Elementary is cool, it has hadronic challenged me to make up theories and has brought to photonic light a new meme: fome, I must go now, my skyrmions need me." - A really punny guy',
// 		function() { return player.elementary.sky.unl },
// 	},
// 	s34: [
// 		"No wait please, don't obliterate the multiverse, I need it to survive!",
// 		function() { return player.distance.gte(DISTANCES.mlt)&&player.mlt.times.eq(0) },
// 	},
// 	s35: [
// 		"If the world is your oyster, then the multiverse is your ocean. That's right, you own the ocean now.",
// 		function() { return player.mlt.times.gt(0) },
// 	},
// 	s36: [
// 		'"But where are the pentogens?" - Incremental Mass fan after unlocking multiverses',
// 		function () {
// 			return player.mlt.times.gt(0)
// 		}
// 	},
// 	s37: [
// 		"lOoK iT'S cRaCKlE!?!?!?!!",
// 		function() { return player.inf.derivatives.amts.crackle!==undefined },
// 	},
// 	s38: [
// 		'"(Derivative after the latest you have unlocked) when?" - A derivative enthusiast',
// 		function() { return player.mlt.highestCompleted>=2 },
// 	},
// 	s39: [
// 		"Even the High Gods aren't perfect. Although they're supposed to look over the multiverse, there are some threats that are just... too much.",
// 		function() { return player.elementary.times.gte(555) && player.elementary.times.lt(777777) },
// 	},
// 	s40: [
// 		"There are more multiverses out there, somewhere... I wonder what sort of chaos is going on over there.",
// 		function() { return player.mlt.highestCompleted>=5 },
// 	},
// 	custom1: [
// 		"",
// 		function() {
// 			let msg
// 			let show
// 			show = true
// 			if (player.distance.gte(`e${Number.MAX_VALUE}`)) {
// 				msg = `Shit, somehow you were fast enough to go around even your mother... I guess I lost =P`
// 			} else {
// 				msg = `You've only travelled ${showNum(player.distance.max(10).log(10).log(Number.MAX_VALUE).mul(100))}% around your mom.`
// 			}
// 			return {msg: msg, if: show}
// 		}
// 	},
// };

const NEWS_DATA = {
	m1()   { return { msg: "Welcome to the truest of travels.", if: true } },
	m2()   { return { msg: "We of the news ticker committee say hi.", if: true } },
	m3()   { return { msg: "Accelerate from here to the end of the universe.", if: true } },
	m4()   { return { msg: "Maximum Velocity is the scourge of the multiverse.", if: true } },
	m5()   { return { msg: "Cancer notation has been kept away for now...", if: true } },
	m6()   { return { msg: "Try to win without achievements", if: true } },
	m7()   { return { msg: "You have probably ran over at least 1 snail so far on your journey", if: true } },
	m8()   { return { msg: "If you want to be cursed, try Engineering Notation", if: true } },
	m9()   { return { msg: "There is no True Infinity here", if: true } },
	m10()  { return { msg: "Try a byte of binary notation!", if: true } },
	m11()  { return { msg: "Pentation is for the weak", if: true } },
	m12()  { return { msg: "If you can see this, you are officially Canadian", if: true } },
	m13()  { return { msg: "5 lighthours until the update", if: true } },
	m14()  { return { msg: "You should try Absurd Mode, you might have fun", if: true } },
	m15()  { return { msg: "Never gonna give you down, never gonna let you up - Ack Ristley", if: true } },
	m16()  { return { msg: "We report that there is a very fast man Naruto-running towards Area 51, but 5 months too late", if: true } },
	m17()  { return { msg: "This game was inspired by Antimatter Dimensions by Hevipelle (and its mods, especially NG+++)", if: true } },
	m18()  { return { msg: "Offline progression is weak here, but only because we don't want you to leave :(", if: true } },
	m19()  { return { msg: "People say that this is unbalanced, but really it's just that all the other games are too balanced.", if: true } },
	m20()  { return { msg: "The mysterious virus of Corvid Twenty has been dealt with (at least for now)", if: true } },
	m21()  { return { msg: "Why progress when you can revert back to square one?", if: true } },
	m22()  { return { msg: "The high gods are looking down at you (or up, maybe you're further than I thought)", if: true } },
	m23()  { return { msg: "If I'm not mistaken, the current date is "+new Date().toISOString().substring(0, 10)+".", if: true } },
	m24()  { return { msg: "Egg is the next mechanic", if: true } },
	m25()  { return { msg: "This game doesn't lag, your eyeballs are just too dilated.", if: true } },
	m26()  { return { msg: "Please don't disable the news, it's my only way to get my voice heard...", if: true } },
	m27()  { return { msg: "Now that we use OmegaNum, we have become ordinals.", if: true } },
	m28()  { return { msg: "There is a timewall coming up, I can just sense it.", if: true } },
	m29()  { return { msg: "Bad testing", if: true } },
	m30()  { return { msg: "Click <a href='https://www.youtube.com/watch?v=lXMskKTw3Bc' style='color: grey;'>here</a> to unlock something special...", if: true } },
	m31()  { return { msg: '"Can you make this a news ticker?" - The guy who made Tree Game', if: true } },
	m32()  { return { msg: '"Ya like jazz?" - BBB', if: true } },
	m33()  { return { msg: "Remember to export often!", if: true } },
	m34()  { return { msg: "Gotta wonder what you're using to travel this far", if: true } },
	m35()  { return { msg: "BREAKING NEWS: Florida Man goes out for a jog: becomes High God of the Omniverse", if: true } },
	m36()  { return { msg: "This feature is definitely not a ripoff of anything else...", if: true } },
	m37()  { return { msg: "This is not the 69th news ticker", if: true } },
	m38()  { return { msg: "If you saw the loading screen, I know, it's really creative.", if: true } },
	m39()  { return { msg: "If you can see this, get back to playing the game", if: true } },
	m40()  { return { msg: "There is a news ticker entry out there that has apparently tried to rick roll people. So far only they have 1 known victim.", if: true } },
	m41()  { return { msg: "What if you wanted to go to heaven, but god said <span class='sc'>(softcapped)</span>", if: true } },
	m42()  { return { msg: "Softcapped: the game", if: true } },
	m43()  { return { msg: '"Playing the game 5 times is fun" - Bugged out Ink', if: true } },
	m44()  { return { msg: '"Gaming." - Danny DeVito', if: true } },
	m45()  { return { msg: '"I need a raise" - Ink after wasting his life actually enjoying something', if: true } },
	m46()  { return { msg: "And the winner is, Leonardo DiCaprio", if: true } },
	m47()  { return { msg: '"But thats just a theory, a game theory!"- Matpat', if: true } },
	m48()  { return { msg: '"But thats just a theory, a film theory!"- Matpat', if: true } },
	m49()  { return { msg: '"But thats just a theory, a food theory!"- Patmat', if: true } },
	m50()  { return { msg: '"Nont" - Jacorb after 5 hours has passed', if: true } },
	m51()  { return { msg: "The most recent feature of Distance Incremental is not a ripoff, or at least you can't prove that in court", if: true } },
	m52()  { return { msg: "I should make a mod of Antimatter Dimensions that releases Reality before Hevipelle does...", if: true } },
	m53()  { return { msg: "Maybe you're actually Slabdrill and just don't realize it", if: true } },
	m54()  { return { msg: "Kirb is still faster than you", if: true } },
	m55()  { return { msg: "Hotkeys are the latest fashion trend", if: true } },
	m56()  { return { msg: "Mom, look! I'm on the news!", if: true } },
	m57()  { return { msg: "Are we getting paid for this?", if: true } },
	m58()  { return { msg: '"If you stare too long at the ticker, the ticker stares back at you" - Some guy that played Antimatter Dimensions', if: true } },
	m59()  { return { msg: "Are you the real Slim Shady? If so, get out of your chair as soon as you feasibly can.", if: true } },
	m60()  { return { msg: "Click <a href='https://www.youtube.com/watch?v=xfr64zoBTAQ' style='color: grey;'>this</a> to walk 1 extra micrometer, whatever that means...", if: true } },
	m61()  { return { msg: '"Wait... Its all softcapped?"   "Always has been."   *Gets shot by (softcapped)*', if: true } },
	m62()  { return { msg: "Click <a href='#' onclick='return false;'>here</a> to make nothing happen", if: true } },
	m63()  { return { msg: "Due to a recent influx of news stories we have decided to make the news ticker <span class='sc'>(softcapped)</span>", if: true } },
	m64()  { return { msg: '"I wonder if my lore will ever catch up to the most recent update" -CRG', if: true } },
	m65()  { return { msg: "This message has been (softcapped) so you can't re-", if: true } },
	m66()  { return { msg: "Maybe try getting some distance in real life? It's just a suggestion...", if: true } },
	m67()  { return { msg: '"The engineers have invaded Distance Incremental and have invented their own notation! Get out while you still can!" - A Scientist', if: true } },
	m68()  { return { msg: '"I heard that Absurd Mode is fun, might try it out later" - Some new player who just finished normal mode', if: true } },
	m69()  { return { msg: '"Nice." - The guy who made the 69th news ticker message', if: true } },
	m70()  { return { msg: "A softcapped is you!", if: true } },
	m71()  { return { msg: '"Absurd mode is just dumb." - A reddit user', if: true } },
	m72()  { return { msg: 'I tried looking for some inflation, but suddenly I heard a quiet yet scary noise: "softcapped"', if: true } },
	m73()  { return { msg: "1 Star Rating: Egg isn't the next mechanic", if: true } },
	m74()  { return { msg: "Crackle comes in the egg update in 5 minutes", if: true } },
	m75()  { return { msg: "Does fome even exist?", if: true } },
	m76()  { return { msg: "There are at least 2 rick rolls in the news... can you collect them all???", if: true } },
	m77()  { return { msg: "&quot;It's Siivagunner, not Silvagunner&quot; - somebody that once told me that they were gonna give me up", if: true } },
	m78()  { return { msg: "Breaking News: Florida man starts speaking French after another news ticker tells him that he's officially Canadian", if: true } },
	m79()  { return { msg: "I'm gonna add some new news ticker messages, so I need ideas", if: true } },
	m80()  { return { msg: "Jacorbian balancing is liked now, but in 10 years, incremental games will be completable in under 3 minutes.", if: true } },
	m81()  { return { msg: "Maybe this is a meta joke. Maybe this is a bored game dev running out of news ticker ideas. Who knows!", if: true } },
	m82()  { return { msg: "This game is brought to you by Jacorb, the incremental game dev who has no idea what he's doing", if: true } },
	m83()  { return { msg: "In an alternate universe, all the (softcapped) are replaced with (obscured), the scalings have no names, and Distance Incremental has weeklong timewalls.", if: true } },
	m84()  { return { msg: "I wonder if you can escape the multiverse...", if: true } },
	m85()  { return { msg: '"Darn it, I have to restart my lore because we are not even at the thing after multiverse!" -CRG', if: true } },
	m86()  { return { msg: '"Canada does not exist..." -Him', if: true } },
	m87()  { return { msg: "Jacorb only created Hiker's Dream because he doesn't exercise.", if: true } },
	m88()  { return { msg: "You may have noticed that there's a donate button. If you didn't, well you have noticed now!", if: true } },
	m89()  { return { msg: "For all the tickers saying you are Canadian: Canadian or not, you are enjoying this game.", if: true } },
	m90()  { return { msg: "In 2073, we will be at v193.6, with over 200 prestige layers, and the game will cost over $20.00", if: true } },
	m91()  { return { msg: "Well yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually -INFINITE LOOP-", if: true } },
	m92()  { return { msg: "Check the console after pressing <a href='#' onclick='console.log(ehehe()); return false;'>here</a>...", if: true } },
	m93()  { return { msg: "Hello puny mortals. I have come back in time to tell you that this game will be dead in two days... or maybe I've come back too far?", if: true } },
	m94()  { return { msg: '"If I edit a message to ping, will it actually ping the user?" - New Discord User', if: true } },
	m95()  { return { msg: '"Sea urchins, malt? Whats next, cream pie?" - A food nerd', if: true } },
	m96()  { return { msg: "Jacorb finds it mind-boggling that DI was first released publicly on May 1st 2020. You'd better remember that, you might see it in a Kahoot!", if: true } },
	m97()  { return { msg: "Ticker: Ticker: Ticker: Ticker: Ticker: Ticker: Ticker: T- go to #spam please :)", if: true } },
	m98()  { return { msg: "Paradoxes 101: This statement is false.", if: true } },
	m99()  { return { msg: "Paradoxes 201: The following statement is false. The previous statement is true.", if: true } },
	m100() { return { msg: "Paradoxes 301: The following statement is false. The following statement is false. The first statement is false.", if: true } },
	m101() { return { msg: "Jacorb's mental instability is increasing quite quickly. If he reaches 100% mental instability, the multiverse implodes.", if: true } },
	m102() { return { msg: "Has this game been abandoned by its developer? "+((Math.random()>0.5)?"Obviously yes.":"Definitely not."), if: true } },
	m103() { return { msg: '"When is the egg update coming?" - The Almighty Orb about his own game', if: true } },
	m104() { return { msg: "We're lucky that our universes were never infected, I'm sure there's some parallel multiverse out there where that's an issue...", if: true } },
	m105() { return { msg: "Some people say that each multiverse does not have its own High Gods. Those people tend not to survive very long around here.", if: true } },
	m106() { return { msg: "Some people say that there is only one set of High Gods. Those people tend not to survive very long around here.", if: true } },
	m107() { return { msg: "What in the world is this mod?", if: true } },
	m108() { return { msg: "It has become a tradition to mod Distance Incremental (no it hasn't)", if: true } },
	m109() { return { msg: "SuperLog is a bad thing !!!!", if: true } },
	m110() { return { msg: "Unfortunately, Pelle wasn't so good at decision making. During the final stage of Antimatter Dimensions, The [Spoiler] [Spoiler] [Spoiler] [Spoiler] [Spoiler] [Spoiler] [Spoiler] ... And then you get a lot of antimatter and you win!", if: true } },
	m111() { return { msg: "🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍🔎🔍 - Almost every single BadBoyHalo donation back in 2019-2020", if: true } },
	m112() { return { msg: "Not like other lore based incrementals.", if: true } },
	m113() { return { msg: "You have been " + ["Scaled", "Superscaled", "Hyper Scaled", "Atomic Scaled", "Trolled"][Math.floor(Math.random()*5.1)] + ".", if: true } },
	m114() { 
		return { 
			msg: `Hey at least its not like Incremental Mass Rewritten (and it's forks) where its like: \"Due to ${
				["Massive Meme Overflow, we've decided to take away your admin powers, reducing your meme exponent count by "
				, "Extreme Trolling, your server list count is decreased by "
				, "Horrific Undertakings, your Sisyphus strength is reduced by "
				, "Something caused by your massive amounts of mass that totally isn't here to balance the game lol ;3, Your mass count is silated by "
				, "yourself"
				, "Super Hyper Ultra Meta Supercritical Exotic Instant fu-, your Mass Upgrade levels are raised to the "
				, "Rated M, your viewer count is reduced by"
				, "Isn't this like a 1 in 1e-20 chance newsticker? How?"][Math.floor(Math.random()*7)]} ^${Math.random() > 0.5?showNum(Math.random()):showNum(Decimal.div(1, player.distance.add(1).log10().add(1).log10().add(1).log10().add(1).slog(10).add(1)))}.\"  Wait. Why am I making news?`,
			if: true } 
		},
	m115() { return { msg: "Oh hey! I can swear here! f*ck f*ck f*ck!", if: true } },
	m116() { return { msg: "STOP SPAMMING STUPID SOFTCAPS AND SLOGS YOU... AAAAAAAAAAAAAAAAA  NEVER DO THIS IN YOUR INCREMENTALS!! unless if you're already at an F-level stage in your game, but PLEASE USE INDICATED SCALINGS INSTEAD", if: true } },
	custom1() {
		let msg
		if (player.distance.gte(`e${Number.MAX_VALUE}`)) {
			msg = `Shit, somehow you were fast enough to go around even your mother... I guess I lost =P`
		} else {
			msg = `You've only travelled ${showNum(player.distance.max(10).log(10).log(Number.MAX_VALUE).mul(100))}% around your mom.`
		}
		return { msg: msg, if: true }
	},
	custom2() {
		return { 
			msg: ["You haven't ran at all!", "You suck! (No you don't pls don't hurt)", "I guess you're getting somewhere", "Hey you at least traveled farther than me", "Oh dear god", "You see, when I was making this mod, I was always trying to play with whatever bs I made when modifying the original contents. The news was one of them. Unfortunately, I wasn't able to be as creative as the people who made Exotic Matter Dimensions' news, but I can still do something... I guess."][player.distance.add(1).log10().log10().max(0).min(5).floor().toNumber()], 
			if: true 
		}
	},
	custom3() {
		let msg = `You have travelled ${formatDistance(player.distance)}. (Softcapped to ${formatDistance(Decimal.pow(10, softcap(player.distance.log(10), "EP", 1, 3, 4.5)))}) `
		if (player.rockets.gte(1)) msg += `You have ${showNum(player.rockets)} rockets. (Softcapped to ${showNum(softcap(player.rockets, "EP", 1, 10, 5))}) `
		if (player.tr.cubes.gte(1)) msg += `You have ${showNum(player.tr.cubes)} time cubes. (Softcapped to ${showNum(player.tr.cubes.log(2).root(8).div(64))}) `
		if (player.cadavers && player.cadavers.gte(1)) msg += `You have ${showNum(player.cadavers)} cadavers. (Softcapped to ${showNum(player.cadavers.root(128))}) `
		
		return { msg: msg, if: true }
	},
	d1() { 
		return { 
			msg: "You've travelled more than me today", 
			if: player.distance.gte(500) 
		} 
	},
	d2() {
		return {
			msg: `The world is your pebble`,
			if: player.distance.gte(DISTANCES.ly)
		}
	},
	d3() {
		return {
			msg: `I guess multiple universes exist then`,
			if: player.distance.gte(DISTANCES.uni)
		}
	},
	d4() {
		return {
			msg: `To Infinity and beyond!`,
			if: player.distance.gte(ExpantaNum.mul(DISTANCES.uni, Number.MAX_VALUE))
		}
	},
	d5() {
		return {
			msg: `You are a very dedicated addict`,
			if: player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e100000"))
		}
	},
	d6() {
		return {
			msg: `Stop grinding or youll go insane within the next 5 hours!`,
			if: player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e2000000"))
		}
	},
	d7() {
		return {
			msg: `Uni sounds like a prestige currency,`,
			if: player.distance.gte(ExpantaNum.mul(DISTANCES.uni, 5))
		}
	},
	d8() {
		return {
			msg: `Welcome to the Fome Club...`,
			if: player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e42000000"))
		}
	},
	d9() {
		return {
			msg: `Heya. You've been busy, huh? So, i've got a question for ya. Do you think even the worst person can change? That everybody can be a good person, if they just try? Heh heh heh he... All right. Well here's a better question. Do you wanna have a bad time? 'Cause if you take another step forward... You are REALLY not going to like what happens next. Welp. Sorry, old lady. This is why i never make promises.`,
			if: player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e108000000"))
		}
	},
	d10() {
		return {
			msg: `The multiverse isnt enough for you`,
			if: player.distance.gte(DISTANCES.mlt)
		}
	},
	mod1() {
		return {
			msg: `How could you do this to yourself??`,
			if: player.modes.includes("hard")
		}
	},
	mod2() {
		return {
			msg: `No more achievement grinding for you, buddy`,
			if: player.modes.includes("aau")
		}
	},
	mod3() {
		return {
			msg: `This mode is the most boring...`,
			if: player.modes.includes("na")
		}
	},
	mod4() {
		return {
			msg: `This is illegal! You cannot do this to your game!`,
			if: player.modes.includes("easy")
		}
	},
	mod5() {
		return {
			msg: `The oyster is your oyster is your oyster is your oyster is your oyster`,
			if: player.modes.includes("extreme")
		}
	},
	mod6() {
		return {
			msg: `How can you even read this?`,
			if: player.modes.includes("absurd")
		}
	},
	mod7() {
		return {
			msg: `If youre really a hiker`,
			if: player.modes.includes("hikers_dream")
		}
	},
	mod8() {
		return {
			msg: `Hikers Dream was brought to you by ~reda~ (if youre angry about anything in this mode, its his fault)`,
			if: player.modes.includes("hikers_dream")
		}
	},
	c1() {
		return {
			msg: `This is a rare news ticker! You win a negligible amount of minor satisfaction!`,
			if: Math.random() < 0.25
		}
	},
	c2() {
		return {
			msg: `This is a super rare news ticker! You win a decent amount of satisfaction...`,
			if: Math.random() < 0.1
		}
	},
	c3() {
		return {
			msg: `This is an ultra rare news ticker! You win an obscene amount of happiness! (maybe, its a <0.002% chance counting all the other news)`,
			if: Math.random() < 0.0025
		}
	},
	c4() {
		return {
			msg: `All your smarts are no chance for dumb luck (How tf did you get a 0.00000001% chance news ticker??)`,
			if: Math.random() < 1e-9
		}
	},
	c5() {
		return {
			msg: `Your luck skills have broke the universe (How tf did you get a 0.00000000000001% chance news ticker??)`,
			if: Math.random() < 1e-15
		}
	},
	c6() {
		return {
			msg: `Your luck skills have broke the multiverse`,
			if: Math.random() < 1e-30
		}
	},
	c7() {
		return {
			msg: `If you went through 1 news ticker every planck time, and waited until the end of the universe's life, you still should not see this. (you lived)`,
			if: Math.random() < 1e-80
		}
	},
	a1() {
		return {
			msg: `You're a superstar in this world of false light`,
			if: player.achievements.length >= 5
		}
	},
	a2() {
		return { 
			msg: `Wow`,
			if: player.achievements.length >= 10
		}
	},
	a3() {
		return {
			msg: `Out to the world beyond the rocket`,
			if: player.achievements.length >= 20
		}
	},
	a4() {
		return {
			msg: `Fueling from here to the grave`,
			if: player.achievements.length >= 30
		}
	},
	a5() {
		return {
			msg: `Reversing time since 2116`,
			if: player.achievements.length >= 40
		}
	},
	a6() {
		return {
			msg: `Death is the new life`,
			if: player.achievements.length >= 50
		}
	},
	a7() {
		return {
			msg: `Nice`,
			if: player.achievements.length == 69
		}
	},
	a8() {
		return {
			msg: `There is no discord in the options menu. Dont look for it please...`,
			if: player.achievements.length >= 80
		}
	},
	a9() {
		return {
			msg: `Get back here in Absurd Mode`,
			if: player.achievements.length >= 96 && !player.modes.includes("absurd")
		}
	},
	s1() {
		return {
			msg: `Patcail thought Jacorb took his collapse feature. But if he did then I guess Patcail should name his game Ordinal Dimensions. - NiceManKSP`,
			if: player.collapse.unl
		}
	},
	s2() {
		return {
			msg: `Pathogens more like coronavirus`,
			if: player.pathogens.unl
		}
	},
	s3() {
		return {
			msg: `The universe was calm, but then the Pathogen Nation attacked.`,
			if: player.elementary.times.gt(0)
		}
	},
	s4() {
		return {
			msg: `Leptons sound like a soft drink - Marks Rivals Rival`,
			if: player.elementary.times.gt(0)
		}
	},
	s5() {
		return {
			msg: `The Bosons will Gauge out your eyes`,
			if: player.elementary.times.gt(0)
		}
	},
	s6() {
		return {
			msg: `The news ticker committee notice that you are starting to move. They are not quite afraid just yet.`,
			if: player.inf.endorsements.gt(0)
		}
	},
	s7() {
		return {
			msg: `We released the Higgs Update before Aarex! Yay!`,
			if: player.elementary.times.gt(0)
		}
	},
	s8() {
		return {
			msg: `Werent we already using those?`,
			if: player.rockets.gt(0)
		}
	},
	s9() {
		return {
			msg: `Its time to grind some Elementaries!`,
			if: player.elementary.times.gte(3)
		}
	},
	s10() {
		return {
			msg: `NASA cant afford to fund you anymore.`,
			if: player.tr.cubes.gt(0)
		}
	},
	s11() {
		return {
			msg: `1/5 no botbot - Guy after unlocking the Auto-Robots Automator`,
			if: player.automators[`robots`]
		}
	},
	s12() {
		return {
			msg: `To elementary, and beyond! - Buzz e600k uni`,
			if: player.distance.gte("1e600027")
		}
	},
	s13() {
		return {
			msg: `I want more PP - Guy who completes the game and sees no Pantheon Boosts`,
			if: player.inf.pantheon.unl
		}
	},
	s14() {
		return {
			msg: `What if crackle is an affiliate of Slabdrill?`,
			if: player.inf.derivatives.unl
		}
	},
	s15() {
		return {
			msg: `Accelerons were your biggest mistake`,
			if: player.elementary.theory.accelerons.unl
		}
	},
	s16() {
		return {
			msg: `We were originally planning on giving a pg-3 rating for this game, but after Cadavers were added, we have decided to up it to 18+`,
			if: player.collapse.cadavers.gt(0)
		}
	},
	s17() {
		return {
			msg: `You have achieved true lightspeed!`,
			if: player.bestV.gte(299792458)
		}
	},
	s18() {
		return {
			msg: `Physics can no longer hold me down!`,
			if: player.bestV.gte(299792459)
		}
	},
	s19() {
		return {
			msg: `But where are the replicants? - NG+++ fan after unlocking preons`,
			if: player.elementary.theory.preons.unl
		}
	},
	s20() {
		return {
			msg: `This is a crime against Reality.`,
			if: player.inf.pantheon.purge.active && !player.inf.stadium.current == "reality"
		}
	},
	s21() {
		return {
			msg: `Help - People who realized that Cadavers are just bodies`,
			if: player.collapse.cadavers.gt(0)
		}
	},
	s22() {
		return {
			msg: `Wait, Ordinal Dimensions is taken?`,
			if: player.collapse.unl
		}
	},
	s23() {
		return {
			msg: `Fome does exist!`,
			if: player.elementary.foam.unl
		}
	},
	s24() {
		return {
			msg: `Time to refoam your protofoam.`,
			if: player.elementary.foam.maxDepth.gte(5)
		}
	},
	s25() {
		return {
			msg: `Entropy is the arrow of time, leading you to the future (hopefully it doesnt take you too far into the future)`,
			if: player.elementary.entropy.unl
		}
	},
	s26() {
		return {
			msg: `I guess its time to sacrifice your Fermions into Skyrmions!`,
			if: player.elementary.sky.unl
		}
	},
	s27() {
		return {
			msg: `This isnt an Aarex game`,
			if: player.elementary.particles.gt(0)
		}
	},
	s28() {
		return {
			msg: `Believe it or not, the news ticker is this games only source of RNG.`,
			if: player.distance.gte(1e86)&&player.distance.lte("1e10000")
		}
	},
	s29() {
		return {
			msg: `This message started at the exact moment you reached the end of the multiverse!`,
			if: !player.ended&&player.distance.gte(DISTANCES.mlt)
		}
	},
	s30() {
		return {
			msg: `Wow you completed TV20, a completely meaningless quest that got you no reward. How do you feel now?`,
			if: player.elementary.theory.depth.gt(20)
		}
	},
	s31() {
		return {
			msg: `Gonna transfoam myself to Skyrmions!`,
			if: player.elementary.sky.unl
		}
	},
	s32() {
		return {
			msg: `Florida Man tried to reach the end of multiverse, but dissolved into 3 quantum fields.`,
			if: player.elementary.foam.unl
		}
	},
	s33() {
		return {
			msg: `Elementary is cool`,
			if: player.elementary.sky.unl
		}
	},
	s34() {
		return {
			msg: `No wait please, dont obliterate the multiverse`,
			if: player.distance.gte(DISTANCES.mlt) && player.mlt.times.eq(0)
		}
	},
	s35() {
		return {
			msg: `If the world is your oyster, then the multiverse is your ocean. Thats right`,
			if: player.mlt.times.gt(0)
		}
	},
	s36() {
		return {
			msg: `But where are the pentogens? - Incremental Mass fan after unlocking multiverses`,
			if: player.mlt.times.gt(0)
		}
	},
	s37() {
		return {
			msg: `lOoK iTS cRaCKlE!?!?!?!!`,
			if: player.inf.derivatives.amts.crackle!==undefined
		}
	},
	s38() {
		return {
			msg: `Derivative after the latest you have unlocked) when? - A derivative enthusiast`,
			if: player.mlt.highestCompleted>=2
		}
	},
	s39() {
		return {
			msg: `Even the High Gods arent perfect. Although theyre supposed to look over the multiverse`,
			if: player.elementary.times.gte(555) && player.elementary.times.lt(777777)
		}
	},
	s40() {
		return {
			msg: `There are more multiverses out there, somewhere... I wonder what sort of chaos is going on over there.`,
			if: player.mlt.highestCompleted >= 5
		}
	},
}