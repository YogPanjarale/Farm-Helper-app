/**
 * A function that converts date object to human readable time ago
 * @param {Date} date
 * @returns {string}
 * @author [YogPanjarale](https://github.com/YogPanjarale)
 */
 export function dateToTimeAgo(date: Date): string {
	const now = new Date(Date.now());
	const difftime = now.getTime() - date.getTime();
	const diffDate = new Date(difftime - 5.5 * 60 * 60 * 1000);
	const [sec, min, hr, day, month,year] = [
		diffDate.getSeconds(),
		diffDate.getMinutes(),
		diffDate.getHours(),
		diffDate.getDate() - 1,
		diffDate.getMonth(),
        diffDate.getFullYear()
	];
	const f = (property: number, end: string) =>{
		// console.log(property,end)
		return`${property} ${end}${property > 1 ? "s" : ""} ago`;
	}
	// console.log(diffDate.toLocaleString());
	return year>=1?f(year,"year"):
     month >= 1
		? f(month, "month")
		: day >= 1
		? f(day, "day")
		: hr >= 1
		? f(hr, "hr")
		: min >= 1
		? f(min, "min")
		: day >= 1
		? f(sec, "sec")
		: "";


	throw new Error("Date To time ago not implmented");
}