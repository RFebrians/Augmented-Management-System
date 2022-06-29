/** @format */

import {
	DELETE_INC,
	DELETE_PURCH,
	GET_INCOMES,
	GET_PRODUCTS,
	GET_PURCH,
	GET_STATISTICS1,
	UPDATE_INC,
	UPDATE_PROD,
	GET_STATISTICS2,
	GET_STATISTICS2b,
	DELETE_PROD,
	GET_STATISTICS3,
	GET_STATISTICS1b,
	GET_STATISTICS3b
} from '../types';
import moment from 'moment';

const initialState = {
	produkty: [],
	incomes: [],
	all: [],
	statistic1: [],
	statistic2: [],
	statistic2b: [],
	statistic3: []
};

const Statistic1Func = (arr) => {
	const data1 = [];
	for (let i = 0; i < arr.length; i++) {
		const indx = data1.findIndex((item) => {
			return item.x === arr[i].category;
		});

		if (indx >= 0) {
			data1[indx] = {
				x: data1[indx].x,
				y: data1[indx].y + arr[i].allCosts
			};
		} else {
			data1.push({ x: arr[i].category, y: arr[i].allCosts });
		}
	}
	return data1;
};

const Statistic2Func = (nonoss, interwal, end, start) => {
	let kokoss = [];
	const time4 = (end - start) / interwal;

	for (let i = 0; i < nonoss.length; i++) {
		const datekss = nonoss[i].date.seconds * 1000;
		const costikk = nonoss[i].allCosts;
		const indxx = kokoss.findIndex((item) => {
			return (
				datekss.valueOf() >= item.min.valueOf() &&
				datekss.valueOf() < item.max.valueOf()
			);
		});

		for (let j = 0; j < Math.ceil(time4); j++) {
			const func1 = () => {
				kokoss[indxx] = {
					min: kokoss[indxx].min,
					max: kokoss[indxx].max,
					day: kokoss[indxx].day,
					sum: kokoss[indxx].sum + costikk
				};
			};
			const func2 = (firstek3, secundek3) => {
				kokoss.push({
					min: firstek3,
					max: secundek3,
					day: moment(firstek3).format('Do M YY'),
					sum: costikk
				});
			};
			if (j === 0) {
				const firstek = start.valueOf();
				const secundek = start.valueOf() + interwal;
				if (datekss >= firstek && datekss < secundek) {
					if (indxx >= 0) {
						func1();
					} else {
						func2(firstek, secundek);
					}
				}
			} else if (j > 0) {
				const firstek2 = start.valueOf() + interwal * j;
				const secundek2 = start.valueOf() + interwal * (j + 1);
				if (datekss >= firstek2 && datekss < secundek2) {
					if (indxx >= 0) {
						func1();
					} else {
						func2(firstek2, secundek2);
					}
				}
			}
		}
	}

	kokoss.sort(function (a, b) {
		return a.min.valueOf() - b.min.valueOf();
	});
	return kokoss;
};

const Statistic3Func = (nonosss, nonosss2, roz1, roz2, type) => {
	const krokro = [];
	const krokro2 = [];

	const Loop = (one, two) => {
		for (let i = 0; i < one.length; i++) {
			const indu = two.findIndex((item) => {
				return item.x === one[i].category;
			});

			if (indu >= 0) {
				two[indu] = {
					x: two[indu].x,
					y: two[indu].y + one[i].allCosts
				};
			} else {
				two.push({ x: one[i].category, y: one[i].allCosts });
			}
		}
	};

	Loop(nonosss, krokro);
	Loop(nonosss2, krokro2);

	const krokro3 = [];
	for (let i = 0; i < krokro2.length; i++) {
		for (let j = 0; j < krokro.length; j++) {
			if (krokro[j].x === krokro2[i].x) {
				let newCos;
				if (type === 'Purchase') {
					newCos = (krokro[j].y / roz1 / (krokro2[i].y / roz2)) * 100 - 100;
				} else {
					newCos = (krokro2[i].y / roz2 / (krokro[j].y / roz1)) * 100 - 100;
				}

				krokro3.push({ x: krokro[j].x, y: newCos });
			}
		}
	}
	return krokro3;
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			const order1 = action.payload.sort(function (a, b) {
				return b.date.seconds - a.date.seconds;
			});
			return { ...state, produkty: order1 };
		case DELETE_PROD:
			const newi = state.produkty.filter((item) => action.payload != item.id);
			return { produkty: newi };
		case GET_INCOMES:
			const order2 = action.payload.sort(function (a, b) {
				return b.date.seconds - a.date.seconds;
			});
			return { ...state, incomes: order2 };
		case DELETE_INC:
			const newi2 = state.incomes.filter((item) => action.payload != item.id);
			return { ...state, incomes: newi2 };
		case GET_PURCH:
			const newi3 = state.produkty.concat(state.incomes).sort(function (a, b) {
				return b.date.seconds - a.date.seconds;
			});
			return { ...state, all: newi3 };
		case DELETE_PURCH:
			const newi4 = state.all.filter((item) => action.payload != item.id);
			return { ...state, all: newi4 };
		case UPDATE_PROD:
			const newi5 = [...state.produkty];
			const indx = newi5.findIndex((item) => item.id === action.payload.id);
			newi5[indx] = action.payload.item;
			return { ...state, produkty: newi5 };
		case UPDATE_INC:
			const newi6 = [...state.incomes];
			const indx2 = newi6.findIndex((item) => item.id === action.payload.id);
			newi6[indx2] = action.payload.item;
			return { ...state, incomes: newi6 };
		case GET_STATISTICS1:
			const nono = state.produkty.filter((item) => {
				return (
					action.payload.start.valueOf() < item.date.seconds * 1000 &&
					action.payload.end.valueOf() > item.date.seconds * 1000
				);
			});

			return { ...state, statistic1: [...Statistic1Func(nono)] };
		case GET_STATISTICS1b:
			const nonob = state.incomes.filter((item) => {
				return (
					action.payload.start.valueOf() < item.date.seconds * 1000 &&
					action.payload.end.valueOf() > item.date.seconds * 1000
				);
			});

			return { ...state, statistic1: [...Statistic1Func(nonob)] };
		case GET_STATISTICS2:
			const { start, end, interwal, category } = action.payload;
			const nonoss = state.produkty.filter((item) => {
				if (category === 'All Categories') {
					return (
						start.valueOf() < item.date.seconds * 1000 &&
						end.valueOf() > item.date.seconds * 1000
					);
				} else {
					return (
						category === item.category &&
						start.valueOf() < item.date.seconds * 1000 &&
						end.valueOf() > item.date.seconds * 1000
					);
				}
			});

			return {
				...state,
				statistic2: [...Statistic2Func(nonoss, interwal, end, start)]
			};
		case GET_STATISTICS2b:
			const {
				start: start2,
				end: end2,
				interwal: interwal2,
				category: category2
			} = action.payload;
			const nonoss2 = state.incomes.filter((item) => {
				if (category2 === 'All Categories') {
					return (
						start2.valueOf() < item.date.seconds * 1000 &&
						end2.valueOf() > item.date.seconds * 1000
					);
				} else {
					return (
						category2 === item.category &&
						start2.valueOf() < item.date.seconds * 1000 &&
						end2.valueOf() > item.date.seconds * 1000
					);
				}
			});

			return {
				...state,
				statistic2b: [...Statistic2Func(nonoss2, interwal2, end2, start2)]
			};
		case GET_STATISTICS3:
			const { startRange1, endRange1, startRange2, endRange2, type } =
				action.payload;
			const roz1 = (startRange1.valueOf() - endRange1.valueOf()) / 86400000;
			const roz2 = (startRange2.valueOf() - endRange2.valueOf()) / 86400000;

			const nonosss = state.produkty.filter((item) => {
				return (
					startRange1.valueOf() < item.date.seconds * 1000 &&
					endRange1.valueOf() > item.date.seconds * 1000
				);
			});

			const nonosss2 = state.produkty.filter((item) => {
				return (
					startRange2.valueOf() < item.date.seconds * 1000 &&
					endRange2.valueOf() > item.date.seconds * 1000
				);
			});

			return {
				...state,
				statistic3: [...Statistic3Func(nonosss, nonosss2, roz1, roz2, type)]
			};
		case GET_STATISTICS3b:
			const {
				startRange1: startRange1b,
				endRange1: endRange1b,
				startRange2: startRange2b,
				endRange2: endRange2b,
				type: typeb
			} = action.payload;
			const roz1b = (endRange1b.valueOf() - startRange1b.valueOf()) / 86400000;
			const roz2b = (endRange2b.valueOf() - startRange2b.valueOf()) / 86400000;

			const nonosssb = state.incomes.filter((item) => {
				console.log(
					startRange1b.valueOf(),
					endRange1b.valueOf(),
					item.date.seconds * 1000
				);
				return (
					startRange1b.valueOf() < item.date.seconds * 1000 &&
					endRange1b.valueOf() > item.date.seconds * 1000
				);
			});

			const nonosss2b = state.incomes.filter((item) => {
				return (
					startRange2b.valueOf() < item.date.seconds * 1000 &&
					endRange2b.valueOf() > item.date.seconds * 1000
				);
			});
			console.log(nonosssb, nonosss2b);
			return {
				...state,
				statistic3: [
					...Statistic3Func(nonosssb, nonosss2b, roz1b, roz2b, typeb)
				]
			};
		default:
			return { ...state };
	}
}
