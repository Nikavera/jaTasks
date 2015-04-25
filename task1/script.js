(function() {

	var store = {
			'Фрукты': ['Яблоки', 'Бананы', 'Апельсины'],
			'Овощи': ['Помидоры', 'Огурцы'],
			'Мясо': ['Свинина', 'Говядина', 'Курица']
		},
		storeContainer = document.getElementById('storeContainer'),
		addGroup = document.getElementById('addGroup'),
		products,
		deleteButton,
		addButton,
		productGroup;


	var createGroup = function(groupNameKey) {
		//console.log('createGroup with key: ' + groupNameKey);
		var group = document.createElement('div');
		group.className = "product-group";

		var groupName = document.createElement('span');
		groupName.className = 'product-group-name';
		groupName.innerHTML = groupNameKey + ': ';
		deleteButton = createDeleteButton();
		groupName.appendChild(deleteButton);
		group.appendChild(groupName);
		group.addEventListener("click", clickHandler);

		return group;
	};

	var createDeleteButton = function() {
		//console.log('createDeleteButton');
		var button = document.createElement('span');
		button.className = "delete-value";
		button.innerHTML = "&nbsp;";

		return button;
	};

	var createAddButton = function() {
		//console.log('createAddButton');
		var button = document.createElement('span');
		button.className = "add-product";
		button.title = "Добавить продукт";
		button.innerHTML = "&nbsp;";

		return button;
	};

	var createProducts = function(producstArray) {
		//console.log('createProducts: ' + producstArray);

		var fragm = document.createDocumentFragment();

		for (var i = 0; i < producstArray.length; i++) {
			var product = document.createElement('span');
			product.className = "product";
			product.innerHTML = producstArray[i];
			deleteButton = createDeleteButton();
			product.appendChild(deleteButton);

			fragm.appendChild(product);
		}

		return fragm;
	};
	
	
	var clickHandler = function(e) {
		e = e || window.event;
		// добавить target для IE
		var target = event.target || event.srcElement;

		switch (target.className) {
			case 'delete-value': deleteItem(target); break;
			case 'add-product': addNewProduct(target); break;
			default: break;
		}

	};

	var addNewProduct = function(item) {

		var newProduct = prompt('Введите название продукта'),
			parent = item.parentNode,
			fragment;

		if (newProduct === null) return;

		//console.log('addNewProduct');
		var itemName = parent.firstChild.textContent;
		itemName = itemName.slice(0, itemName.indexOf(':'));

		for (var key in store) {
			if (key === itemName) {
				store[key].push(newProduct);
				fragment = createProducts([newProduct]);
			}
		}
		parent.insertBefore(fragment, parent.lastChild);
	};

	var deleteItem = function(item) {
		//console.log('deleteItem');
		var parent = item.parentNode;

		switch (parent.className) {
			case 'product-group-name': deleteGroup(parent); break;
			case 'product': deleteProduct(item); break;
			default: break;
		}
	};

	var deleteProduct = function(item) {
		var parent = item.parentNode,
			groupName = parent.parentNode.firstChild.textContent,
			productName = parent.textContent;
		groupName = groupName.slice(0, groupName.indexOf(':'));

		store[groupName].splice(store[groupName].indexOf(productName), 1); //удалили из массива
		
		parent.parentNode.removeChild(parent); //готово
	};

	var deleteGroup = function(group) {
		var groupName = group.firstChild.textContent.slice(0, group.firstChild.textContent.indexOf(':'));
		
		delete store[groupName]; //удалили из объекта

		group.parentNode.parentNode.removeChild(group.parentNode); //готово

	};

	var addNewGroup = function() {
		console.log('addNewGroup');
		
		var newGroupName = prompt('Введите название группы: '),
			newGroup;
		
		if (newGroupName) {
			newGroup = createGroup(newGroupName);
			var addBtn = createAddButton();
			newGroup.appendChild(addBtn);
		}
			
		storeContainer.appendChild(newGroup);
		
		store[newGroupName] = [];
	};


	(function init() {
		//console.log('init');
		var fragment = document.createDocumentFragment();


		for (var key in store) {
			//console.log('key: ' + key);
			
			productGroup = createGroup(key);
			products = createProducts(store[key]); /*  || '' */
			productGroup.appendChild(products);
			addButton = createAddButton();
			productGroup.appendChild(addButton);

			fragment.appendChild(productGroup);

		}

		storeContainer.appendChild(fragment);
		
		addGroup.addEventListener('click', addNewGroup);

	})();


	
})();