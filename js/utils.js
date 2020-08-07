const utils = {
	"timer": null,

	/**
	 * 控制蛇头移动
	 * @param {object} ele 类对象数组
	 * @param {string} direction 方向
	 */
	move(ele, direction) {
		switch (direction) {
			case 'left':
				clearInterval(utils.timer)
				utils.timer = setInterval(() => {
					utils.moveSnake(ele)
					ele[0].style.transform = 'rotate(270deg)'
					ele[0].style.left = ele[0].offsetLeft - 30 + 'px'
				}, 100);
				break;
			case 'right':
				clearInterval(utils.timer)
				utils.timer = setInterval(() => {
					utils.moveSnake(ele)
					ele[0].style.transform = 'rotate(90deg)'
					ele[0].style.left = ele[0].offsetLeft + 30 + 'px'
				}, 100);
				break;
			case 'up':
				clearInterval(utils.timer)
				utils.timer = setInterval(() => {
					utils.moveSnake(ele)
					ele[0].style.transform = 'rotate(0deg)'
					ele[0].style.top = ele[0].offsetTop - 30 + 'px'
				}, 100);
				break;
			case 'down':
				clearInterval(utils.timer)
				utils.timer = setInterval(() => {
					utils.moveSnake(ele)
					ele[0].style.transform = 'rotate(180deg)'
					ele[0].style.top = ele[0].offsetTop + 30 + 'px'
				}, 100);
				break;
		}
	},
	/**
	 * 移动整个蛇。后一个蛇的body的位置等于前一个body的位置
	 * @param {object} snakes 类对象数组
	 */
	moveSnake(snakes){
		for (var i = snakes.length - 1; i > 0; i--) {
			snakes[i].style.left = snakes[i - 1].style.left
			snakes[i].style.top = snakes[i - 1].style.top
		}
	}
}