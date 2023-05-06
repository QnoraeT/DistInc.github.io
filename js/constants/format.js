const DISTANCES = {
	m: 1,
	km: 1e3,
	Mm: 1e6,
	Gm: 1e9,
	Tm: 1e12,
	Pm: 1e15,
	ly: 9.461e15,
	pc: 3.086e16,
	kpc: 3.086e19,
	Mpc: 3.086e22,
	Gpc: 3.086e25,
	uni: 4.4e26,
	mlt: "4.4e1000000026",
	mgv: "ee24",
	giv: "ee39",
	tev: "ee54",
	pev: "ee69",
	exv: "ee84",
	zev: "ee99",
	yov: "ee114",
	arvs: "ee129",
	
};

const DISTANCE_TYPES = {
	mlt: "log",
	mgv: "log",
	giv: "log",
	tev: "log",
	pev: "log",
	exv: "log",
	zev: "log",
	yov: "log",
	arvs: "log^2",
}

const TIMES = {
	ms: 1 / 1000,
	s: 1,
	m: 60,
	h: 3600,
	d: 86400,
	w: 604800,
	y: 31556736,
	mil: 31556736000
};
