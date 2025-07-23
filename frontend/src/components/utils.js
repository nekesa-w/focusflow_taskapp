export const formatDueDate = (dueDate) => {
	const currentDate = new Date();
	const taskDueDate = new Date(dueDate);

	const dayDifference = (taskDueDate - currentDate) / (1000 * 3600 * 24);
	const dayOfWeek = taskDueDate.toLocaleString("en-US", { weekday: "long" });

	if (taskDueDate.toDateString() === currentDate.toDateString()) {
		return "Today";
	}

	if (dayDifference > 0 && dayDifference <= 7) {
		return `${dayOfWeek}`;
	}

	if (dayDifference < 0 && dayDifference >= -7) {
		return `Past ${dayOfWeek}`;
	}

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	return new Intl.DateTimeFormat("en-US", options).format(taskDueDate);
};
