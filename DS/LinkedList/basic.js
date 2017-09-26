var Node = function (data) {
this.data = data;
this.next = {};
}

var ll = function () {
 this.length = 0;
 this.head = null;
}

ll.prototype.add = function(node) {
	var myNode = new Node(node);
  var headNode = this.head;  
  if (this.length === 0) {
    this.head = myNode;
    return myNode;
  } 
  while (headNode.next) {
   headNode = headNode.next;
  }
  headNode.next = myNode;
  this.length ++ ;
  return myNode;
  };
  
ll.prototype.remove = function(pos) {
  if(this.length === 0 || pos > this.length) {
    return "invalid"
  }
  var nodeToDelete;
  var prevNode = this.head;
  if (pos === 1) {
    nodeToDelete = this.head;
    this.head = this.head.next;
    this.length--;
		return nodeToDelete;
  }
  while (pos < this.length) {
  prevNode = prevNode.next;
  }
  nodeToDelete = prevNode;
  prevNode.next = nodeToDelete.next;
  this.length --;
  return nodeToDelete;
};  

ll.prototype.nodeAt = function (pos) {
  if (this.length <pos || this.length === 0) {
		return "invalid" ;
  }
  var len = 0; var node = this.head;
  while (len < pos) {
  	node = node.next;
    len ++;
  }
  console.log(node);
  return node;
}