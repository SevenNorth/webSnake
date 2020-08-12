const utils = {
	"timer": null,
	"count": 0,
	"oldDeirction": '',
	/**
	 * 控制蛇头移动
	 * @param {object} ele 类对象数组
	 * @param {string} direction 方向
	 * @param {object} food 食物
	 */
	move(ele, direction, food) {
		if (!utils.isReverse(direction)) {
			switch (direction) {
				case 'left':
					var attr = 'left',
						rotate = 'rotate(270deg)'
					utils.howToMove(ele, food, attr, rotate, direction, utils.speed(ele))
					// clearInterval(utils.timer)
					// utils.timer = setInterval(() => {
					// 	utils.eatFood(ele, food)
					// 	ele = document.querySelectorAll('.snake')
					// 	utils.moveSnake(ele)
					// 	utils.isDead(utils.isStrickWall(ele))

					// 	ele[0].style.transform = 'rotate(270deg)'
					// 	ele[0].style.left = ele[0].offsetLeft - 30 + 'px'
					// 	utils.isDead(utils.isCrash(ele))
					// 	// utils.isDead(utils.isStrickWall(ele))
					// }, 80);
					break;
				case 'right':
					var attr = 'left',
						rotate = 'rotate(90deg)'
					utils.howToMove(ele, food, attr, rotate, direction, utils.speed(ele))
					// clearInterval(utils.timer)
					// utils.timer = setInterval(() => {
					// 	utils.eatFood(ele, food)
					// 	ele = document.querySelectorAll('.snake')
					// 	utils.moveSnake(ele)
					// 	utils.isDead(utils.isStrickWall(ele))

					// 	ele[0].style.transform = 'rotate(90deg)'
					// 	ele[0].style.left = ele[0].offsetLeft + 30 + 'px'
					// 	utils.isDead(utils.isCrash(ele))
					// 	// utils.isDead(utils.isStrickWall(ele))
					// }, 80);
					break;
				case 'up':
					var attr = 'top',
						rotate = 'rotate(0deg)'
					utils.howToMove(ele, food, attr, rotate, direction, utils.speed(ele))
					// clearInterval(utils.timer)
					// utils.timer = setInterval(() => {
					// 	utils.eatFood(ele, food)
					// 	ele = document.querySelectorAll('.snake')
					// 	utils.moveSnake(ele)
					// 	utils.isDead(utils.isStrickWall(ele))

					// 	ele[0].style.transform = 'rotate(0deg)'
					// 	ele[0].style.top = ele[0].offsetTop - 30 + 'px'
					// 	utils.isDead(utils.isCrash(ele))

					// 	// utils.isDead(utils.isStrickWall(ele))
					// }, 80);
					break;
				case 'down':
					var attr = 'top',
						rotate = 'rotate(180deg)'
					utils.howToMove(ele, food, attr, rotate, direction, utils.speed(ele))
					// clearInterval(utils.timer)
					// utils.timer = setInterval(() => {
					// 	utils.eatFood(ele, food)
					// 	ele = document.querySelectorAll('.snake')
					// 	utils.moveSnake(ele)
					// 	utils.isDead(utils.isStrickWall(ele))

					// 	ele[0].style.transform = 'rotate(180deg)'
					// 	ele[0].style.top = ele[0].offsetTop + 30 + 'px'
					// 	utils.isDead(utils.isCrash(ele))

					// 	// utils.isDead(utils.isStrickWall(ele))
					// }, 80);
					break;
			}
		}
	},
	/**
	 * 移动整个蛇。后一个蛇的body的位置等于前一个body的位置
	 * @param {object} snakes 类对象数组
	 */
	moveSnake(snakes) {
		for (var i = snakes.length - 1; i > 0; i--) {
			snakes[i].style.left = snakes[i - 1].style.left
			snakes[i].style.top = snakes[i - 1].style.top
		}
	},
	//吃到食物
	eatFood(snakes, food) {
		// 食物坐标

		var fX = food.offsetLeft,
			fY = food.offsetTop

		var top = snakes[0].offsetTop > fY - snakes[0].offsetHeight &&
			snakes[0].offsetTop < fY + food.offsetHeight
		var left = snakes[0].offsetLeft > fX - snakes[0].offsetWidth &&
			snakes[0].offsetLeft < fX + food.offsetWidth

		if (top && left) {
			utils.count++
			var newSnakeBody = food.cloneNode(true)
			newSnakeBody.classList.add('snake')
			newSnakeBody.classList.remove('food')
			// console.log(newSnakeBody.style.background.split(' ').slice(1,).join(''))
			newSnakeBody.style.background = newSnakeBody.style.background.split(' ').slice(1, ).join('')
			document.body.insertBefore(newSnakeBody, food)
			document.body.removeChild(food)
			var newfood = creatFood()
			document.body.appendChild(newfood)
		}
	},
	// 撞墙
	isStrickWall(snakes) {
		var top = snakes[0].offsetTop;
		var left = snakes[0].offsetLeft;
		var clientWidth = window.innerWidth - 30
		var clientHeight = window.innerHeight - 30
		return top <= 0 || top >= clientHeight || left <= 0 || left >= clientWidth
	},
	// 死亡事件
	/**
	 * 
	 * @param {boolean} isDead 
	 */
	isDead(isDead) {
		if (isDead) {
			clearInterval(utils.timer)
			alert(`你死了,你的成绩是${utils.count}`)
			window.location.reload(true);
		}
	},
	// 撞上自己
	isCrash(snakes) {
		for (var i = 1; i < snakes.length; i++) {
			var top = snakes[0].offsetTop > snakes[i].offsetTop - snakes[i].offsetHeight &&
				snakes[0].offsetTop < snakes[i].offsetTop + snakes[i].offsetHeight
			var left = snakes[0].offsetLeft > snakes[i].offsetLeft - snakes[i].offsetWidth &&
				snakes[0].offsetLeft < snakes[i].offsetLeft + snakes[i].offsetWidth
			if (top && left) {
				return true
			}
		}
	},
	//封装运动函数
	howToMove(ele, food, attr, rotate, direc, speed) {
		utils.oldDeirction = direc
		clearInterval(utils.timer)
		utils.timer = setInterval(() => {
			utils.eatFood(ele, food)
			ele = document.querySelectorAll('.snake')
			utils.moveSnake(ele)
			utils.isDead(utils.isStrickWall(ele))

			ele[0].style.transform = rotate
			switch (direc) {
				case 'left':
					ele[0].style[attr] = ele[0].offsetLeft - 30 + 'px'
					break;
				case 'right':
					ele[0].style[attr] = ele[0].offsetLeft + 30 + 'px'
					break;
				case 'up':
					ele[0].style[attr] = ele[0].offsetTop - 30 + 'px'
					break;
				case 'down':
					ele[0].style[attr] = ele[0].offsetTop + 30 + 'px'
					break;
			}
			utils.isDead(utils.isCrash(ele))
			// utils.isDead(utils.isStrickWall(ele))
		}, speed);
	},
	// 是否反向
	isReverse(direc) {
		return utils.oldDeirction === 'up' && direc === 'down' || utils.oldDeirction === 'down' && direc === 'up' || utils.oldDeirction === 'left' && direc === 'right' || utils.oldDeirction === 'right' && direc === 'left'
	},
	//判断速度
	speed(ele) {
		var speed = 150
		return (speed +ele.length*50)/ (ele.length)
	}
}