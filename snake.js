var head = {link:undefined};
var tail = head;
var element = function () {
	var link = undefined;
};
var addTail = function (x, y) {
	var temp = tail;
	tail = new element();
	temp.link = tail;
};
