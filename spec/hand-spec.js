// Test method for examining cards
Hand.prototype.peek = function(index) { return this._cards[index]; }

describe("Baloney Hand", function() {
    var hand;

    it("#new creates an empty hand", function() {
	hand = new Hand();
	expect(hand).toBeDefined();
    });

    describe("Cards can be received into a hand and counted.", function() {
	var hand;
	hand = new Hand();

	it("#receiveCards can receive an array of cards", function() {
	    hand.receiveCards([new Card("5-H"),
			       new Card("3-D"),
			       new Card("4-S")]);
	    expect(hand.length()).toEqual(3);
	});

	it("#length returns the size of a hand", function() {
	    expect(hand.length()).toEqual(3);
	});

	describe("Specified ranks can be take from a hand.", function() {
	    it("#giveMatchingRank returns a single matching rank, or undefined.", function () {
		var card = hand.giveMatchingRank("3");
		expect(card.rank()).toBe("3");
		card = hand.giveMatchingRank("3");
		expect(card).not.toBeDefined();
	    });
	});
    });

	



    it("#sort sorts cards by value", function() {
	var card = new Card("5-H"); hand.receiveCards([card]);
	var card = new Card("3-D"); hand.receiveCards([card]);
	var card = new Card("4-S"); hand.receiveCards([card]);

	hand.sort();

	var card = hand.peek(0);
	expect(card.rank()).toEqual("3");
	var card = hand.peek(1);
	expect(card.rank()).toEqual("4");
	var card = hand.peek(2);
	expect(card.rank()).toEqual("5");
    });

    it("#toString shows a string representing the hand", function() {
	handString = hand.toString();
	expect(hand.toString()).toEqual("[3-D 4-S 5-H]");
    });

}); // end Hand tests
