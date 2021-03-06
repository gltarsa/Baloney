// Test method for examining cards
Hand.prototype.peek = function(index) { return this._cards[index]; }

describe("iBaloney Hand", function() {
    var hand;

    it("#new creates an empty hand", function() {
	hand = new Hand();
	expect(hand).toBeDefined();
    });

    describe("Cards can be received into a hand and counted.", function() {
	var hand;
	hand = new Hand();

	it("#receive can receive an array of cards", function() {
	    hand.receive([new Card("5-H"),
			  new Card("3-D"),
			  new Card("4-S")]);
	    expect(hand.numberOfCards()).toEqual(3);
	});

	it("#receive can receive a single card", function() {
	    hand.receive(new Card("5-C"));
	    expect(hand.numberOfCards()).toEqual(4);
	});

	it("#giveCard can give a single card", function() {
	    var card = hand.giveCard();
	    expect(card).toBeDefined();
	    hand.receive(card);  // put it back for later tests
	});

	it("#length returns the size of a hand", function() {
	    expect(hand.numberOfCards()).toEqual(4);
	});

	describe("Specified ranks in a hand can be counted.", function() {
	    it("#countMatchingRank returns the number of a rank  in the hand.", function () {
		var count = hand.countMatchingRank("3");
		expect(count).toBe(1);
		count = hand.countMatchingRank("8");
		expect(count).toBe(0);
	    });
	});

	describe("Specified ranks can be take from a hand.", function() {
	    it("#giveMatchingRank returns a single matching rank, removing it from the hand, or returns undefined.", function () {
		var card = hand.giveMatchingRank("3");
		expect(card.rank()).toBe("3");
		card = hand.giveMatchingRank("3");
		expect(card).not.toBeDefined();
	    });
	});
    });

    describe("Cards in a hand can be selected & unselected.", function() {
	var hand;

	hand = new Hand();
	hand.receive([new Card("5-H"),
		      new Card("3-D"),
		      new Card("4-S")]);

	it("#isSelected shows new cards are un-selected.", function () {
	    card = hand.cards(0); // card is 4-S
	    expect(card.isSelected()).toBeFalsy();
	});

	it("#giveSelectedCards removes seleted cards from hand and returns them.", function () {
	    for (var i = 0; i < hand.numberOfCards(); i++) {
		hand.cards(i).unSelect();
	    }
	    // cards are:  [3-D 4-S 5-H] 
	    hand.cards(0).select();
	    hand.cards(2).select();

	    var discard = new Hand();
	    discard.receive(hand.giveSelected());
	    expect(hand.cards(0).rank()).toBe("4");
	    expect(hand.cards(0).suit()).toBe("S");
	    expect(discard.cards(0).rank()).toBe("3");
	    expect(discard.cards(1).rank()).toBe("5");
	});
    });

    it("#sort sorts cards by value", function() {
	var card = new Card("5-H"); hand.receive([card]);
	var card = new Card("3-D"); hand.receive([card]);
	var card = new Card("4-S"); hand.receive([card]);

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
